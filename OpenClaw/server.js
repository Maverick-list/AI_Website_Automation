const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const schedule = require('node-schedule');

const app = express();
const PORT = 5000;

// Allow CORS for the dashboard
app.use(cors());
app.use(express.json());

const OPENCLAW_BIN = "C:\\Users\\MAVERICK\\AppData\\Roaming\\npm\\node_modules\\openclaw\\openclaw.mjs";
const DB_PATH = path.join(__dirname, 'broadcasts.json');

// Memory map to store node-schedule job instances so they can be cancelled
const activeJobs = new Map();

// Helper to read database
function readDb() {
    try {
        if (!fs.existsSync(DB_PATH)) {
            fs.writeFileSync(DB_PATH, JSON.stringify([]), 'utf8');
        }
        const data = fs.readFileSync(DB_PATH, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        console.error("Gagal membaca database broadcasts.json", e);
        return [];
    }
}

// Helper to write database
function writeDb(data) {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    } catch (e) {
        console.error("Gagal menulis database broadcasts.json", e);
    }
}

// Helper to schedule a job in memory & database
function registerSchedule(item) {
    const scheduleTime = new Date(item.time);
    if (scheduleTime <= new Date()) {
        // If time passed while server was offline, mark as expired/failed
        item.status = 'failed';
        item.error = 'Waktu terlewati saat server offline';
        return false;
    }

    const job = schedule.scheduleJob(scheduleTime, () => {
        console.log(`[EXEC SCHEDULED] Menjalankan broadcast terjadwal: ${item.id} -> ${item.target}`);
        
        const tempMsgPath = path.join(__dirname, `temp_msg_${item.id}.txt`);
        try {
            fs.writeFileSync(tempMsgPath, item.message, 'utf8');
        } catch (err) {
            console.error("Gagal menulis file pesan", err);
            updateBroadcastStatus(item.id, 'failed', err.message);
            return;
        }

        let command = `node "${OPENCLAW_BIN}" message send --target "${item.target}" --message "${tempMsgPath}"`;
        if (item.media) {
            command += ` --media "${item.media}"`;
        }

        exec(command, (error, stdout, stderr) => {
            try { fs.unlinkSync(tempMsgPath); } catch (e) {} // Clean up temp file
            
            if (error) {
                console.error(`[ERROR] Broadcast gagal: ${error.message}`);
                updateBroadcastStatus(item.id, 'failed', error.message);
            } else {
                console.log(`[SUCCESS] Broadcast berhasil dikirim. Output: ${stdout}`);
                updateBroadcastStatus(item.id, 'sent', null, stdout);
            }
            activeJobs.delete(item.id);
        });
    });

    if (job) {
        activeJobs.set(item.id, job);
        return true;
    }
    return false;
}

// Update status of a broadcast item in db
function updateBroadcastStatus(id, status, error = null, output = null) {
    const db = readDb();
    const item = db.find(x => x.id === id);
    if (item) {
        item.status = status;
        item.executedAt = new Date().toISOString();
        if (error) item.error = error;
        if (output) item.output = output;
        writeDb(db);
    }
}

// Initialize and reload pending schedules on startup
function initScheduler() {
    console.log("[INIT] Memuat jadwal tertunda dari database...");
    const db = readDb();
    let rescheduledCount = 0;
    let expiredCount = 0;

    db.forEach(item => {
        if (item.status === 'pending') {
            const success = registerSchedule(item);
            if (success) {
                rescheduledCount++;
            } else {
                expiredCount++;
            }
        }
    });

    if (expiredCount > 0) {
        writeDb(db);
    }
    console.log(`[INIT] Penjadwalan selesai. ${rescheduledCount} jadwal diaktifkan kembali, ${expiredCount} jadwal kedaluwarsa.`);
}

// Endpoint: Dapatkan Status Koneksi WhatsApp
app.get('/api/status', (req, res) => {
    const command = `node "${OPENCLAW_BIN}" channels status`;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            return res.json({ connected: false, raw: error.message + '\n' + stderr });
        }
        const connected = stdout.toLowerCase().includes('connected');
        res.json({ connected, raw: stdout });
    });
});

// Endpoint: Dapatkan Semua Broadcasts
app.get('/api/broadcasts', (req, res) => {
    res.json(readDb());
});

// Endpoint: Kirim / Jadwalkan Broadcast
app.post('/api/broadcasts', (req, res) => {
    const { target, message, time, media } = req.body;

    if (!target || !message) {
        return res.status(400).json({ error: "Missing 'target' or 'message' in request body" });
    }

    const db = readDb();
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 5);
    const newBroadcast = {
        id,
        target,
        message,
        media: media || null,
        type: time ? 'scheduled' : 'immediate',
        status: time ? 'pending' : 'sending',
        time: time || null,
        createdAt: new Date().toISOString(),
        executedAt: null,
        error: null
    };

    db.unshift(newBroadcast); // Add to beginning of array
    writeDb(db);

    if (time) {
        // Scheduled
        const scheduleTime = new Date(time);
        if (scheduleTime < new Date()) {
            newBroadcast.status = 'failed';
            newBroadcast.error = "Waktu penjadwalan harus di masa depan";
            writeDb(db);
            return res.status(400).json({ error: "Scheduled time must be in the future" });
        }

        const success = registerSchedule(newBroadcast);
        if (success) {
            return res.json({ success: true, broadcast: newBroadcast });
        } else {
            return res.status(500).json({ error: "Gagal mendaftarkan jadwal ke scheduler" });
        }
    } else {
        // Immediate
        const tempMsgPath = path.join(__dirname, `temp_msg_${id}.txt`);
        try {
            fs.writeFileSync(tempMsgPath, message, 'utf8');
        } catch (err) {
            newBroadcast.status = 'failed';
            newBroadcast.error = err.message;
            writeDb(db);
            return res.status(500).json({ error: "Gagal memproses pesan" });
        }

        let command = `node "${OPENCLAW_BIN}" message send --target "${target}" --message "${tempMsgPath}"`;
        if (media) {
            command += ` --media "${media}"`;
        }

        exec(command, (error, stdout, stderr) => {
            try { fs.unlinkSync(tempMsgPath); } catch (e) {} // Clean up temp file
            
            if (error) {
                console.error(`[ERROR] Broadcast langsung gagal: ${error.message}`);
                updateBroadcastStatus(id, 'failed', error.message);
            } else {
                console.log(`[SUCCESS] Broadcast langsung berhasil. Output: ${stdout}`);
                updateBroadcastStatus(id, 'sent', null, stdout);
            }
        });

        // Respond immediately that sending is in progress
        return res.json({ success: true, broadcast: newBroadcast });
    }
});

// Endpoint: Hapus / Batalkan Jadwal Broadcast
app.delete('/api/broadcasts/:id', (req, res) => {
    const { id } = req.params;
    const db = readDb();
    const item = db.find(x => x.id === id);

    if (!item) {
        return res.status(404).json({ error: "Broadcast tidak ditemukan" });
    }

    if (item.status === 'pending') {
        const job = activeJobs.get(id);
        if (job) {
            job.cancel();
            activeJobs.delete(id);
        }
        item.status = 'cancelled';
        writeDb(db);
        return res.json({ success: true, message: "Jadwal broadcast berhasil dibatalkan" });
    } else {
        return res.status(400).json({ error: "Hanya jadwal tertunda (pending) yang bisa dibatalkan" });
    }
});

// Backward compatibility endpoints
app.post('/webhook/schedule', (req, res) => {
    const { target, message, time, media } = req.body;
    
    if (!target || !message || !time) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const db = readDb();
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 5);
    const newBroadcast = {
        id,
        target,
        message,
        media: media || null,
        type: 'scheduled',
        status: 'pending',
        time,
        createdAt: new Date().toISOString(),
        executedAt: null,
        error: null
    };

    db.unshift(newBroadcast);
    writeDb(db);

    const success = registerSchedule(newBroadcast);
    if (success) {
        res.json({ success: true, message: `Broadcast dijadwalkan pada ${time}` });
    } else {
        res.status(500).json({ error: "Gagal menjadwalkan" });
    }
});

app.post('/webhook/openclaw/send', (req, res) => {
    const { target, message, media } = req.body;
    
    if (!target || !message) {
        return res.status(400).json({ error: "Missing 'target' or 'message'" });
    }

    const db = readDb();
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 5);
    const newBroadcast = {
        id,
        target,
        message,
        media: media || null,
        type: 'immediate',
        status: 'sending',
        time: null,
        createdAt: new Date().toISOString(),
        executedAt: null,
        error: null
    };

    db.unshift(newBroadcast);
    writeDb(db);

    const tempMsgPath = path.join(__dirname, `temp_msg_${id}.txt`);
    try {
        fs.writeFileSync(tempMsgPath, message, 'utf8');
    } catch (err) {
        newBroadcast.status = 'failed';
        newBroadcast.error = err.message;
        writeDb(db);
        return res.status(500).json({ error: "Gagal memproses pesan" });
    }

    let command = `node "${OPENCLAW_BIN}" message send --target "${target}" --message "${tempMsgPath}"`;
    if (media) {
        command += ` --media "${media}"`;
    }

    exec(command, (error, stdout, stderr) => {
        try { fs.unlinkSync(tempMsgPath); } catch (e) {}
        
        if (error) {
            updateBroadcastStatus(id, 'failed', error.message);
            return res.status(500).json({ error: error.message, stderr });
        }
        updateBroadcastStatus(id, 'sent', null, stdout);
        res.json({ success: true, output: stdout });
    });
});

app.listen(PORT, () => {
    console.log(`========================================================`);
    console.log(`🚀 OpenClaw Local Server berjalan di http://localhost:${PORT}`);
    console.log(`========================================================`);
    console.log(`Menunggu perintah broadcast dari Dashboard...`);
    initScheduler();
});
