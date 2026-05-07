"use client";

import { useState, useRef } from "react";

interface ProductData {
  nama_produk: string;
  kategori: string;
  perkiraan_harga_jual: string | number;
  deskripsi_singkat: string;
}

export default function InventoryPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<ProductData | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleScanClick = () => {
    setIsModalOpen(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Scan
    setIsScanning(true);
    setScannedData(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/scan-product", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setScannedData(data);
    } catch (error) {
      alert("Failed to scan: " + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setIsScanning(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!scannedData) return;
    setScannedData({
      ...scannedData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    alert("Data saved to database! (Mock)");
    setScannedData(null);
    setPreviewImage(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
          <p className="text-foreground/50">Manage your fundraising resources and assets.</p>
        </div>
        <div className="flex space-x-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={handleScanClick}
            disabled={isScanning}
            className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-accent/20 ${
              isScanning ? "bg-accent/50 cursor-not-allowed" : "bg-accent hover:bg-accent/90 text-white hover:scale-105 active:scale-95"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
            <span>{isScanning ? "Scanning..." : "Scan Product"}</span>
          </button>
        </div>
      </div>

      {/* Explicit Scan Modal */}
      {isModalOpen && !previewImage && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-card border border-sidebar-border w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
              </div>
              <h2 className="text-xl font-bold mb-2">Unggah Foto Produk</h2>
              <p className="text-sm text-foreground/50 mb-6">Ambil foto atau pilih gambar dari galeri untuk dianalisis AI.</p>
              
              <div className="space-y-3">
                <button 
                  onClick={() => { fileInputRef.current?.click(); setIsModalOpen(false); }}
                  className="w-full bg-accent text-white py-3 rounded-xl font-bold hover:bg-accent/90 transition-all"
                >
                  Pilih dari Galeri
                </button>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-full bg-foreground/5 text-foreground py-3 rounded-xl font-bold hover:bg-foreground/10 transition-all"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scanned Result Form */}
      {previewImage && (
        <div className="bg-card border border-sidebar-border rounded-2xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 bg-foreground/5 flex items-center justify-center border-b md:border-b-0 md:border-r border-sidebar-border">
              <img src={previewImage} alt="Product Preview" className="max-h-80 rounded-xl shadow-md object-contain" />
            </div>
            <div className="p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Scanned Details</h3>
                <span className={`px-2 py-1 text-[10px] uppercase font-bold rounded ${isScanning ? "bg-yellow-500/20 text-yellow-500" : "bg-green-500/20 text-green-500"}`}>
                  {isScanning ? "AI Processing..." : "AI Analyzed"}
                </span>
              </div>

              {scannedData ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-foreground/50 uppercase">Product Name</label>
                    <input
                      name="nama_produk"
                      value={scannedData.nama_produk}
                      onChange={handleInputChange}
                      className="w-full bg-foreground/5 border border-sidebar-border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-accent/50"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-foreground/50 uppercase">Category</label>
                      <input
                        name="kategori"
                        value={scannedData.kategori}
                        onChange={handleInputChange}
                        className="w-full bg-foreground/5 border border-sidebar-border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-accent/50"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-foreground/50 uppercase">Estimated Price</label>
                      <input
                        name="perkiraan_harga_jual"
                        value={scannedData.perkiraan_harga_jual}
                        onChange={handleInputChange}
                        className="w-full bg-foreground/5 border border-sidebar-border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-accent/50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-foreground/50 uppercase">Description</label>
                    <textarea
                      name="deskripsi_singkat"
                      value={scannedData.deskripsi_singkat}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full bg-foreground/5 border border-sidebar-border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
                    />
                  </div>
                  <div className="flex space-x-3 pt-4">
                    <button onClick={handleSave} className="flex-1 bg-accent text-white py-3 rounded-xl font-bold hover:bg-accent/90 transition-colors">
                      Save to Inventory
                    </button>
                    <button onClick={() => { setPreviewImage(null); setScannedData(null); }} className="px-6 py-3 border border-sidebar-border rounded-xl font-bold hover:bg-foreground/5 transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : isScanning ? (
                <div className="space-y-4 animate-pulse">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-12 bg-foreground/5 rounded-lg" />
                  ))}
                </div>
              ) : (
                <p className="text-foreground/50">Upload an image to start scanning.</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Placeholder cards */}
        <div className="bg-card border border-sidebar-border p-6 rounded-2xl shadow-sm">
          <div className="w-10 h-10 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.27 6.96 8.73 5.04 8.73-5.04"/><path d="M12 22.08V12"/></svg>
          </div>
          <h3 className="text-lg font-semibold">Physical Assets</h3>
          <p className="text-2xl font-bold mt-2">128</p>
          <p className="text-xs text-green-500 mt-1">↑ 12% from last month</p>
        </div>

        <div className="bg-card border border-sidebar-border p-6 rounded-2xl shadow-sm">
          <div className="w-10 h-10 bg-purple-500/10 text-purple-500 rounded-lg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
          </div>
          <h3 className="text-lg font-semibold">Educational Kits</h3>
          <p className="text-2xl font-bold mt-2">45</p>
          <p className="text-xs text-foreground/50 mt-1">Stable</p>
        </div>

        <div className="bg-card border border-sidebar-border p-6 rounded-2xl shadow-sm">
          <div className="w-10 h-10 bg-orange-500/10 text-orange-500 rounded-lg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="m4.93 4.93 14.14 14.14"/><path d="M2 12h20"/><path d="m19.07 4.93-14.14 14.14"/></svg>
          </div>
          <h3 className="text-lg font-semibold">Medical Supplies</h3>
          <p className="text-2xl font-bold mt-2">312</p>
          <p className="text-xs text-red-500 mt-1">↓ 5% (Low Stock)</p>
        </div>
      </div>

      <div className="bg-card border border-sidebar-border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-sidebar-border flex justify-between items-center">
          <h3 className="font-semibold">Recent Inventory Updates</h3>
          <button className="text-sm text-accent font-medium">View All</button>
        </div>
        <div className="p-20 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-foreground/5 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/20"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <p className="text-foreground/50">No inventory items found. Click 'Add New Item' to get started.</p>
        </div>
      </div>
    </div>
  );
}
