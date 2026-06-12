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
    <div className="max-w-4xl mx-auto px-6 py-20 relative">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-accent/10 blur-[120px] -z-10" />

      <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="w-20 h-20 bg-accent/20 text-accent rounded-[30px] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-accent/10">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <h1 className="text-5xl font-black tracking-tighter">Lacak Pesanan</h1>
        <p className="text-white/40 mt-3 font-medium text-lg">Pantau status dampak Anda secara real-time.</p>
      </div>

      <div className="max-w-xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-6 duration-1000">
        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
          <input
            required
            value={waNumber}
            onChange={e => setWaNumber(e.target.value)}
            placeholder="08xxxxxxxxxx"
            className="flex-1 glass rounded-2xl px-8 py-5 focus:ring-2 focus:ring-accent/50 outline-none font-bold text-lg transition-all"
          />
          <button type="submit" disabled={loading}
            className="bg-white text-black px-10 py-5 rounded-2xl font-black text-lg hover:bg-accent hover:text-white transition-all disabled:opacity-50 shadow-2xl shadow-white/5 active:scale-95">
            {loading ? "Mencari..." : "Lacak Sekarang"}
          </button>
        </form>
      </div>

      {orders !== null && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          {orders.length === 0 ? (
            <div className="glass rounded-[40px] p-20 text-center">
              <div className="text-6xl mb-6 opacity-20">🔍</div>
              <p className="text-white/30 italic text-xl font-medium">Maaf, kami tidak dapat menemukan pesanan <br />dengan nomor WhatsApp tersebut.</p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="glass rounded-[40px] p-10 hover:border-accent/30 transition-all group overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl -z-10" />
                
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                      {order.productName.toLowerCase().includes("solar") ? "💡" : order.productName.toLowerCase().includes("water") ? "💧" : "📱"}
                    </div>
                    <div>
                      <p className="font-black text-2xl tracking-tight">{order.productName}</p>
                      <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.3em] mt-1">ID: {order.id}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest ${
                      order.status === "pending" ? "bg-yellow-500/10 text-yellow-500" :
                      order.status === "processing" ? "bg-blue-500/10 text-blue-500" :
                      order.status === "shipped" ? "bg-purple-500/10 text-purple-500" :
                      "bg-green-500/10 text-green-500"
                    }`}>
                      {order.status === "pending" ? "Menunggu" :
                       order.status === "processing" ? "Diproses" :
                       order.status === "shipped" ? "Dikirim" : "Tiba di Tujuan"}
                    </span>
                    <p className="text-3xl font-black tracking-tighter mt-3">Rp {order.amount.toLocaleString("id-ID")}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="glass bg-white/2 p-6 rounded-[25px]">
                    <p className="text-white/20 text-[10px] uppercase font-black tracking-widest mb-2">Alamat Pengiriman</p>
                    <p className="font-bold text-white/70 leading-relaxed">{order.location}</p>
                  </div>
                  <div className="glass bg-white/2 p-6 rounded-[25px]">
                    <p className="text-white/20 text-[10px] uppercase font-black tracking-widest mb-2">Tanggal Pesanan</p>
                    <p className="font-bold text-white/70">{new Date(order.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                  </div>
                </div>

                {/* Progress Visualizer */}
                <div className="mt-12 relative h-12">
                   <div className="absolute top-1/2 left-0 w-full h-1.5 bg-white/5 -translate-y-1/2 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-accent to-accent-secondary transition-all duration-1000 shadow-[0_0_15px_rgba(99,102,241,0.5)]" 
                        style={{ width: `${(steps.indexOf(order.status) + 1) * 25}%` }}
                      />
                   </div>
                   <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center px-2">
                     {["pending", "processing", "shipped", "delivered"].map((step, i) => {
                       const active = steps.indexOf(order.status) >= i;
                       return (
                         <div key={step} className="flex flex-col items-center">
                           <div className={`w-4 h-4 rounded-full border-4 border-background transition-colors duration-500 ${active ? "bg-accent scale-125" : "bg-white/10"}`} />
                           <span className={`text-[9px] font-black uppercase tracking-widest mt-6 ${active ? "text-white" : "text-white/20"}`}>
                             {step === "pending" ? "Order" : step === "processing" ? "Process" : step === "shipped" ? "Ship" : "Arrived"}
                           </span>
                         </div>
                       );
                     })}
                   </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

const steps = ["pending", "processing", "shipped", "delivered"];
