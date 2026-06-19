const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { spawn } = require('child_process');
const multer = require('multer');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode');

const app = express();
const PORT = 5000;
const DB_FILE = path.join(__dirname, 'broadcasts.json');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup Multer Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, uuidv4() + ext);
  }
});
const upload = multer({ storage: storage });

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
// WHATSAPP CLIENT MANAGER
// ----------------------------------------------------
const clients = {};
let activeQrCode = null;

function initializeClient(clientId) {
    if (clients[clientId]) return clients[clientId];

    console.log(`Initializing WhatsApp Client: ${clientId}`);
    const client = new Client({
        authStrategy: new LocalAuth({ clientId: clientId }),
        puppeteer: {
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
    });

    client.on('qr', async (qr) => {
        console.log(`QR RECEIVED for ${clientId}`);
        try {
            activeQrCode = await qrcode.toDataURL(qr); // Save latest QR for the frontend as Base64 Image
        } catch (err) {
            console.error("Failed to generate QR data URL", err);
            activeQrCode = qr;
        }
    });

    client.on('ready', () => {
        console.log(`Client ${clientId} is ready!`);
        activeQrCode = null;
    });

    client.on('authenticated', () => {
        console.log(`Client ${clientId} authenticated successfully!`);
    });

    client.on('auth_failure', msg => {
        console.error(`Client ${clientId} authentication failed:`, msg);
    });

    client.on('disconnected', (reason) => {
        console.log(`Client ${clientId} was disconnected:`, reason);
        delete clients[clientId];
        
        // Auto reconnect after 5 seconds if disconnected
        setTimeout(() => {
            initializeClient(clientId);
        }, 5000);
    });

    client.initialize();
    clients[clientId] = client;
    return client;
}

// Initialize default client on startup
initializeClient('default');

// ----------------------------------------------------
// API ENDPOINTS
// ----------------------------------------------------

app.get('/api/status', (req, res) => {
    res.json({ connected: true });
});

app.get('/api/wa/add-device', (req, res) => {
    // Returns the current QR code if not authenticated
    if (activeQrCode) {
        return res.json({ qr: activeQrCode, status: "pending_scan" });
    } else {
        const client = clients['default'];
        if (client && client.info) {
            return res.json({ status: "connected", wid: client.info.wid._serialized, name: client.info.pushname });
        }
        return res.json({ status: "generating", message: "Sedang menyiapkan QR Code, silakan coba beberapa detik lagi..." });
    }
});

app.get('/api/senders', (req, res) => {
    // List all connected clients
    const senders = [];
    for (const [id, client] of Object.entries(clients)) {
        if (client.info) {
            senders.push({
                id: id,
                label: `WhatsApp ${client.info.pushname || client.info.wid.user}`
            });
        }
    }
    
    // If no client is connected yet, but we are trying to connect default
    if (senders.length === 0) {
        senders.push({ id: 'default', label: 'Default (Not Connected)' });
    }
    
    res.json(senders);
});

app.get('/api/broadcasts', (req, res) => {
    const broadcasts = getBroadcasts();
    broadcasts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(broadcasts);
});

app.post('/api/broadcasts', upload.array('mediaFiles'), (req, res) => {
    const { target, message, time, senderAccount, isRecurring, intervalMinutes } = req.body;
    let mediaPaths = [];

    if (req.files && req.files.length > 0) {
        mediaPaths = req.files.map(file => file.path);
    }

    if (!target || !message) {
        return res.status(400).json({ error: "Target and message are required" });
    }

    const type = isRecurring === 'true' ? "recurring" : (time ? "scheduled" : "immediate");
    
    const newBroadcast = {
        id: uuidv4(),
        senderAccount: senderAccount || 'default',
        target,
        message,
        media: mediaPaths.length > 0 ? mediaPaths : null,
        type: type,
        intervalMinutes: isRecurring === 'true' ? parseInt(intervalMinutes || '5', 10) : null,
        status: time ? "pending" : "sending",
        time: time || null,
        createdAt: new Date().toISOString(),
        executedAt: null,
        error: null
    };

    const broadcasts = getBroadcasts();
    broadcasts.push(newBroadcast);
    saveBroadcasts(broadcasts);

    if (!time && type !== "recurring") {
        sendBroadcast(newBroadcast.id);
    }

    res.status(201).json(newBroadcast);
});

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

async function sendBroadcast(id) {
    let broadcasts = getBroadcasts();
    let index = broadcasts.findIndex(b => b.id === id);
    if (index === -1) return;

    let b = broadcasts[index];
    b.status = "sending";
    saveBroadcasts(broadcasts);

    console.log(`[${new Date().toISOString()}] Sending Broadcast ID: ${id} to ${b.target}`);

    try {
        const client = clients[b.senderAccount] || clients['default'];
        if (!client || !client.info) {
            throw new Error(`WhatsApp client ${b.senderAccount} is not connected!`);
        }

        // Clean target number (remove non-digits and append @c.us if it's a direct number)
        let chatId = b.target;
        if (!chatId.endsWith('@g.us') && !chatId.endsWith('@c.us')) {
            chatId = chatId.replace(/\D/g, '') + '@c.us';
        }

        const mediaList = Array.isArray(b.media) ? b.media : (b.media ? [b.media] : []);
        
        if (mediaList.length === 0) {
            await client.sendMessage(chatId, b.message);
        } else {
            for (let i = 0; i < mediaList.length; i++) {
                const mediaPath = mediaList[i];
                const media = MessageMedia.fromFilePath(mediaPath);
                
                // Only attach text message to the first media
                if (i === 0) {
                    await client.sendMessage(chatId, media, { caption: b.message });
                } else {
                    await client.sendMessage(chatId, media);
                }
                
                // Small delay between sending multiple files
                if (i < mediaList.length - 1) {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                }
            }
        }

        // Success
        broadcasts = getBroadcasts();
        index = broadcasts.findIndex(x => x.id === id);
        b = broadcasts[index];
        
        b.status = "sent";
        b.executedAt = new Date().toISOString();
        saveBroadcasts(broadcasts);
        console.log(`[${new Date().toISOString()}] Broadcast ${id} successfully sent!`);
        
        const chimeArgs = ['-Command', "(New-Object System.Media.SoundPlayer 'C:\\Windows\\Media\\Windows Notify.wav').PlaySync()"];
        spawn('powershell', chimeArgs, { detached: true });

    } catch (error) {
        broadcasts = getBroadcasts();
        index = broadcasts.findIndex(x => x.id === id);
        b = broadcasts[index];
        
        b.status = "failed";
        b.error = error.message;
        b.executedAt = new Date().toISOString();
        saveBroadcasts(broadcasts);
        console.error(`[${new Date().toISOString()}] Broadcast ${id} failed: ${b.error}`);
    }
}

// ----------------------------------------------------
// SCHEDULER
// ----------------------------------------------------
setInterval(() => {
    let broadcasts = getBroadcasts();
    const now = new Date();
    
    let needsSave = false;
    let broadcastsToSend = [];

    for (let i = 0; i < broadcasts.length; i++) {
        let b = broadcasts[i];
        if (b.status === "pending" && b.time) {
            const scheduleTime = new Date(b.time);
            if (now >= scheduleTime) {
                console.log(`[${now.toISOString()}] Triggering scheduled broadcast ${b.id} (${b.type})`);
                
                if (b.type === "recurring") {
                    const childId = uuidv4();
                    const childBroadcast = {
                        ...b,
                        id: childId,
                        type: "immediate",
                        status: "sending",
                        time: null,
                        intervalMinutes: null,
                        createdAt: new Date().toISOString(),
                        executedAt: null,
                        error: null
                    };
                    broadcasts.push(childBroadcast);
                    
                    b.time = new Date(now.getTime() + (b.intervalMinutes || 5) * 60000).toISOString();
                    needsSave = true;
                    broadcastsToSend.push(childId);
                } else {
                    b.status = "sending";
                    needsSave = true;
                    broadcastsToSend.push(b.id);
                }
            }
        }
    }

    if (needsSave) {
        saveBroadcasts(broadcasts);
    }
    
    for (const id of broadcastsToSend) {
        sendBroadcast(id);
    }
}, 10000);

app.listen(PORT, () => {
    console.log(`=============================================`);
    console.log(`  WhatsApp Web JS API Server (Native QR)`);
    console.log(`  Listening on http://localhost:${PORT}`);
    console.log(`=============================================`);
});
