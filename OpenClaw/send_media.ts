import { getChannel } from "openclaw";

async function main() {
  const client = await getChannel("whatsapp");
  await client.ensureConnected();

  const id = "120363401263735503@g.us";
  const fs = await import("fs");
  const message = fs.readFileSync("message2.txt", "utf-8");

  await client.sendMessage(id, { 
      text: message,
      media: "E:\\AI_Automation_Website\\PushCup.jpeg"
  });
  console.log(`Sent to ${id}`);
}

main().catch(err => {
    console.error("Broadcast error:", err);
    process.exit(1);
});
