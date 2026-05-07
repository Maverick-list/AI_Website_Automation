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
    <div className="max-w-6xl mx-auto px-6">
      <header className="py-10">
        <h1 className="text-3xl font-black tracking-tight">Katalog Produk</h1>
        <p className="text-foreground/50">Pilih produk yang ingin Anda dukung. Setiap pembelian adalah kontribusi nyata.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-16">
        {products.map((product) => (
          <div key={product.id} className="bg-card border border-sidebar-border rounded-3xl overflow-hidden hover:border-accent/30 transition-all group">
            <div className="h-48 bg-gradient-to-br from-accent/5 to-accent-secondary/5 flex items-center justify-center">
              <span className="text-6xl group-hover:animate-float">
                {product.category === "Hardware" ? "💡" : product.category === "Health" ? "💧" : "📱"}
              </span>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-accent tracking-widest">{product.category}</span>
                <h3 className="text-xl font-bold mt-1">{product.name}</h3>
                <p className="text-sm text-foreground/50 mt-1">{product.description}</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-black">Rp {product.price.toLocaleString("id-ID")}</p>
                  <p className={`text-xs font-bold ${product.stock > 10 ? "text-green-500" : "text-orange-500"}`}>
                    Stok: {product.stock} unit
                  </p>
                </div>
                <button
                  onClick={() => { setCheckoutProduct(product); setSuccess(false); setForm({ name: "", wa: "", location: "" }); }}
                  disabled={product.stock <= 0}
                  className="bg-accent text-white px-6 py-3 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-lg shadow-accent/20"
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
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="bg-card border border-sidebar-border w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
            {success ? (
              <div className="p-10 text-center">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h2 className="text-2xl font-black mb-2">Pesanan Berhasil! 🎉</h2>
                <p className="text-sm text-foreground/50 mb-2">Konfirmasi akan dikirim ke WhatsApp Anda oleh asisten AI kami.</p>
                <p className="text-xs text-foreground/30 mb-6">Estimasi pengiriman: 30-60 menit</p>
                <button onClick={() => setCheckoutProduct(null)} className="bg-accent text-white px-8 py-3 rounded-2xl font-bold">
                  Tutup
                </button>
              </div>
            ) : (
              <>
                <div className="p-6 border-b border-sidebar-border bg-foreground/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold">Checkout</h2>
                      <p className="text-sm text-foreground/50">{checkoutProduct.name} - Rp {checkoutProduct.price.toLocaleString("id-ID")}</p>
                    </div>
                    <button onClick={() => setCheckoutProduct(null)} className="text-foreground/30 hover:text-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                  </div>
                </div>
                <form onSubmit={handleCheckout} className="p-8 space-y-5">
                  <div>
                    <label className="text-xs font-bold text-foreground/50 uppercase">Nama Lengkap</label>
                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-foreground/5 border border-sidebar-border rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-accent/50 outline-none" placeholder="Masukkan nama Anda" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-foreground/50 uppercase">Nomor WhatsApp</label>
                    <input required value={form.wa} onChange={e => setForm({ ...form, wa: e.target.value })}
                      className="w-full bg-foreground/5 border border-sidebar-border rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-accent/50 outline-none" placeholder="08xxxxxxxxxx" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-foreground/50 uppercase">Alamat Pengiriman</label>
                    <input required value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}
                      className="w-full bg-foreground/5 border border-sidebar-border rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-accent/50 outline-none" placeholder="Alamat lengkap" />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full bg-accent text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-all">
                    {loading ? <span className="inline-block w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Konfirmasi Pesanan"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
