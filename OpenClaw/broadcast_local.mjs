import { getChannel } from 'file:///C:/Users/MAVERICK/AppData/Roaming/npm/node_modules/openclaw/dist/index.js';
import fs from 'fs';

async function main() {
    const target = process.argv[2];
    const messageFile = process.argv[3];
    
    if (!target || !messageFile) {
        console.error("Usage: node broadcast_local.mjs <target> <messageFile>");
        process.exit(1);
    }
    
    const message = fs.readFileSync(messageFile, 'utf8');
    
    console.log("Connecting to WhatsApp...");
    const client = await getChannel("whatsapp");
    await client.ensureConnected();
    
    console.log(`Sending message to ${target}...`);
    await client.sendMessage(target, { text: message });
    console.log("Sent successfully!");
    
    setTimeout(() => {
        process.exit(0);
    }, 2000);
}

main().catch(err => {
    console.error("Broadcast error:", err);
    process.exit(1);
});
