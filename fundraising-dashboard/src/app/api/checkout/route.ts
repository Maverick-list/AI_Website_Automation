import { NextRequest, NextResponse } from "next/server";
import { getDB, saveDB } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { productId, buyerName, waNumber, location } = await req.json();

    const db = getDB();
    const productIndex = db.inventory.findIndex((p) => p.id === productId);

    if (productIndex === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (db.inventory[productIndex].stock <= 0) {
      return NextResponse.json({ error: "Out of stock" }, { status: 400 });
    }

    // 1. Reduce stock
    db.inventory[productIndex].stock -= 1;

    // 2. Record to Finance
    const amount = db.inventory[productIndex].price;
    const newFinanceRecord = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      type: "income" as const,
      amount: amount,
      description: `Sale of ${db.inventory[productIndex].name} to ${buyerName} (${waNumber})`,
    };
    db.finance.push(newFinanceRecord);

    saveDB(db);

    // 3. Trigger OpenClaw Webhook
    try {
      await fetch("http://localhost:5000/webhook/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: newFinanceRecord.id,
          product: db.inventory[productIndex].name,
          total: amount,
          buyerName,
          waNumber,
          location
        }),
      });
    } catch (e) {
      console.error("OpenClaw Webhook Failed:", e);
    }

    return NextResponse.json({ 
      success: true, 
      message: "Order placed successfully",
      record: newFinanceRecord 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
