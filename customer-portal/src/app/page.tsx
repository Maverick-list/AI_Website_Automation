import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span>AI-Powered Social Marketplace</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6">
          Belanja untuk <br />
          <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
            Kebaikan Sosial
          </span>
        </h1>
        <p className="text-lg text-foreground/50 max-w-xl mx-auto mb-10">
          Setiap pembelian Anda berkontribusi langsung pada komunitas yang membutuhkan. Didukung oleh AI untuk pengalaman belanja yang lebih cerdas.
        </p>
        <div className="flex items-center justify-center space-x-4">
          <Link href="/shop" className="bg-accent text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl shadow-accent/20 hover:scale-105 active:scale-95 transition-all">
            Jelajahi Katalog
          </Link>
          <Link href="/track" className="bg-foreground/5 text-foreground px-8 py-4 rounded-2xl font-bold hover:bg-foreground/10 transition-all">
            Lacak Pesanan
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: "🛒", title: "One-Click Checkout", desc: "Beli produk dalam hitungan detik dengan sistem checkout super cepat." },
          { icon: "🤖", title: "AI Shopping Assistant", desc: "Tanya apa saja tentang produk kami. AI akan menjawab secara personal." },
          { icon: "📦", title: "Live Order Tracking", desc: "Lacak status pesanan Anda secara real-time kapan saja." },
        ].map((f, i) => (
          <div key={i} className="bg-card border border-sidebar-border p-8 rounded-3xl hover:border-accent/30 transition-all group">
            <div className="text-4xl mb-4 group-hover:animate-float">{f.icon}</div>
            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
            <p className="text-sm text-foreground/50">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* CTA Banner */}
      <section className="py-16">
        <div className="bg-gradient-to-br from-accent to-accent-secondary rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-4">Punya Pertanyaan?</h2>
            <p className="text-white/80 mb-8 max-w-md mx-auto">AI Assistant kami siap membantu Anda 24/7. Tanyakan tentang produk, pengiriman, atau apa saja!</p>
            <Link href="/assistant" className="bg-white text-accent px-8 py-4 rounded-2xl font-black hover:scale-105 active:scale-95 transition-all inline-block">
              Bicara dengan AI
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
