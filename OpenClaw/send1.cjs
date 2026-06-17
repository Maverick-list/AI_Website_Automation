const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const msg = fs.readFileSync('message.txt', 'utf8');
const openclawPath = "C:\\Users\\MAVERICK\\AppData\\Roaming\\npm\\node_modules\\openclaw\\openclaw.mjs";

let args = [
    openclawPath,
    'message', 'send',
    '--target', '120363401263735503@g.us',
    '--message', msg
];

// Cari file gambar untuk broadcast 1
const projectDir = 'E:\\AI_Automation_Website';
const files = fs.readdirSync(projectDir);
// Cari file dengan kata "broadcast" dan "1" (case-insensitive) yang berupa gambar
const photo = files.find(f => {
    const lower = f.toLowerCase();
    return lower.includes('broadcast') && lower.includes('1') && 
           (lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.png'));
});

if (photo) {
    const photoPath = path.join(projectDir, photo);
    args.push('--media', photoPath);
    console.log("Ditemukan gambar Broadcast 1:", photoPath);
} else {
    console.log("Gambar Broadcast 1 tidak ditemukan di folder E:\\AI_Automation_Website. Mengirim pesan teks saja.");
}

const result = spawnSync('node', args);

if (result.stdout) console.log(result.stdout.toString());
if (result.stderr) console.error(result.stderr.toString());

if (result.status !== 0) {
    console.error("Exit code:", result.status);
    process.exit(1);
} else {
    console.log("Success!");
}
