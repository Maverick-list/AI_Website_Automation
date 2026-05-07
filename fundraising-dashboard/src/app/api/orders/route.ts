import { getDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const db = getDB();
  return NextResponse.json(db.orders || []);
}
