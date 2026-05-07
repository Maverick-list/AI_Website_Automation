import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function GET(req: NextRequest) {
  const wa = req.nextUrl.searchParams.get("wa");
  if (!wa) return NextResponse.json([]);

  const db = getDB();
  const orders = (db.orders || []).filter(o => o.waNumber === wa);
  return NextResponse.json(orders);
}
