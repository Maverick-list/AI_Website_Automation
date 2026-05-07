import { getDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const db = getDB();
  const products = db.inventory.map(p => ({
    id: p.id,
    name: p.name,
    category: p.category,
    price: p.price,
    stock: p.stock,
    description: p.description,
  }));
  return NextResponse.json(products);
}
