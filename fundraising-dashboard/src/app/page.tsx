"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Instagram, Linkedin, Twitter, ArrowRight, CheckCircle2 } from "lucide-react";
import { useRef } from "react";

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
    ),
    title: "WhatsApp Broadcast",
    description: "Kirim pesan promosi ke ribuan kontak & grup WhatsApp secara otomatis dan terjadwal.",
    color: "from-green-400 to-emerald-600",
    shadow: "shadow-green-500/20"
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
    ),
    title: "Marketing AI",
    description: "Generate konten pemasaran, caption sosmed, dan strategi marketing menggunakan AI canggih.",
    color: "from-purple-400 to-violet-600",
    shadow: "shadow-purple-500/20"
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
    ),
    title: "Manajemen Inventori",
    description: "Kelola stok produk, scan barcode, dan pantau pergerakan barang secara real-time.",
    color: "from-orange-400 to-amber-600",
    shadow: "shadow-orange-500/20"
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
    ),
    title: "Laporan Keuangan",
    description: "Pantau pemasukan, pengeluaran, dan profit bisnis Anda dengan dashboard visual yang intuitif.",
    color: "from-blue-400 to-cyan-600",
    shadow: "shadow-blue-500/20"
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
    ),
    title: "Katalog Produk",
    description: "Buat katalog digital profesional yang bisa langsung dibagikan ke pelanggan Anda.",
    color: "from-pink-400 to-rose-600",
    shadow: "shadow-pink-500/20"
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m20.9 18.5-4.5-9a2 2 0 0 0-3.5 0l-4.5 9a2 2 0 0 0 1.8 2.8h9a2 2 0 0 0 1.7-2.8Z"/><path d="M4.5 15.5h4"/><path d="M4.5 12.5h2.6"/><path d="M4.5 9.5h1.2"/></svg>
    ),
    title: "Manajemen Pesanan",
    description: "Kelola pesanan masuk, status pengiriman, dan riwayat transaksi dalam satu tempat.",
    color: "from-teal-400 to-emerald-600",
    shadow: "shadow-teal-500/20"
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
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  return (
    <div className="min-h-screen bg-[#0A0A10] text-foreground overflow-hidden selection:bg-cyan-500/30 font-sans relative">
      
      {/* --- Premium Background Elements --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        
        {/* Animated Orbs */}
        <motion.div 
          animate={{ 
            y: [0, -50, 0], 
            x: [0, 30, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[150px]" 
        />
        <motion.div 
          animate={{ 
            y: [0, 50, 0], 
            x: [0, -40, 0],
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-600/10 blur-[150px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-purple-600/10 blur-[150px]" 
        />
      </div>

      {/* --- Navbar --- */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 w-full border-b border-white/5 bg-[#0A0A10]/70 backdrop-blur-xl z-50"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent tracking-tight">MaveCode AI</span>
          </div>
          
          <div className="hidden md:flex space-x-10 text-sm font-medium text-gray-400">
            {["Fitur", "Cara Kerja", "Manfaat", "Testimoni"].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} className="hover:text-cyan-400 transition-colors hover:-translate-y-0.5 transform">
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-cyan-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                Masuk Dashboard
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.nav>

      <main>
        {/* --- Hero Section --- */}
        <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8 backdrop-blur-md"
            >
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="text-sm font-medium text-cyan-300">Platform Marketing AI #1 di Indonesia</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1]"
            >
              Otomasi <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">Marketing</span> <br className="hidden md:block"/> Berbasis AI.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
            >
              Satu platform revolusioner untuk WhatsApp Broadcast, AI Generator, Manajemen Inventori, dan Laporan Bisnis cerdas.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/dashboard">
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6,182,212,0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg transition-all w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  Mulai Gratis Sekarang <ArrowRight size={20} />
                </motion.button>
              </Link>
              <Link href="#fitur">
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-full bg-white/5 backdrop-blur-md text-white border border-white/10 font-semibold text-lg transition-all w-full sm:w-auto"
                >
                  Pelajari Fitur
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* --- Dashboard Preview Mockup --- */}
        <section className="px-6 relative z-10 pb-32">
          <motion.div 
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, type: "spring", stiffness: 40 }}
            className="max-w-6xl mx-auto rounded-3xl border border-white/10 bg-black/40 p-2 backdrop-blur-2xl shadow-[0_0_80px_rgba(6,182,212,0.15)] overflow-hidden"
          >
            <div className="rounded-2xl border border-white/5 bg-[#0D0D15] aspect-[16/9] md:aspect-[21/9] flex flex-col overflow-hidden relative">
              <div className="h-12 border-b border-white/5 flex items-center px-4 space-x-2 bg-black/40 backdrop-blur-md">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="flex-1 flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-black/50 relative overflow-hidden">
                {/* Floating Chat Bubble Mockup */}
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-[20%] left-[20%] bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="text-emerald-400" size={16} />
                    <p className="text-xs text-emerald-400 font-medium tracking-wide uppercase">WhatsApp Sent</p>
                  </div>
                  <p className="text-sm font-medium text-white/90">Promo 50% berhasil dikirim ke 1,200 kontak!</p>
                </motion.div>
                
                <motion.div 
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-[20%] right-[20%] bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  </div>
                  <div>
                    <p className="text-xs text-purple-400 font-medium tracking-wide uppercase">Revenue Update</p>
                    <p className="text-sm font-medium text-white/90">+Rp 15.400.000 hari ini</p>
                  </div>
                </motion.div>

                <div className="text-center">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="mx-auto w-24 h-24 mb-6 rounded-full border border-dashed border-cyan-500/30 flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="url(#gradient)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-80"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  </motion.div>
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                  <p className="text-gray-400 font-semibold tracking-[0.2em] uppercase text-sm">Dashboard Interface</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* --- Features Section --- */}
        <section id="fitur" className="py-32 px-6 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Senjata Lengkap Skala Besar</h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-xl font-light">Eksplorasi ekosistem tools marketing canggih yang didesain untuk mempercepat pertumbuhan bisnis Anda.</p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {features.map((feature, idx) => (
                <motion.div 
                  variants={fadeUp}
                  whileHover={{ y: -8, scale: 1.02 }}
                  key={idx} 
                  className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 group backdrop-blur-xl relative overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-10 blur-3xl rounded-full group-hover:opacity-20 transition-opacity`}></div>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-8 shadow-lg ${feature.shadow}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed font-light">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* --- Workflow Section --- */}
        <section id="cara-kerja" className="py-32 px-6 bg-black/40 border-y border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
          <div className="max-w-7xl mx-auto relative z-10" ref={targetRef}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div
                style={{ opacity, scale }}
              >
                <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">Berjalan Otomatis di Belakang Layar</h2>
                <p className="text-gray-400 text-xl mb-12 font-light leading-relaxed">
                  Lupakan cara manual. Bangun alur kerja yang mengurus interaksi pelanggan saat Anda sedang tidur.
                </p>
                <div className="space-y-8">
                  {[
                    { title: "Hubungkan Ekosistem", desc: "Integrasi mulus dengan WhatsApp, Google Workspace, dan Toko Online Anda dalam hitungan detik." },
                    { title: "Kendalikan dengan AI", desc: "AI MaveCode akan merangkai kata, mengatur jadwal, dan menentukan target pasar secara cerdas." },
                    { title: "Panen Hasilnya", desc: "Duduk manis dan pantau grafik pendapatan Anda meroket secara real-time di Dasbor." }
                  ].map((step, idx) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.2 }}
                      key={idx} 
                      className="flex gap-6 group"
                    >
                      <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white/5 text-cyan-400 flex items-center justify-center font-bold text-xl border border-white/10 group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10 transition-all shadow-[0_0_15px_rgba(0,0,0,0)] group-hover:shadow-cyan-500/20">
                        0{idx + 1}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                        <p className="text-gray-400 leading-relaxed font-light">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, type: "spring" }}
                className="relative perspective-1000"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-3xl blur-[100px] opacity-20"></div>
                <div className="relative rounded-3xl border border-white/10 bg-[#0A0A10]/80 p-8 backdrop-blur-xl shadow-2xl">
                  {/* Mock Workflow UI */}
                  <div className="space-y-5">
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-5 hover:bg-white/10 transition-colors">
                      <div className="w-14 h-14 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-semibold mb-1">WhatsApp API</div>
                        <div className="h-2 w-48 bg-white/10 rounded-full"></div>
                      </div>
                      <div className="text-emerald-400 text-xs font-bold px-3 py-1.5 bg-emerald-400/10 rounded-lg border border-emerald-500/20">Connected</div>
                    </div>
                    
                    <div className="flex justify-center my-2">
                      <div className="h-10 w-px bg-gradient-to-b from-white/20 to-transparent"></div>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-5 hover:bg-white/10 transition-colors">
                      <div className="w-14 h-14 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-semibold mb-1">AI Copywriter</div>
                        <div className="h-2 w-full bg-white/10 rounded-full mb-2"></div>
                        <div className="h-2 w-2/3 bg-white/10 rounded-full"></div>
                      </div>
                    </div>

                    <div className="flex justify-center my-2">
                      <div className="h-10 w-px bg-gradient-to-b from-white/20 to-transparent"></div>
                    </div>

                    <motion.div 
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="p-5 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 shadow-[0_0_30px_rgba(6,182,212,0.3)] flex items-center gap-5 border border-white/20 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                      <div className="w-14 h-14 rounded-xl bg-white/20 text-white flex items-center justify-center backdrop-blur-md relative z-10">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                      </div>
                      <div className="flex-1 relative z-10">
                        <div className="text-white font-bold mb-2">Executing Campaign...</div>
                        <div className="w-full bg-black/40 rounded-full h-2 overflow-hidden backdrop-blur-sm">
                          <motion.div 
                            animate={{ width: ["0%", "100%"] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="bg-white h-full rounded-full"
                          ></motion.div>
                        </div>
                      </div>
                      <div className="text-white text-sm font-bold bg-black/20 px-3 py-1.5 rounded-lg relative z-10">1.2k/5k</div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- CTA Section --- */}
        <section className="py-32 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/20 to-transparent"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] bg-cyan-500/20 blur-[150px] rounded-full pointer-events-none"></div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center relative z-10 bg-white/5 border border-white/10 p-16 rounded-[3rem] backdrop-blur-xl shadow-2xl"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">Siap meroketkan omset?</h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Bergabunglah dengan para inovator dan automasi alur kerja Anda sekarang. Kurangi biaya operasional, tingkatkan profitabilitas.
            </p>
            <Link href="/dashboard">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 rounded-full bg-white text-black hover:bg-cyan-50 font-bold text-xl shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-3 mx-auto"
              >
                Buka Dasbor Saya <ArrowRight size={24} />
              </motion.button>
            </Link>
          </motion.div>
        </section>
      </main>

      {/* --- Massive Footer --- */}
      <footer className="border-t border-white/10 pt-24 pb-12 px-6 bg-black/60 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">MaveCode AI</span>
              </div>
              <p className="text-gray-400 text-lg mb-8 max-w-md font-light leading-relaxed">
                Platform automasi bisnis end-to-end yang menggabungkan kekuatan AI dengan ekosistem digital untuk memangkas waktu kerja Anda hingga 80%.
              </p>
              
              {/* Newsletter */}
              <div className="space-y-3">
                <h4 className="text-white font-semibold">Berlangganan Newsletter Kami</h4>
                <div className="flex gap-2 max-w-md">
                  <input 
                    type="email" 
                    placeholder="nama@email.com" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                  <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl font-medium transition-colors">
                    Daftar
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-6">Platform</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><ArrowRight size={14}/> WhatsApp API</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><ArrowRight size={14}/> Google Workspace</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><ArrowRight size={14}/> AI Generator</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><ArrowRight size={14}/> Inventori & Keuangan</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-6">Hubungi Kami</h4>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <a href="mailto:hello@mavecode.ai" className="hover:text-white transition-colors flex items-center gap-3">
                    <Mail size={18} className="text-cyan-400"/> hello@mavecode.ai
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors flex items-center gap-3">
                    <Instagram size={18} className="text-pink-400"/> @mavecode.ai
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors flex items-center gap-3">
                    <Linkedin size={18} className="text-blue-400"/> MaveCode Automation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors flex items-center gap-3">
                    <Twitter size={18} className="text-sky-400"/> @MaveCodeAI
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} MaveCode AI Automation. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
              <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
              <a href="#" className="hover:text-white transition-colors">Pusat Bantuan</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
