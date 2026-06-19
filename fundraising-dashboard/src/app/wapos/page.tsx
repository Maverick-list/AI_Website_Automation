"use client";

import { useState } from "react";
import { Search, ShoppingCart, Plus, Minus, CreditCard, Receipt, ScanLine } from "lucide-react";
import { motion } from "framer-motion";

export default function WaPosPage() {
  const [cart, setCart] = useState<{id: number, name: string, price: number, qty: number}[]>([]);
  
  const products = [
    { id: 1, name: "Paket Sembako Ramadhan", price: 150000, category: "Paket", stock: 50 },
    { id: 2, name: "Donasi Yatim", price: 50000, category: "Donasi", stock: 999 },
    { id: 3, name: "Wakaf Al-Quran", price: 100000, category: "Wakaf", stock: 120 },
    { id: 4, name: "Kaos Relawan", price: 85000, category: "Merchandise", stock: 30 },
    { id: 5, name: "Mug Eksklusif", price: 45000, category: "Merchandise", stock: 85 },
    { id: 6, name: "Tiket Charity Concert", price: 250000, category: "Event", stock: 15 },
  ];

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart(prev => prev.map(p => {
      if (p.id === id) {
        const newQty = Math.max(0, p.qty + delta);
        return { ...p, qty: newQty };
      }
      return p;
    }).filter(p => p.qty > 0));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const tax = subtotal * 0.11;
  const total = subtotal + tax;

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col space-y-4 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Wablas POS (wapos.id)</h1>
          <p className="text-foreground/50">Point of Sale terintegrasi langsung dengan WhatsApp.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-foreground/5 hover:bg-foreground/10 border border-white/10 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors">
            <ScanLine size={16} /> Barcode Scan
          </button>
        </div>
      </header>

      <div className="flex-1 flex gap-6">
        {/* Products Grid */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" size={20} />
            <input 
              type="text" 
              placeholder="Cari produk, paket donasi, atau merchandise..." 
              className="w-full bg-card border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm focus:ring-2 focus:ring-accent/50 outline-none shadow-sm"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
            {['Semua', 'Donasi', 'Wakaf', 'Merchandise', 'Event', 'Paket'].map((cat, i) => (
              <button key={i} className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${i === 0 ? 'bg-accent text-white' : 'bg-foreground/5 text-foreground/70 hover:bg-foreground/10'}`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto custom-scrollbar pb-20">
            {products.map((product, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                key={product.id}
                onClick={() => addToCart(product)}
                className="bg-card border border-white/10 rounded-2xl p-4 cursor-pointer hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 transition-all group"
              >
                <div className="h-32 bg-foreground/5 rounded-xl mb-4 flex items-center justify-center group-hover:bg-accent/5 transition-colors">
                  <ShoppingCart size={32} className="text-foreground/20 group-hover:text-accent/40" />
                </div>
                <div className="text-[10px] font-bold text-accent mb-1 uppercase tracking-wider">{product.category}</div>
                <h3 className="font-bold text-sm leading-snug mb-2">{product.name}</h3>
                <div className="flex justify-between items-end">
                  <p className="font-black">Rp {product.price.toLocaleString('id-ID')}</p>
                  <p className="text-[10px] text-foreground/50">Stok: {product.stock}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Cart Sidebar */}
        <div className="w-96 bg-card border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col">
          <h2 className="font-bold text-lg mb-6 flex items-center gap-2">
            <ShoppingCart size={20} className="text-accent" />
            Current Order
          </h2>

          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-foreground/30">
                <ShoppingCart size={48} className="mb-4 opacity-50" />
                <p>Keranjang masih kosong</p>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex justify-between items-center bg-foreground/5 p-3 rounded-xl">
                  <div className="flex-1">
                    <h4 className="text-sm font-bold line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-foreground/60">Rp {item.price.toLocaleString('id-ID')}</p>
                  </div>
                  <div className="flex items-center gap-3 bg-card rounded-lg p-1 border border-white/10">
                    <button onClick={() => updateQty(item.id, -1)} className="p-1 hover:bg-foreground/10 rounded-md transition-colors"><Minus size={14} /></button>
                    <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="p-1 hover:bg-foreground/10 rounded-md transition-colors"><Plus size={14} /></button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="pt-6 border-t border-white/10 mt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">Subtotal</span>
              <span className="font-bold">Rp {subtotal.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">Tax (11%)</span>
              <span className="font-bold">Rp {tax.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-xl font-black text-accent pt-2">
              <span>Total</span>
              <span>Rp {total.toLocaleString('id-ID')}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <button disabled={cart.length === 0} className="bg-foreground/10 hover:bg-foreground/20 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50">
                <Receipt size={18} /> Simpan
              </button>
              <button disabled={cart.length === 0} className="bg-accent hover:bg-accent/90 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-accent/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50">
                <CreditCard size={18} /> Bayar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}