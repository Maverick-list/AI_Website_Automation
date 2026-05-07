"use client";

import { useState } from "react";

export default function TrackPage() {
  const [waNumber, setWaNumber] = useState("");
  const [orders, setOrders] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/track?wa=${encodeURIComponent(waNumber)}`);
      const data = await res.json();
      setOrders(data);
    } catch {
      alert("Gagal melacak pesanan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <h1 className="text-3xl font-black tracking-tight">Lacak Pesanan</h1>
        <p className="text-foreground/50 mt-2">Masukkan nomor WhatsApp yang digunakan saat checkout.</p>
      </div>

      <form onSubmit={handleTrack} className="flex space-x-3 mb-10">
        <input
          required
          value={waNumber}
          onChange={e => setWaNumber(e.target.value)}
          placeholder="08xxxxxxxxxx"
          className="flex-1 bg-card border border-sidebar-border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent/50 outline-none"
        />
        <button type="submit" disabled={loading}
          className="bg-accent text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-lg shadow-accent/20">
          {loading ? "..." : "Lacak"}
        </button>
      </form>

      {orders !== null && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-card border border-sidebar-border rounded-3xl p-10 text-center">
              <p className="text-foreground/40 italic">Tidak ditemukan pesanan dengan nomor tersebut.</p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-card border border-sidebar-border rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-bold text-lg">{order.productName}</p>
                    <p className="text-xs text-foreground/40 font-mono">{order.id}</p>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase ${
                    order.status === "pending" ? "bg-yellow-500/10 text-yellow-600" :
                    order.status === "processing" ? "bg-blue-500/10 text-blue-600" :
                    order.status === "shipped" ? "bg-purple-500/10 text-purple-600" :
                    "bg-green-500/10 text-green-600"
                  }`}>
                    {order.status === "pending" ? "Menunggu" :
                     order.status === "processing" ? "Diproses" :
                     order.status === "shipped" ? "Dikirim" : "Diterima"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-foreground/40 text-xs uppercase font-bold">Total</p>
                    <p className="font-bold">Rp {order.amount.toLocaleString("id-ID")}</p>
                  </div>
                  <div>
                    <p className="text-foreground/40 text-xs uppercase font-bold">Tanggal</p>
                    <p>{new Date(order.date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-foreground/40 text-xs uppercase font-bold">Alamat</p>
                    <p>{order.location}</p>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="mt-6 flex items-center space-x-1">
                  {["pending", "processing", "shipped", "delivered"].map((step, i) => {
                    const steps = ["pending", "processing", "shipped", "delivered"];
                    const currentIndex = steps.indexOf(order.status);
                    const active = i <= currentIndex;
                    return (
                      <div key={step} className={`flex-1 h-2 rounded-full ${active ? "bg-accent" : "bg-foreground/10"}`} />
                    );
                  })}
                </div>
                <div className="flex justify-between mt-2 text-[10px] font-bold text-foreground/30 uppercase">
                  <span>Pesan</span><span>Proses</span><span>Kirim</span><span>Sampai</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
