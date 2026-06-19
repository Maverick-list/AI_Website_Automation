const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { spawn } = require('child_process');

const app = express();
const PORT = 5000;
const DB_FILE = path.join(__dirname, 'broadcasts.json');
const OPENCLAW_PATH = "C:\\Users\\MAVERICK\\AppData\\Roaming\\npm\\node_modules\\openclaw\\openclaw.mjs";

app.use(cors());
app.use(express.json());

// Initialize DB
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

function getBroadcasts() {
    try {
        const data = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
}

function saveBroadcasts(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// ----------------------------------------------------
// API ENDPOINTS
// ----------------------------------------------------

// Status Check
app.get('/api/status', (req, res) => {
    // Ideally we would ping openclaw, but simply returning true is enough for UI
    res.json({ connected: true });
});

// Get all broadcasts
app.get('/api/broadcasts', (req, res) => {
    const broadcasts = getBroadcasts();
    // Sort by created at descending
    broadcasts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(broadcasts);
});

// Create/Schedule a broadcast
app.post('/api/broadcasts', (req, res) => {
    const { target, message, media, time } = req.body;

    if (!target || !message) {
        return res.status(400).json({ error: "Target and message are required" });
    }

    const newBroadcast = {
        id: uuidv4(),
        target,
        message,
        media: media || null,
        type: time ? "scheduled" : "immediate",
        status: time ? "pending" : "sending",
        time: time || null,
        createdAt: new Date().toISOString(),
        executedAt: null,
        error: null
    };

    const broadcasts = getBroadcasts();
    broadcasts.push(newBroadcast);
    saveBroadcasts(broadcasts);

    if (!time) {
        // Send immediately in background
        sendBroadcast(newBroadcast.id);
    }

    res.status(201).json(newBroadcast);
});

// Cancel scheduled broadcast
app.delete('/api/broadcasts/:id', (req, res) => {
    const { id } = req.params;
    let broadcasts = getBroadcasts();
    const index = broadcasts.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Broadcast not found" });
    }

    if (broadcasts[index].status === 'pending') {
        broadcasts[index].status = 'cancelled';
        saveBroadcasts(broadcasts);
        res.json({ success: true, message: "Broadcast cancelled" });
    } else {
        res.status(400).json({ error: "Can only cancel pending broadcasts" });
    }
});

// ----------------------------------------------------
// BROADCAST EXECUTION LOGIC
// ----------------------------------------------------

function sendBroadcast(id) {
    let broadcasts = getBroadcasts();
    let index = broadcasts.findIndex(b => b.id === id);
    if (index === -1) return;

    let b = broadcasts[index];
    b.status = "sending";
    saveBroadcasts(broadcasts);

    console.log(`[${new Date().toISOString()}] Sending Broadcast ID: ${id} to ${b.target}`);

    let args = [
        OPENCLAW_PATH,
        'message', 'send',
        '--target', b.target,
        '--message', b.message
    ];

    if (b.media) {
        args.push('--media', b.media);
    }

    const process = spawn('node', args, { shell: true });

    let stdoutData = "";
    let stderrData = "";

    process.stdout.on('data', (data) => {
        stdoutData += data.toString();
        console.log(`[STDOUT] ${data.toString().trim()}`);
    });

    process.stderr.on('data', (data) => {
        stderrData += data.toString();
        console.error(`[STDERR] ${data.toString().trim()}`);
    });

    process.on('close', (code) => {
        broadcasts = getBroadcasts();
        index = broadcasts.findIndex(x => x.id === id);
        if (index === -1) return;

        b = broadcasts[index];
        b.executedAt = new Date().toISOString();

        if (code === 0) {
            b.status = "sent";
            console.log(`[${new Date().toISOString()}] Broadcast ${id} successfully sent!`);
            
            // Play success chime (Windows specific)
            const chimeArgs = ['-Command', "(New-Object System.Media.SoundPlayer 'C:\\Windows\\Media\\Windows Notify.wav').PlaySync()"];
            spawn('powershell', chimeArgs, { detached: true });

        } else {
            b.status = "failed";
            b.error = stderrData || stdoutData || `Failed with exit code ${code}`;
            console.error(`[${new Date().toISOString()}] Broadcast ${id} failed: ${b.error}`);
        }

        saveBroadcasts(broadcasts);
    });
}

// ----------------------------------------------------
// SCHEDULER
// ----------------------------------------------------
setInterval(() => {
    const broadcasts = getBroadcasts();
    const now = new Date();
    
    let needsSave = false;

    for (let i = 0; i < broadcasts.length; i++) {
        let b = broadcasts[i];
        if (b.status === "pending" && b.time) {
            const scheduleTime = new Date(b.time);
            if (now >= scheduleTime) {
                console.log(`[${now.toISOString()}] Triggering scheduled broadcast ${b.id}`);
                // Change status first to avoid multiple triggers
                b.status = "sending";
                needsSave = true;
                sendBroadcast(b.id);
            }
        }
    }

    if (needsSave) {
        saveBroadcasts(broadcasts);
    }
}, 10000); // Check every 10 seconds

app.listen(PORT, () => {
    console.log(`=============================================`);
    console.log(`  WhatsApp Local Broadcast API Server`);
    console.log(`  Listening on http://localhost:${PORT}`);
    console.log(`=============================================`);
});
