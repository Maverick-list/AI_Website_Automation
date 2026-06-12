import { getDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const db = getDB();
  
  const totalSales = db.orders.reduce((sum, order) => sum + order.amount, 0);
  const activeOrders = db.orders.filter(o => o.status !== "delivered").length;
  const totalDonations = totalSales * 0.1; // Asumsi 10% donasi
  const productsCount = db.inventory.length;

  return NextResponse.json({
    totalSales,
    activeOrders,
    totalDonations,
    productsCount,
    recentOrders: db.orders.slice(-5).reverse()
  });
}
