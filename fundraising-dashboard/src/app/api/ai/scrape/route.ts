import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: "Missing URL" }, { status: 400 });

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ 
        error: "GEMINI_API_KEY not configured.",
        result: { 
            hook: "N/A", 
            strategy: "Mock Data: Scraper tidak bisa jalan tanpa API Key.", 
            weakness: "N/A" 
        }
      });
    }

    // Try to fetch the URL content
    let textContent = "";
    try {
      const pageRes = await fetch(url);
      const html = await pageRes.text();
      // Simple regex to extract body text roughly
      textContent = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                        .replace(/<[^>]+>/g, ' ')
                        .replace(/\s+/g, ' ')
                        .substring(0, 10000); // Limit text length
    } catch (e) {
      return NextResponse.json({ error: "Gagal mengakses URL tersebut." }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Analisa konten halaman web kampanye berikut ini dan ekstrak insight strategi kompetitor.
    Konten: "${textContent}"

    Berikan output dalam format JSON mentah persis seperti ini:
    {
      "hook": "Kesimpulan dari hook atau judul kampanye mereka",
      "strategy": "Penjelasan singkat strategi pemasaran/copywriting yang digunakan",
      "weakness": "Kelemahan atau celah yang bisa dimanfaatkan oleh kampanye kita"
    }
    
    Jangan berikan markdown apapun selain JSON.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    const jsonString = jsonMatch ? jsonMatch[0] : responseText;
    
    return NextResponse.json({ result: JSON.parse(jsonString) });
  } catch (error: any) {
    console.error("Scraper Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
