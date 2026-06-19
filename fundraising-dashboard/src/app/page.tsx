"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
    ),
    title: "WhatsApp Broadcast",
    description: "Kirim pesan promosi ke ribuan kontak & grup WhatsApp secara otomatis dan terjadwal.",
    color: "from-green-400 to-emerald-600",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
    ),
    title: "Marketing AI",
    description: "Generate konten pemasaran, caption sosmed, dan strategi marketing menggunakan AI canggih.",
    color: "from-purple-400 to-violet-600",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
    ),
    title: "Manajemen Inventori",
    description: "Kelola stok produk, scan barcode, dan pantau pergerakan barang secara real-time.",
    color: "from-orange-400 to-amber-600",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
    ),
    title: "Laporan Keuangan",
    description: "Pantau pemasukan, pengeluaran, dan profit bisnis Anda dengan dashboard visual yang intuitif.",
    color: "from-blue-400 to-cyan-600",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
    ),
    title: "Katalog Produk",
    description: "Buat katalog digital profesional yang bisa langsung dibagikan ke pelanggan Anda.",
    color: "from-pink-400 to-rose-600",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m20.9 18.5-4.5-9a2 2 0 0 0-3.5 0l-4.5 9a2 2 0 0 0 1.8 2.8h9a2 2 0 0 0 1.7-2.8Z"/><path d="M4.5 15.5h4"/><path d="M4.5 12.5h2.6"/><path d="M4.5 9.5h1.2"/></svg>
    ),
    title: "Manajemen Pesanan",
    description: "Kelola pesanan masuk, status pengiriman, dan riwayat transaksi dalam satu tempat.",
    color: "from-teal-400 to-emerald-600",
  },
];

const staggerContainer: any = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 10 } }
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-accent/30 font-sans">
      
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div 
          animate={{ 
            y: [0, -30, 0], 
            scale: [1, 1.05, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            y: [0, 40, 0], 
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.2, 0.15]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px]" 
        />
      </div>

      {/* Navbar */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 w-full border-b border-white/5 bg-background/50 backdrop-blur-xl z-50"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">MaveCode AI</span>
          </div>
          
          <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-400">
            <a href="#fitur" className="hover:text-white transition-colors hover:scale-105 transform">Fitur</a>
            <a href="#cara-kerja" className="hover:text-white transition-colors hover:scale-105 transform">Cara Kerja</a>
            <a href="#manfaat" className="hover:text-white transition-colors hover:scale-105 transform">Manfaat</a>
            <a href="#testimoni" className="hover:text-white transition-colors hover:scale-105 transform">Testimoni</a>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-100 transition-colors"
              >
                Masuk Dashboard
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-sm font-medium text-gray-300">Platform Marketing AI #1 di Indonesia</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight"
            >
              Otomasi <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Marketing</span> <br className="hidden md:block"/> Berbasis AI.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Satu platform terintegrasi untuk WhatsApp Broadcast, pembuatan konten AI, manajemen inventori, dan laporan keuangan bisnis Anda.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/dashboard">
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59,130,246,0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition-all w-full sm:w-auto"
                >
                  Mulai Gratis Sekarang
                </motion.button>
              </Link>
              <Link href="#fitur">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 font-semibold text-lg transition-all w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  Pelajari Fitur
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Dashboard Preview / Mockup */}
        <section className="px-6 relative z-10 pb-20">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, type: "spring", stiffness: 40 }}
            className="max-w-6xl mx-auto rounded-2xl border border-white/10 bg-black/40 p-2 backdrop-blur-2xl shadow-2xl overflow-hidden"
          >
            <div className="rounded-xl border border-white/5 bg-sidebar aspect-[16/9] md:aspect-[21/9] flex flex-col overflow-hidden relative">
              <div className="h-12 border-b border-white/5 flex items-center px-4 space-x-2 bg-black/20">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-500/5 to-purple-500/5 relative">
                {/* Floating Chat Bubble Mockup */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/4 left-1/4 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-lg"
                >
                  <p className="text-xs text-green-400 mb-1">WhatsApp Sent ✓✓</p>
                  <p className="text-sm font-medium text-white">Promo 50% berhasil dikirim ke 1,200 kontak!</p>
                </motion.div>
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="url(#gradient)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto opacity-50 mb-4"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                  <p className="text-gray-500 font-medium tracking-widest uppercase text-sm">Dashboard Preview</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="fitur" className="py-24 px-6 bg-white/5 border-t border-white/5 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Fitur Lengkap untuk Skala Besar</h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">Semua alat bantu (tools) yang Anda butuhkan untuk meningkatkan omset dan menghemat waktu operasional.</p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {features.map((feature, idx) => (
                <motion.div 
                  variants={fadeUp}
                  whileHover={{ y: -5, scale: 1.02 }}
                  key={idx} 
                  className="p-8 rounded-2xl bg-black/40 border border-white/5 hover:border-white/20 transition-all group backdrop-blur-sm"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Workflow Section */}
        <section id="cara-kerja" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Berjalan Otomatis di Belakang Layar</h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  Tidak perlu lagi membalas pesan secara manual. Sistem kami dirancang untuk mengambil alih tugas monoton Anda.
                </p>
                <div className="space-y-6">
                  {[
                    { title: "Hubungkan WhatsApp", desc: "Scan kode QR atau gunakan kode tautan untuk menyambungkan nomor bisnis Anda dalam detik." },
                    { title: "Buat Konten dengan AI", desc: "Tulis prompt singkat, AI kami akan menghasilkan kalimat promosi yang memikat hati pelanggan." },
                    { title: "Kirim & Lacak", desc: "Sistem otomatis mengirim pesan ke ribuan kontak. Anda tinggal melihat laporan keberhasilan di dashboard." }
                  ].map((step, idx) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.2 }}
                      key={idx} 
                      className="flex gap-4"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold border border-blue-500/30">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white mb-1">{step.title}</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-3xl blur-[80px] opacity-20"></div>
                <div className="relative rounded-3xl border border-white/10 bg-black/60 p-8 backdrop-blur-md shadow-2xl">
                  {/* Mock Workflow UI */}
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      </div>
                      <div className="flex-1">
                        <div className="h-2 w-24 bg-gray-600 rounded mb-2"></div>
                        <div className="h-2 w-48 bg-gray-700 rounded"></div>
                      </div>
                      <div className="text-green-400 text-xs font-bold px-2 py-1 bg-green-400/10 rounded">Connected</div>
                    </div>
                    
                    <div className="flex justify-center my-2">
                      <div className="h-8 w-px bg-white/20"></div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                      </div>
                      <div className="flex-1">
                        <div className="h-2 w-32 bg-gray-600 rounded mb-2"></div>
                        <div className="h-2 w-full bg-gray-700 rounded mb-2"></div>
                        <div className="h-2 w-2/3 bg-gray-700 rounded"></div>
                      </div>
                    </div>

                    <div className="flex justify-center my-2">
                      <div className="h-8 w-px bg-white/20"></div>
                    </div>

                    <motion.div 
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="p-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg flex items-center gap-4 border border-white/20"
                    >
                      <div className="w-12 h-12 rounded-lg bg-white/20 text-white flex items-center justify-center backdrop-blur-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-bold text-sm mb-1">Broadcasting...</div>
                        <div className="w-full bg-black/30 rounded-full h-1.5 overflow-hidden">
                          <motion.div 
                            animate={{ width: ["0%", "100%"] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="bg-white h-1.5 rounded-full"
                          ></motion.div>
                        </div>
                      </div>
                      <div className="text-white text-xs font-bold">1.2k/5k</div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-600/10 border-y border-blue-500/20"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none"></div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center relative z-10"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Siap meroketkan omset Anda?</h2>
            <p className="text-xl text-blue-200 mb-10 max-w-2xl mx-auto">Bergabunglah dengan ribuan pelaku bisnis yang telah mengotomatiskan marketing mereka bersama MaveCode AI.</p>
            <Link href="/dashboard">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 rounded-full bg-white text-blue-600 hover:bg-gray-100 font-bold text-lg shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all"
              >
                Mulai Dashboard Anda Sekarang
              </motion.button>
            </Link>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-12 px-6 text-center text-gray-500 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-purple-600"></div>
            <span className="font-bold text-white">MaveCode AI</span>
          </div>
          <p>© {new Date().getFullYear()} MaveCode AI Automation. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
