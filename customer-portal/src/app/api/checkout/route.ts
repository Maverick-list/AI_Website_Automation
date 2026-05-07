import { NextRequest, NextResponse } from "next/server";
import { getDB, saveDB } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { productId, buyerName, waNumber, location } = await req.json();
    const db = getDB();
    const idx = db.inventory.findIndex(p => p.id === productId);

    if (idx === -1) return NextResponse.json({ error: "Produk tidak ditemukan" }, { status: 404 });
    if (db.inventory[idx].stock <= 0) return NextResponse.json({ error: "Stok habis" }, { status: 400 });

    db.inventory[idx].stock -= 1;

    const record = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      type: "income" as const,
      amount: db.inventory[idx].price,
      description: `Sale of ${db.inventory[idx].name} to ${buyerName}`,
    };
    db.finance.push(record);

    const order = {
      id: record.id,
      date: record.date,
      productId,
      productName: db.inventory[idx].name,
      buyerName,
      waNumber,
      location,
      amount: record.amount,
      status: "pending" as const,
    };
    db.orders = db.orders || [];
    db.orders.push(order);

    saveDB(db);

    // Trigger OpenClaw
    try {
      await fetch("http://localhost:5000/webhook/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: record.id, product: db.inventory[idx].name, total: record.amount, buyerName, waNumber, location }),
      });
    } catch {}

    return NextResponse.json({ success: true, orderId: record.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
