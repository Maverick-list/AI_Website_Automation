const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function runBroadcast() {
    const msg = fs.readFileSync(path.join(__dirname, 'message2.txt'), 'utf8');
    const openclawPath = "C:\\Users\\MAVERICK\\AppData\\Roaming\\npm\\node_modules\\openclaw\\openclaw.mjs";

    const projectDir = 'E:\\AI_Automation_Website';
    const finalMedia = path.join(projectDir, 'Broadcast 2.png');

    let args = [
        openclawPath,
        'message', 'send',
        '--target', '120363401263735503@g.us',
        '--message', msg
    ];

    if (fs.existsSync(finalMedia)) {
        args.push('--media', finalMedia);
        console.log(`Mengirim pesan dengan media: ${finalMedia}`);
    } else {
        console.log("Gambar Broadcast 2.png tidak ditemukan. Mengirim pesan teks saja.");
    }

    const result = spawnSync('node', args);

    if (result.stdout) console.log(result.stdout.toString());
    if (result.stderr) console.error(result.stderr.toString());

    if (result.status !== 0) {
        console.error("Exit code:", result.status);
        process.exit(1);
    } else {
        console.log("Proses Broadcast 2 Selesai!");
    }
}

runBroadcast();
