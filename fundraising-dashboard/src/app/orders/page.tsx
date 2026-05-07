"use client";

import { useState, useEffect } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-foreground/50">Lacak dan kelola semua pesanan produk fundraising Anda.</p>
      </header>

      <div className="bg-card border border-sidebar-border rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-foreground/5 border-b border-sidebar-border">
                <th className="px-6 py-4 text-xs font-bold uppercase text-foreground/50 tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-foreground/50 tracking-wider">Tanggal</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-foreground/50 tracking-wider">Produk</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-foreground/50 tracking-wider">Pembeli</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-foreground/50 tracking-wider">Total</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-foreground/50 tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              {loading ? (
                [1, 2, 3].map((i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={6} className="px-6 py-4 h-12 bg-foreground/[0.02]" />
                  </tr>
                ))
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-foreground/30 italic">
                    Belum ada pesanan masuk.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-foreground/[0.01] transition-colors">
                    <td className="px-6 py-4 font-mono text-xs">{order.id}</td>
                    <td className="px-6 py-4 text-sm">
                      {new Date(order.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold">{order.productName}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium">{order.buyerName}</div>
                      <div className="text-xs text-foreground/40">{order.waNumber}</div>
                    </td>
                    <td className="px-6 py-4 font-bold text-sm">
                      Rp {order.amount.toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                        order.status === "pending" ? "bg-yellow-500/10 text-yellow-600" :
                        order.status === "delivered" ? "bg-green-500/10 text-green-600" :
                        "bg-blue-500/10 text-blue-600"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card border border-sidebar-border p-6 rounded-3xl">
          <p className="text-xs font-bold text-foreground/40 uppercase">Total Pesanan</p>
          <p className="text-3xl font-black mt-2">{orders.length}</p>
        </div>
        <div className="bg-card border border-sidebar-border p-6 rounded-3xl">
          <p className="text-xs font-bold text-foreground/40 uppercase">Menunggu Proses</p>
          <p className="text-3xl font-black mt-2 text-yellow-500">
            {orders.filter(o => o.status === "pending").length}
          </p>
        </div>
      </div>
    </div>
  );
}
