"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then(r => r.json())
      .then(setStats);
  }, []);

  if (!stats) return <div className="flex items-center justify-center h-screen text-white/20 font-black text-2xl animate-pulse">Loading Dashboard...</div>;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-5xl font-black tracking-tighter">Dashboard</h1>
          <p className="text-white/40 font-medium text-lg mt-2">Real-time performance metrics for your impact commerce.</p>
        </div>
        <div className="glass px-6 py-3 rounded-2xl flex items-center space-x-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-black uppercase tracking-widest text-white/60">System Online</span>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Penjualan", value: `Rp ${stats.totalSales.toLocaleString()}`, change: "+12%", trend: "up" },
          { label: "Pesanan Aktif", value: stats.activeOrders.toString(), change: "Check Now", trend: "up" },
          { label: "Donasi Terkumpul", value: `Rp ${stats.totalDonations.toLocaleString()}`, change: "Impact", trend: "up" },
          { label: "Katalog Produk", value: stats.productsCount.toString(), change: "Live", trend: "up" },
        ].map((stat, i) => (
          <div key={i} className="glass p-8 rounded-[40px] group hover:border-accent/50 transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-3xl -z-10 group-hover:bg-white/10 transition-colors" />
            <p className="text-[10px] uppercase tracking-[0.2em] font-black text-white/20 mb-4">{stat.label}</p>
            <p className="text-4xl font-black tracking-tighter mb-4">{stat.value}</p>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black text-white bg-white/10 px-3 py-1 rounded-full uppercase tracking-widest">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Placeholder */}
        <div className="lg:col-span-2 glass rounded-[50px] p-12 min-h-[450px] flex flex-col justify-center items-center text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="w-24 h-24 bg-accent/20 rounded-[35px] flex items-center justify-center mb-8 text-accent group-hover:scale-110 transition-transform duration-500 shadow-2xl shadow-accent/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
          </div>
          <h3 className="text-3xl font-black mb-4 tracking-tighter">Analytics Coming Soon</h3>
          <p className="text-white/30 max-w-sm font-medium text-lg leading-relaxed italic">"AI sedang memproses data historis Anda untuk memberikan insight yang lebih dalam."</p>
          
          <div className="mt-10 flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="w-2 h-8 bg-white/5 rounded-full group-hover:bg-accent/40 transition-all duration-500" style={{ height: `${20 + Math.random() * 40}px` }} />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass rounded-[50px] p-10 flex flex-col">
          <h3 className="text-2xl font-black mb-8 tracking-tight">Pesanan Terbaru</h3>
          <div className="space-y-8 flex-1">
            {stats.recentOrders.length > 0 ? stats.recentOrders.map((order: any, i: number) => (
              <div key={i} className="flex items-center space-x-5 group">
                <div className="w-14 h-14 rounded-[20px] glass flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                   {order.productName.toLowerCase().includes("solar") ? "💡" : "📦"}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-black tracking-tight">{order.buyerName}</p>
                  <p className="text-[11px] text-white/30 font-bold uppercase tracking-wider">{order.productName}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-accent">Rp {order.amount.toLocaleString()}</p>
                  <p className="text-[9px] text-white/20 font-bold uppercase">{order.status}</p>
                </div>
              </div>
            )) : (
              <div className="flex flex-col items-center justify-center h-full text-white/10 italic py-20">
                <p>Belum ada pesanan.</p>
              </div>
            )}
          </div>
          <button className="w-full mt-10 py-5 glass rounded-[20px] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white text-white hover:text-black transition-all">
            Manage All Orders
          </button>
        </div>
      </div>
    </div>
  );
}
