import Link from "next/link";

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

const steps = [
  {
    num: "01",
    title: "Hubungkan WhatsApp",
    description: "Scan QR Code atau gunakan Pairing Code untuk menautkan akun WhatsApp Anda dalam hitungan detik.",
  },
  {
    num: "02",
    title: "Buat Konten dengan AI",
    description: "Manfaatkan AI untuk menghasilkan pesan promosi, caption, dan strategi marketing yang menarik.",
  },
  {
    num: "03",
    title: "Kirim & Pantau Otomatis",
    description: "Jadwalkan pengiriman broadcast, pantau statistik, dan kelola bisnis Anda dari satu dashboard.",
  },
];

const stats = [
  { value: "10x", label: "Jangkauan Lebih Luas", description: "dibanding metode manual" },
  { value: "80%", label: "Hemat Waktu", description: "dengan otomasi broadcast" },
  { value: "24/7", label: "Otomatis Berjalan", description: "tanpa perlu diawasi" },
  { value: "∞", label: "Tanpa Batas", description: "jumlah pesan & kontak" },
];

const testimonials = [
  {
    name: "Ahmad Fauzi",
    role: "Owner Toko Online",
    text: "Sejak pakai MaveCode AI, penjualan saya naik 3x lipat. Broadcast WA otomatis benar-benar menghemat waktu saya!",
    avatar: "AF",
  },
  {
    name: "Sari Dewi",
    role: "Digital Marketer",
    text: "Fitur AI untuk generate konten marketing itu game-changer. Saya bisa bikin caption dan strategi dalam hitungan detik.",
    avatar: "SD",
  },
  {
    name: "Budi Santoso",
    role: "UMKM Kuliner",
    text: "Dashboard-nya sangat lengkap. Inventori, keuangan, dan broadcast semua jadi satu. Praktis banget!",
    avatar: "BS",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ─── NAVBAR ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/></svg>
            </div>
            <span className="text-lg font-bold gradient-text">MaveCode AI</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Fitur</a>
            <a href="#cara-kerja" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Cara Kerja</a>
            <a href="#manfaat" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Manfaat</a>
            <a href="#testimonials" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Testimoni</a>
          </div>
          <Link
            href="/broadcast-automation"
            className="px-5 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:scale-105"
          >
            Masuk Dashboard
          </Link>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center landing-hero-bg landing-grid pt-16">
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl animate-float delay-300" />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in-up opacity-0">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-medium text-foreground/70">Platform Marketing AI #1 di Indonesia</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-fade-in-up opacity-0 delay-100">
            Otomasi Marketing
            <br />
            <span className="gradient-text">Berbasis AI</span>
          </h1>

          <p className="text-lg md:text-xl text-foreground/50 max-w-2xl mx-auto mt-8 leading-relaxed animate-fade-in-up opacity-0 delay-200">
            Kelola bisnis Anda dengan platform terlengkap — WhatsApp Broadcast otomatis, 
            konten AI, inventori, keuangan, dan analitik — semua dalam satu dashboard.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-fade-in-up opacity-0 delay-300">
            <Link
              href="/broadcast-automation"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <span>Mulai Sekarang</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
            <a
              href="#features"
              className="px-8 py-4 rounded-2xl border border-foreground/10 text-foreground/70 font-semibold text-lg hover:bg-foreground/5 hover:border-foreground/20 transition-all duration-300"
            >
              Pelajari Lebih Lanjut
            </a>
          </div>

          {/* Mini feature badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-16 animate-fade-in-up opacity-0 delay-500">
            {["WhatsApp Broadcast", "AI Content", "Inventory", "Finance", "Orders"].map((f) => (
              <span key={f} className="px-4 py-1.5 rounded-full text-xs font-medium glass text-foreground/60">
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Fitur Lengkap</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Semua yang Anda butuhkan,
              <br />
              <span className="gradient-text">dalam satu platform.</span>
            </h2>
            <p className="text-foreground/50 max-w-xl mx-auto mt-6 text-lg">
              Dari broadcast WhatsApp hingga laporan keuangan — kami menyediakan 
              semua tools yang bisnis modern butuhkan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="glass-card rounded-3xl p-8 group cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-foreground/50 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CARA KERJA ─── */}
      <section id="cara-kerja" className="py-32 relative">
        <div className="absolute inset-0 landing-hero-bg opacity-50" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Cara Kerja</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Mulai dalam
              <span className="gradient-text"> 3 langkah mudah</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[calc(100%_-_16px)] w-[calc(100%_-_40px)] h-px bg-gradient-to-r from-accent/40 to-transparent" />
                )}
                <div className="glass-card rounded-3xl p-8 text-center">
                  <div className="text-5xl font-black gradient-text mb-6">{step.num}</div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-foreground/50 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS / MANFAAT ─── */}
      <section id="manfaat" className="py-32 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Manfaat</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Angka yang
              <span className="gradient-text"> berbicara</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="glass-card rounded-3xl p-8 text-center group">
                <div className="text-5xl md:text-6xl font-black gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <p className="text-sm font-bold text-foreground/80 mb-1">{stat.label}</p>
                <p className="text-xs text-foreground/40">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section id="testimonials" className="py-32 relative">
        <div className="absolute inset-0 landing-hero-bg opacity-30" />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Testimoni</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Dipercaya oleh
              <span className="gradient-text"> pebisnis Indonesia</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="glass-card rounded-3xl p-8">
                <div className="flex items-center space-x-1 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  ))}
                </div>
                <p className="text-foreground/70 leading-relaxed mb-8 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{t.name}</p>
                    <p className="text-xs text-foreground/50">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-32 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="glass-card rounded-[2rem] p-12 md:p-16 glow relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Siap tingkatkan
                <br />
                <span className="gradient-text">bisnis Anda?</span>
              </h2>
              <p className="text-foreground/50 text-lg max-w-lg mx-auto mb-10">
                Bergabunglah dengan ratusan pebisnis Indonesia yang sudah menggunakan MaveCode AI 
                untuk mengotomasi marketing mereka.
              </p>
              <Link
                href="/broadcast-automation"
                className="inline-flex items-center space-x-2 px-10 py-5 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300"
              >
                <span>Masuk ke Dashboard</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-foreground/5 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/></svg>
              </div>
              <span className="text-sm font-bold gradient-text">MaveCode AI</span>
            </div>
            <p className="text-xs text-foreground/40">
              &copy; {new Date().getFullYear()} MaveCode AI. All rights reserved. Built with ❤️ by MAVERICK.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-foreground/40 hover:text-foreground transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="text-foreground/40 hover:text-foreground transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="text-foreground/40 hover:text-foreground transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
