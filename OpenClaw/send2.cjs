const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function runBroadcast() {
    const msg = fs.readFileSync(path.join(__dirname, 'message2.txt'), 'utf8');
    const openclawPath = "C:\\Users\\MAVERICK\\AppData\\Roaming\\npm\\node_modules\\openclaw\\openclaw.mjs";

    const projectDir = 'E:\\AI_Automation_Website';
    const files = fs.readdirSync(projectDir);

    const photos = files.filter(f => {
        const lower = f.toLowerCase();
        return lower.includes('broadcast') && lower.includes('2') && 
               (lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.png')) &&
               !lower.includes('stitched');
    }).sort(); 

    let finalMedia = null;

    if (photos.length > 1) {
        console.log(`Ditemukan ${photos.length} gambar untuk Broadcast 2. Menyatukan (stitching) gambar...`);
        try {
            const { Jimp } = require('jimp');
            
            // Baca gambar
            const images = [];
            for (let p of photos) {
                images.push(await Jimp.read(path.join(projectDir, p)));
            }

            // Samakan tinggi semua gambar ke gambar pertama
            const targetHeight = images[0].bitmap.height;
            for (let i = 1; i < images.length; i++) {
                images[i].resize({ h: targetHeight });
            }

            // Hitung lebar total
            const totalWidth = images.reduce((acc, img) => acc + img.bitmap.width, 0);

            // Buat canvas baru
            const stitched = new Jimp({ width: totalWidth, height: targetHeight });
            
            let currentX = 0;
            for (let img of images) {
                stitched.composite(img, currentX, 0);
                currentX += img.bitmap.width;
            }

            finalMedia = path.join(projectDir, 'Broadcast_2_stitched.jpg');
            // Write as JPEG with 80% quality to compress it drastically (to ~200-500 KB)
            const buffer = await stitched.getBuffer('image/jpeg', { quality: 80 });
            fs.writeFileSync(finalMedia, buffer);
            console.log("Gambar berhasil disatukan dan dikompresi: ", finalMedia);
        } catch (e) {
            console.error("Gagal menyatukan gambar. Pastikan modul 'jimp' sudah terinstall (npm install jimp).", e);
            finalMedia = path.join(projectDir, photos[0]); // Fallback ke gambar pertama
        }
    } else if (photos.length === 1) {
        finalMedia = path.join(projectDir, photos[0]);
    }

    let args = [
        openclawPath,
        'message', 'send',
        '--target', '120363401263735503@g.us',
        '--message', msg
    ];

    if (finalMedia) {
        args.push('--media', finalMedia);
        console.log(`Mengirim pesan dengan media: ${finalMedia}`);
    } else {
        console.log("Gambar Broadcast 2 tidak ditemukan. Mengirim pesan teks saja.");
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
