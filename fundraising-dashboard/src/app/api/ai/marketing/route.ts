import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const { action, text } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    if (action === "copywriting") {
      const prompt = `Buatlah 3 opsi copywriting iklan media sosial (Instagram/FB) yang sangat menarik, kasual, dan persuasif untuk produk/kampanye berikut: "${text}". Sertakan emoji yang relevan dan call to action (CTA).`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return NextResponse.json({ result: response.text() });
    }

    if (action === "sentiment") {
      const prompt = `Analisis sentimen dari teks berikut: "${text}". Berikan output dalam format JSON mentah: { "sentiment": "Positive" | "Negative" | "Neutral", "score": 0-100, "insight": "analisis singkat tentang apa yang diinginkan user atau masalahnya" }. Hanya JSON.`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const jsonString = response.text().replace(/```json|```/g, "").trim();
      return NextResponse.json({ result: JSON.parse(jsonString) });
    }

    if (action === "generate_campaign") {
      const products = text as any[];
      const productsInfo = products.map(p => `- ${p.name}: ${p.description} (Harga: Rp ${p.price.toLocaleString()})`).join("\n");
      
      const prompt = `Rancanglah 3 jenis copywriting promosi untuk produk-produk fundraising berikut:
      ${productsInfo}

      Buatlah dalam 3 kategori:
      1. FOMO (Fear Of Missing Out): Tekankan urgensi atau kelangkaan.
      2. Storytelling: Buat narasi emosional atau dampak sosial.
      3. Hard Sell: Langsung, padat, dan fokus pada manfaat/harga.

      Setiap kategori HARUS memiliki:
      - Hook (Kalimat pembuka yang memikat)
      - Body (Isi pesan)
      - Call-to-Action (CTA)

      Format output dalam JSON mentah:
      {
        "fomo": { "hook": "...", "body": "...", "cta": "..." },
        "storytelling": { "hook": "...", "body": "...", "cta": "..." },
        "hardsell": { "hook": "...", "body": "...", "cta": "..." }
      }
      Hanya JSON mentah tanpa markdown.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const jsonString = response.text().replace(/```json|```/g, "").trim();
      return NextResponse.json({ result: JSON.parse(jsonString) });
    }

    if (action === "schedule") {
      const { text, time, product } = await req.json();
      
      const response = await fetch("http://localhost:5000/webhook/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, time, product }),
      });

      if (!response.ok) {
        throw new Error("Gagal terhubung ke OpenClaw Scheduler");
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Marketing AI Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
