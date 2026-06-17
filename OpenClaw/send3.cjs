const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function runBroadcast() {
    const msg = fs.readFileSync(path.join(__dirname, 'message3.txt'), 'utf8');
    const openclawPath = "C:\\Users\\MAVERICK\\AppData\\Roaming\\npm\\node_modules\\openclaw\\openclaw.mjs";

    const projectDir = 'E:\\AI_Automation_Website';
    const files = fs.readdirSync(projectDir);

    // Cari file gambar untuk broadcast 3
    const photo = files.find(f => {
        const lower = f.toLowerCase();
        return lower.includes('broadcast') && lower.includes('3') && 
               (lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.png'));
    });

    let args = [
        openclawPath,
        'message', 'send',
        '--target', '120363401263735503@g.us',
        '--message', msg
    ];

    if (photo) {
        const photoPath = path.join(projectDir, photo);
        args.push('--media', photoPath);
        console.log(`Mengirim pesan dengan media: ${photoPath}`);
    } else {
        console.log("Gambar Broadcast 3 tidak ditemukan. Mengirim pesan teks saja.");
    }

    const result = spawnSync('node', args);

    if (result.stdout) console.log(result.stdout.toString());
    if (result.stderr) console.error(result.stderr.toString());

    if (result.status !== 0) {
        console.error("Exit code:", result.status);
        process.exit(1);
    } else {
        console.log("Proses Broadcast 3 Selesai!");
    }
}

runBroadcast();
