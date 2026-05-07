"use client";

import { useState } from "react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
}

export default function CatalogContent({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", wa: "", location: "" });
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: selectedProduct.id,
          buyerName: formData.name,
          waNumber: formData.wa,
          location: formData.location,
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      alert(`Pesanan Berhasil! Total: Rp ${selectedProduct.price.toLocaleString()}`);
      setIsCheckoutOpen(false);
      // Update local stock
      setProducts(products.map(p => p.id === selectedProduct.id ? { ...p, stock: p.stock - 1 } : p));
    } catch (error: any) {
      alert("Gagal: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Fundraising Catalog
        </h1>
        <p className="text-foreground/60 mt-2">Dukung kampanye kami dengan membeli produk berkualitas.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-card border border-sidebar-border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="h-48 bg-foreground/5 flex items-center justify-center group-hover:scale-105 transition-transform">
               <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/20"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/10 px-2 py-1 rounded">
                  {product.category}
                </span>
                <span className={`text-xs font-bold ${product.stock > 0 ? "text-green-500" : "text-red-500"}`}>
                  {product.stock > 0 ? `${product.stock} Tersedia` : "Stok Habis"}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-sm text-foreground/60 mb-4 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-2xl font-black text-foreground">Rp {product.price.toLocaleString()}</span>
                <button
                  onClick={() => { setSelectedProduct(product); setIsCheckoutOpen(true); }}
                  disabled={product.stock <= 0}
                  className="bg-accent text-white px-6 py-2 rounded-xl font-bold hover:bg-accent/90 transition-colors disabled:bg-foreground/20"
                >
                  Beli
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-card border border-sidebar-border w-full max-w-md rounded-3xl shadow-2xl overflow-hidden scale-in-center animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-sidebar-border flex justify-between items-center bg-foreground/5">
              <h2 className="text-xl font-bold">One-Click Checkout</h2>
              <button onClick={() => setIsCheckoutOpen(false)} className="text-foreground/40 hover:text-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <form onSubmit={handleCheckout} className="p-8 space-y-4">
              <div className="bg-accent/5 p-4 rounded-2xl border border-accent/10 mb-4">
                <p className="text-xs font-bold text-accent uppercase mb-1">Produk Dipesan</p>
                <p className="font-bold">{selectedProduct.name}</p>
                <p className="text-lg font-black mt-1">Rp {selectedProduct.price.toLocaleString()}</p>
              </div>

              <div>
                <label className="text-xs font-bold text-foreground/50 uppercase">Nama Lengkap</label>
                <input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-foreground/5 border border-sidebar-border rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-accent/50 outline-none"
                  placeholder="Contoh: Budi Santoso"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-foreground/50 uppercase">Nomor WhatsApp</label>
                <input
                  required
                  type="tel"
                  value={formData.wa}
                  onChange={(e) => setFormData({ ...formData, wa: e.target.value })}
                  className="w-full bg-foreground/5 border border-sidebar-border rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-accent/50 outline-none"
                  placeholder="0812..."
                />
              </div>
              <div>
                <label className="text-xs font-bold text-foreground/50 uppercase">Lokasi Pengantaran</label>
                <textarea
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-foreground/5 border border-sidebar-border rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-accent/50 outline-none resize-none"
                  rows={3}
                  placeholder="Alamat lengkap pengiriman..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-all mt-4 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                    <span>Konfirmasi Pesanan</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
