import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Analisis gambar produk ini. Berikan output dalam format JSON berisi: nama_produk, kategori, perkiraan_harga_jual (dalam angka saja), dan deskripsi_singkat yang menarik. Pastikan output hanya JSON mentah tanpa markdown code blocks.";

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: buffer.toString("base64"),
          mimeType: file.type,
        },
      },
    ]);

    const response = await result.response;
    const text = response.text();
    
    // Clean up potential markdown code blocks if any
    const jsonString = text.replace(/```json|```/g, "").trim();
    const data = JSON.parse(jsonString);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Scan Product Error:", error);
    return NextResponse.json({ error: error.message || "Failed to scan product" }, { status: 500 });
  }
}
