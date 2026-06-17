// broadcast.ts – OpenClaw WhatsApp broadcast script
import { getChannel } from "openclaw";
import type { WhatsAppClient } from "openclaw/channels/whatsapp";

async function main() {
  const client: WhatsAppClient = await getChannel("whatsapp");
  // Ensure client is connected (will output QR on first run)
  await client.ensureConnected();

  const groupIds: string[] = JSON.parse(process.env.OPENCLAW_GROUP_IDS ?? "[]");
  const message: string = process.env.OPENCLAW_MESSAGE ?? "{{MESSAGE}}";

  for (const id of groupIds) {
    await client.sendMessage(id, { text: message });
    console.log(`Sent to ${id}`);
  }
}

main().catch(err => console.error("Broadcast error:", err));
