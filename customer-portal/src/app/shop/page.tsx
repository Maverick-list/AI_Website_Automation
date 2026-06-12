"use client";

import { useState, useEffect } from "react";

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [checkoutProduct, setCheckoutProduct] = useState<any>(null);
  const [form, setForm] = useState({ name: "", wa: "", location: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/products").then(r => r.json()).then(setProducts);
  }, []);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: checkoutProduct.id,
          buyerName: form.name,
          waNumber: form.wa,
          location: form.location,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setProducts(prev => prev.map(p => p.id === checkoutProduct.id ? { ...p, stock: p.stock - 1 } : p));
      } else {
        alert(data.error || "Gagal checkout");
      }
    } catch {
      alert("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 relative">
      <div className="absolute top-0 left-0 w-full h-96 bg-accent/5 blur-[120px] -z-10" />
      
      <header className="py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">Katalog Kurasi</h1>
        <p className="text-xl text-white/40 max-w-2xl mx-auto font-medium">Pilih produk berkualitas tinggi yang berdampak langsung pada perubahan positif dunia.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-32">
        {products.map((product) => (
          <div key={product.id} className="glass rounded-[40px] overflow-hidden hover:border-accent/50 transition-all group relative">
            <div className="h-64 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-accent/5 group-hover:bg-accent/10 transition-colors" />
              <span className="text-8xl group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                {product.category === "Hardware" ? "💡" : product.category === "Health" ? "💧" : "📱"}
              </span>
              <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white/60">
                In Stock
              </div>
            </div>
            
            <div className="p-10 space-y-6">
              <div>
                <span className="text-[10px] uppercase font-black text-accent tracking-[0.2em]">{product.category}</span>
                <h3 className="text-2xl font-black mt-2 tracking-tight">{product.name}</h3>
                <p className="text-white/40 font-medium text-sm mt-3 leading-relaxed">{product.description}</p>
              </div>
              
              <div className="flex items-end justify-between pt-4 border-t border-white/5">
                <div>
                  <p className="text-[10px] uppercase font-black text-white/20 tracking-widest mb-1">Price</p>
                  <p className="text-3xl font-black tracking-tighter">Rp {product.price.toLocaleString("id-ID")}</p>
                </div>
                <button
                  onClick={() => { setCheckoutProduct(product); setSuccess(false); setForm({ name: "", wa: "", location: "" }); }}
                  disabled={product.stock <= 0}
                  className="bg-white text-black px-8 py-4 rounded-2xl font-black hover:bg-accent hover:text-white transition-all disabled:opacity-50 shadow-xl shadow-white/5 active:scale-95"
                >
                  Beli
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Modal */}
      {checkoutProduct && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl animate-in fade-in duration-300">
          <div className="glass w-full max-w-xl rounded-[40px] shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden">
            {success ? (
              <div className="p-16 text-center animate-in zoom-in-95 duration-500">
                <div className="w-24 h-24 bg-accent/20 rounded-[30px] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-accent/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h2 className="text-4xl font-black mb-4 tracking-tighter">Berhasil! 🎉</h2>
                <p className="text-white/40 font-medium mb-8 leading-relaxed">Terima kasih atas kontribusi Anda. Asisten AI kami akan segera menghubungi Anda melalui WhatsApp untuk detail pengiriman.</p>
                <button onClick={() => setCheckoutProduct(null)} className="bg-white text-black px-12 py-5 rounded-2xl font-black text-lg hover:bg-accent hover:text-white transition-all shadow-xl shadow-white/5">
                  Tutup
                </button>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
                <div className="md:w-1/3 bg-white/5 p-8 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/5">
                   <div className="text-6xl mb-6">{checkoutProduct.category === "Hardware" ? "💡" : checkoutProduct.category === "Health" ? "💧" : "📱"}</div>
                   <h2 className="text-2xl font-black tracking-tighter mb-2">{checkoutProduct.name}</h2>
                   <p className="text-accent font-black text-xl">Rp {checkoutProduct.price.toLocaleString("id-ID")}</p>
                </div>
                <div className="md:w-2/3 p-10 overflow-y-auto">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-black tracking-tight">Checkout</h2>
                    <button onClick={() => setCheckoutProduct(null)} className="text-white/20 hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                  </div>
                  <form onSubmit={handleCheckout} className="space-y-6">
                    <div>
                      <label className="text-[10px] uppercase font-black text-white/30 tracking-widest mb-2 block">Nama Penerima</label>
                      <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent/50 focus:border-accent/50 outline-none transition-all font-medium" placeholder="Masukkan nama lengkap" />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-black text-white/30 tracking-widest mb-2 block">WhatsApp Aktif</label>
                      <input required value={form.wa} onChange={e => setForm({ ...form, wa: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent/50 focus:border-accent/50 outline-none transition-all font-medium" placeholder="08xxxxxxxxxx" />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-black text-white/30 tracking-widest mb-2 block">Alamat Pengiriman</label>
                      <textarea required value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent/50 focus:border-accent/50 outline-none transition-all font-medium resize-none h-32" placeholder="Alamat lengkap penerima" />
                    </div>
                    <button type="submit" disabled={loading}
                      className="w-full relative group bg-accent text-white py-5 rounded-2xl font-black text-xl shadow-2xl shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-all overflow-hidden">
                      <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      <span className="relative z-10 group-hover:text-accent transition-colors">
                        {loading ? "Memproses..." : "Konfirmasi Pembelian"}
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
