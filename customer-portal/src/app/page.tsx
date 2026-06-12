import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-6 relative">
      {/* Decorative Elements */}
      <div className="absolute top-20 -left-20 w-64 h-64 bg-accent/20 blur-[120px] rounded-full -z-10 animate-pulse-slow" />
      <div className="absolute top-40 -right-20 w-64 h-64 bg-accent-secondary/20 blur-[120px] rounded-full -z-10 animate-pulse-slow" />

      {/* Hero Section */}
      <section className="pt-32 pb-20 text-center">
        <div className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
          <span className="text-white/60">AI-Powered Social Commerce</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          Ubah Belanja <br />
          <span className="bg-gradient-to-r from-accent via-accent-secondary to-accent-tertiary bg-clip-text text-transparent italic">
            Jadi Kebaikan
          </span>
        </h1>
        
        <p className="text-xl text-white/40 max-w-xl mx-auto mb-12 font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          Platform belanja cerdas di mana setiap transaksi mendukung misi sosial global. Didukung oleh AI untuk rekomendasi yang dipersonalisasi.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
          <Link href="/shop" className="group relative bg-white text-black px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 group-hover:text-white transition-colors">Jelajahi Produk</span>
          </Link>
          <Link href="/track" className="glass px-10 py-5 rounded-2xl font-black text-xl hover:bg-white/5 transition-all active:scale-95 text-white/80">
            Lacak Pesanan
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
        {[
          { label: "Donasi Terkumpul", value: "Rp 1.2M+" },
          { label: "Komunitas Dibantu", value: "850+" },
          { label: "Produk Kurasi", value: "12k+" },
          { label: "Pengguna Aktif", value: "45k+" },
        ].map((s, i) => (
          <div key={i} className="glass p-6 rounded-3xl text-center">
            <div className="text-2xl font-black mb-1 bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent">{s.value}</div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-white/30">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Features Grid */}
      <section className="py-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: "⚡", title: "Instant Impact", desc: "Setiap sen dari profit kami dialokasikan langsung ke mitra sosial terverifikasi." },
          { icon: "🧠", title: "AI Personalized", desc: "Dapatkan rekomendasi produk yang sesuai dengan gaya hidup dan nilai sosial Anda." },
          { icon: "🛡️", title: "Transparent Trace", desc: "Pantau penggunaan dana hasil belanja Anda melalui dashboard transparansi real-time." },
        ].map((f, i) => (
          <div key={i} className="glass p-10 rounded-[40px] hover:border-accent/50 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl -z-10 group-hover:bg-accent/20 transition-colors" />
            <div className="text-5xl mb-6 group-hover:animate-float inline-block">{f.icon}</div>
            <h3 className="text-2xl font-black mb-4">{f.title}</h3>
            <p className="text-white/40 font-medium leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="relative group p-1 bg-gradient-to-br from-accent via-accent-secondary to-accent-tertiary rounded-[40px] shadow-2xl shadow-accent/20">
          <div className="bg-black rounded-[38px] p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-accent/10 blur-[100px] rounded-full" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent-secondary/10 blur-[100px] rounded-full" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">Bicara dengan <br /><span className="text-accent">OpenClaw AI</span></h2>
              <p className="text-white/40 mb-10 max-w-md mx-auto font-medium text-lg italic">"Hai! Aku OpenClaw. Mau tahu produk mana yang paling berdampak bulan ini?"</p>
              <Link href="/assistant" className="group relative inline-flex items-center space-x-3 bg-accent text-white px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-accent/40 overflow-hidden">
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 group-hover:text-black transition-colors">Chat Sekarang</span>
                <svg className="relative z-10 w-6 h-6 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
