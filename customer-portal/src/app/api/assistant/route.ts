import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ reply: "Maaf, layanan AI sedang dalam perbaikan. Silakan hubungi kami via WhatsApp." });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const { message } = await req.json();
    const db = getDB();

    const productsContext = db.inventory.map(p =>
      `- ${p.name} (${p.category}): Rp ${p.price.toLocaleString("id-ID")} | Stok: ${p.stock} | ${p.description}`
    ).join("\n");

    const prompt = `Kamu adalah FundRaise AI Shopping Assistant. Kamu ramah, kasual, dan membantu pelanggan berbelanja produk sosial.

Konteks Produk Tersedia:
${productsContext}

Panduan:
- Jawab dalam bahasa Indonesia yang kasual dan ramah (gunakan emoji)
- Jika user bertanya soal produk, rekomendasikan berdasarkan konteks di atas
- Jika user bertanya soal pengiriman, katakan estimasi 30-60 menit
- Jika user ingin pesan, arahkan ke halaman Katalog (/shop)
- Jika user bertanya soal lacak pesanan, arahkan ke halaman Lacak Pesanan (/track)
- Tetap fokus pada topik belanja & produk sosial
- Jawab singkat, maksimal 3 paragraf

User bertanya: "${message}"

Jawab:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return NextResponse.json({ reply: response.text() });
  } catch (error: any) {
    console.error("Assistant Error:", error);
    return NextResponse.json({ reply: "Maaf, ada gangguan teknis. Coba tanya lagi ya! 🙏" });
  }
}
