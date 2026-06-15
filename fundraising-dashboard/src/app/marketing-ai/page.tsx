"use client";

import { useState, useEffect } from "react";

export default function MarketingAIPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [campaignOutput, setCampaignOutput] = useState<any>(null);
  const [loadingCampaign, setLoadingCampaign] = useState(false);
  
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [scheduleData, setScheduleData] = useState({ text: "", time: "", product: "" });
  const [targetId, setTargetId] = useState("120363401263735503@g.us");
  const [mediaUrl, setMediaUrl] = useState("");
  const [loadingSchedule, setLoadingSchedule] = useState(false);
  const [loadingSend, setLoadingSend] = useState(false);

  const [copyInput, setCopyInput] = useState("");
  const [copyOutput, setCopyOutput] = useState("");
  const [sentimentInput, setSentimentInput] = useState("");
  const [sentimentOutput, setSentimentOutput] = useState<any>(null);
  const [loadingCopy, setLoadingCopy] = useState(false);
  const [loadingSentiment, setLoadingSentiment] = useState(false);

  const [scrapeUrl, setScrapeUrl] = useState("");
  const [scrapeOutput, setScrapeOutput] = useState<any>(null);
  const [loadingScrape, setLoadingScrape] = useState(false);

  useEffect(() => {
    fetch("/api/inventory").then(res => res.json()).then(setProducts);
  }, []);

  const toggleProduct = (id: string) => {
    setSelectedProductIds(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const generateCampaign = async () => {
    const selectedProducts = products.filter(p => selectedProductIds.includes(p.id));
    if (selectedProducts.length === 0) return alert("Pilih minimal satu produk!");

    setLoadingCampaign(true);
    try {
      const response = await fetch("/api/ai/marketing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "generate_campaign", text: selectedProducts }),
      });
      const data = await response.json();
      setCampaignOutput(data.result);
    } catch (e) {
      alert("Gagal membuat kampanye");
    } finally {
      setLoadingCampaign(false);
    }
  };

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingSchedule(true);
    try {
      const response = await fetch("http://localhost:5000/webhook/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          target: targetId,
          text: scheduleData.text,
          message: scheduleData.text,
          time: scheduleData.time,
          product: scheduleData.product,
          media: mediaUrl || undefined
        }),
      });
      const data = await response.json();
      if (!response.ok || data.error) throw new Error(data.error || "Gagal terhubung ke Local Server");
      alert("Promosi berhasil dijadwalkan via OpenClaw Local Server!");
      setIsScheduleModalOpen(false);
    } catch (e) {
      alert("Gagal menjadwalkan: " + (e instanceof Error ? e.message : "Pastikan Local Server port 5000 menyala"));
    } finally {
      setLoadingSchedule(false);
    }
  };

  const handleSendNow = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingSend(true);
    try {
      const response = await fetch("http://localhost:5000/webhook/openclaw/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          target: targetId,
          message: scheduleData.text,
          media: mediaUrl || undefined
        }),
      });
      const data = await response.json();
      if (!response.ok || data.error) throw new Error(data.error || "Gagal menghubungi Local OpenClaw Server");
      alert("Pesan berhasil dikirim via OpenClaw!");
      setIsSendModalOpen(false);
    } catch (e) {
      alert("Gagal mengirim: " + (e instanceof Error ? e.message : "Pastikan Local Server port 5000 menyala"));
    } finally {
      setLoadingSend(false);
    }
  };

  const generateCopy = async () => {
    setLoadingCopy(true);
    try {
      const response = await fetch("/api/ai/marketing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "copywriting", text: copyInput }),
      });
      const data = await response.json();
      setCopyOutput(data.result);
    } catch (e) {
      alert("Failed to generate copy");
    } finally {
      setLoadingCopy(false);
    }
  };

  const analyzeSentiment = async () => {
    setLoadingSentiment(true);
    try {
      const response = await fetch("/api/ai/marketing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "sentiment", text: sentimentInput }),
      });
      const data = await response.json();
      setSentimentOutput(data.result);
    } catch (e) {
      alert("Failed to analyze sentiment");
    } finally {
      setLoadingSentiment(false);
    }
  };

  const analyzeCompetitor = async () => {
    setLoadingScrape(true);
    try {
      const response = await fetch("/api/ai/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: scrapeUrl }),
      });
      const data = await response.json();
      setScrapeOutput(data.result);
    } catch (e) {
      alert("Failed to analyze competitor");
    } finally {
      setLoadingScrape(false);
    }
  };

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Marketing AI</h1>
        <p className="text-foreground/50">Optimalkan kampanye fundraising Anda dengan kecerdasan buatan.</p>
      </header>

      {/* Campaign Strategy Section */}
      <div className="bg-card border border-sidebar-border rounded-3xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 text-accent rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3"/><path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5"/></svg>
            </div>
            <div>
              <h2 className="text-xl font-bold">Campaign Strategy Planner</h2>
              <p className="text-sm text-foreground/50">Pilih produk untuk dirancang strategi promosinya.</p>
            </div>
          </div>
          <button 
            onClick={generateCampaign}
            disabled={loadingCampaign || selectedProductIds.length === 0}
            className="bg-accent text-white px-8 py-3 rounded-2xl font-black hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          >
            {loadingCampaign ? "AI is Thinking..." : "Generate Strategy"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {products.map(product => (
            <div 
              key={product.id} 
              onClick={() => toggleProduct(product.id)}
              className={`cursor-pointer p-4 rounded-2xl border-2 transition-all ${
                selectedProductIds.includes(product.id) 
                ? "border-accent bg-accent/5 ring-2 ring-accent/20" 
                : "border-sidebar-border bg-foreground/[0.02] hover:border-accent/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold">{product.name}</span>
                {selectedProductIds.includes(product.id) && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><polyline points="20 6 9 17 4 12"/></svg>
                )}
              </div>
              <p className="text-xs text-foreground/50 mt-1">Rp {product.price.toLocaleString()}</p>
            </div>
          ))}
        </div>

        {campaignOutput && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
            {[
              { title: "FOMO Strategy", data: campaignOutput.fomo, color: "text-orange-500", bg: "bg-orange-500/5" },
              { title: "Storytelling", data: campaignOutput.storytelling, color: "text-purple-500", bg: "bg-purple-500/5" },
              { title: "Hard Sell", data: campaignOutput.hardsell, color: "text-blue-500", bg: "bg-blue-500/5" }
            ].map((type, i) => (
              <div key={i} className={`p-6 rounded-3xl border border-sidebar-border ${type.bg}`}>
                <h3 className={`font-black text-lg mb-4 ${type.color}`}>{type.title}</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-1">Hook</p>
                    <p className="text-sm font-bold leading-snug">{type.data.hook}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-1">Body</p>
                    <p className="text-sm text-foreground/70">{type.data.body}</p>
                  </div>
                  <div className="pt-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-1">CTA</p>
                    <div className="bg-white/50 dark:bg-black/20 border border-sidebar-border rounded-lg px-3 py-2 text-sm font-black italic">
                      {type.data.cta}
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setScheduleData({ 
                        text: `*${type.data.hook}*\n\n${type.data.body}\n\n${type.data.cta}`,
                        time: "",
                        product: products.filter(p => selectedProductIds.includes(p.id)).map(p => p.name).join(", ")
                      });
                      setIsScheduleModalOpen(true);
                    }}
                    className="w-full mt-4 bg-foreground/10 hover:bg-foreground/20 text-foreground py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                    <span>Jadwalkan Post</span>
                  </button>
                  <button 
                    onClick={() => {
                      setScheduleData({ 
                        text: `*${type.data.hook}*\n\n${type.data.body}\n\n${type.data.cta}`,
                        time: "",
                        product: products.filter(p => selectedProductIds.includes(p.id)).map(p => p.name).join(", ")
                      });
                      setIsSendModalOpen(true);
                    }}
                    className="w-full mt-2 bg-accent text-white hover:bg-accent/90 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    <span>Kirim Sekarang</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Schedule Modal */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-card border border-sidebar-border w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-sidebar-border flex justify-between items-center bg-foreground/5">
              <h2 className="text-xl font-bold">Jadwalkan Promosi</h2>
              <button onClick={() => setIsScheduleModalOpen(false)} className="text-foreground/40 hover:text-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <form onSubmit={handleSchedule} className="p-8 space-y-6">
              <div className="bg-accent/5 p-4 rounded-2xl border border-accent/10">
                <p className="text-xs font-bold text-accent uppercase mb-1">Preview Copy</p>
                <p className="text-xs text-foreground/70 line-clamp-3 italic">{scheduleData.text}</p>
              </div>

              <div>
                <label className="text-xs font-bold text-foreground/50 uppercase">Nomor Tujuan / ID Grup</label>
                <input
                  required
                  type="text"
                  value={targetId}
                  onChange={(e) => setTargetId(e.target.value)}
                  placeholder="contoh: 120363401263735503@g.us"
                  className="w-full bg-foreground/5 border border-sidebar-border rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-accent/50 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-foreground/50 uppercase">Media Path / URL (Opsional)</label>
                <input
                  type="text"
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  placeholder="e.g. E:\AI_Automation_Website\EQUIRISE.jpeg"
                  className="w-full bg-foreground/5 border border-sidebar-border rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-accent/50 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-foreground/50 uppercase">Pilih Waktu Posting</label>
                <input
                  required
                  type="datetime-local"
                  value={scheduleData.time}
                  onChange={(e) => setScheduleData({ ...scheduleData, time: e.target.value })}
                  className="w-full bg-foreground/5 border border-sidebar-border rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-accent/50 outline-none"
                />
              </div>

              <div className="flex items-center space-x-2 text-xs text-foreground/50">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                <span>Otomatis tambah ke Google Calendar & Kirim ke WA Grup.</span>
              </div>

              <button
                type="submit"
                disabled={loadingSchedule}
                className="w-full bg-accent text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-2"
              >
                {loadingSchedule ? (
                  <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <span>Konfirmasi Jadwal</span>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Send Now Modal */}
      {isSendModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-card border border-sidebar-border w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-sidebar-border flex justify-between items-center bg-foreground/5">
              <h2 className="text-xl font-bold">Kirim Broadcast Sekarang</h2>
              <button onClick={() => setIsSendModalOpen(false)} className="text-foreground/40 hover:text-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <form onSubmit={handleSendNow} className="p-8 space-y-6">
              <div className="bg-accent/5 p-4 rounded-2xl border border-accent/10">
                <p className="text-xs font-bold text-accent uppercase mb-1">Preview Copy</p>
                <p className="text-xs text-foreground/70 line-clamp-3 italic">{scheduleData.text}</p>
              </div>

              <div>
                <label className="text-xs font-bold text-foreground/50 uppercase">Nomor Tujuan / ID Grup</label>
                <input
                  required
                  type="text"
                  value={targetId}
                  onChange={(e) => setTargetId(e.target.value)}
                  placeholder="contoh: 120363401263735503@g.us atau 62812xxx@s.whatsapp.net"
                  className="w-full bg-foreground/5 border border-sidebar-border rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-accent/50 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-foreground/50 uppercase">Media Path / URL (Opsional)</label>
                <input
                  type="text"
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  placeholder="e.g. E:\AI_Automation_Website\EQUIRISE.jpeg"
                  className="w-full bg-foreground/5 border border-sidebar-border rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-accent/50 outline-none"
                />
              </div>

              <div className="flex items-center space-x-2 text-xs text-foreground/50">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                <span>Akan dikirim menggunakan Local OpenClaw Server di port 5000.</span>
              </div>

              <button
                type="submit"
                disabled={loadingSend}
                className="w-full bg-accent text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-2"
              >
                {loadingSend ? (
                  <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <span>Kirim Broadcast</span>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Copywriting Generator */}
        <div className="bg-card border border-sidebar-border rounded-3xl p-8 shadow-sm flex flex-col h-full">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-purple-500/10 text-purple-500 rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            </div>
            <h2 className="text-xl font-bold">Copywriting Generator</h2>
          </div>
          
          <textarea
            value={copyInput}
            onChange={(e) => setCopyInput(e.target.value)}
            placeholder="Masukkan detail produk atau tema kampanye... (e.g. Lampu tenaga surya untuk desa terpencil)"
            className="w-full flex-1 min-h-[120px] bg-foreground/5 border border-sidebar-border rounded-2xl p-4 focus:ring-2 focus:ring-accent/50 outline-none resize-none mb-4"
          />
          
          <button
            onClick={generateCopy}
            disabled={loadingCopy || !copyInput}
            className="w-full bg-accent text-white py-3 rounded-xl font-bold hover:bg-accent/90 transition-all disabled:opacity-50"
          >
            {loadingCopy ? "Generating..." : "Generate Post Copy"}
          </button>

          {copyOutput && (
            <div className="mt-6 p-4 bg-foreground/[0.02] border border-sidebar-border rounded-2xl animate-in fade-in slide-in-from-bottom-2">
              <p className="text-sm whitespace-pre-wrap">{copyOutput}</p>
              <button 
                onClick={() => navigator.clipboard.writeText(copyOutput)}
                className="mt-4 text-xs font-bold text-accent uppercase flex items-center space-x-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                <span>Salin Teks</span>
              </button>
            </div>
          )}
        </div>

        {/* Sentiment Analysis */}
        <div className="bg-card border border-sidebar-border rounded-3xl p-8 shadow-sm flex flex-col h-full">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-orange-500/10 text-orange-500 rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 15h8"/></svg>
            </div>
            <h2 className="text-xl font-bold">Sentiment Analysis</h2>
          </div>

          <textarea
            value={sentimentInput}
            onChange={(e) => setSentimentInput(e.target.value)}
            placeholder="Tempel ulasan pelanggan atau komentar media sosial di sini..."
            className="w-full flex-1 min-h-[120px] bg-foreground/5 border border-sidebar-border rounded-2xl p-4 focus:ring-2 focus:ring-accent/50 outline-none resize-none mb-4"
          />

          <button
            onClick={analyzeSentiment}
            disabled={loadingSentiment || !sentimentInput}
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-all disabled:opacity-50"
          >
            {loadingSentiment ? "Analyzing..." : "Analyze Feedback"}
          </button>

          {sentimentOutput && (
            <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center space-x-4">
                <div className={`px-4 py-2 rounded-xl font-black text-sm uppercase ${
                  sentimentOutput.sentiment === "Positive" ? "bg-green-500/10 text-green-500" :
                  sentimentOutput.sentiment === "Negative" ? "bg-red-500/10 text-red-500" :
                  "bg-yellow-500/10 text-yellow-500"
                }`}>
                  {sentimentOutput.sentiment}
                </div>
                <div className="text-xs font-bold text-foreground/40 uppercase">Score: {sentimentOutput.score}/100</div>
              </div>
              <div className="p-4 bg-foreground/[0.02] border border-sidebar-border rounded-2xl">
                <p className="text-xs font-bold text-foreground/50 uppercase mb-2">Insight AI:</p>
                <p className="text-sm italic">"{sentimentOutput.insight}"</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Competitor Analysis / Web Scraper Mock */}
      <div className="bg-card border border-sidebar-border rounded-3xl p-8 shadow-sm">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <h2 className="text-xl font-bold">Competitor Insights (Web Scraper)</h2>
        </div>
        <div className="flex space-x-4">
          <input 
            value={scrapeUrl}
            onChange={(e) => setScrapeUrl(e.target.value)}
            className="flex-1 bg-foreground/5 border border-sidebar-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent/50 outline-none"
            placeholder="Masukkan URL kampanye kompetitor (e.g. https://kitabisa.com/...)"
          />
          <button onClick={analyzeCompetitor} disabled={loadingScrape || !scrapeUrl} className="bg-accent text-white px-8 rounded-xl font-bold hover:bg-accent/90 transition-all disabled:opacity-50">
            {loadingScrape ? "Scraping..." : "Scrape & Analyze"}
          </button>
        </div>
        <p className="text-xs text-foreground/40 mt-3 italic">*Fitur scraping menggunakan AI untuk mengekstrak strategi pemasaran dari URL.</p>

        {scrapeOutput && (
          <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-foreground/[0.02] border border-sidebar-border rounded-2xl">
                <p className="text-xs font-bold text-foreground/50 uppercase mb-2">Hook</p>
                <p className="text-sm font-bold">{scrapeOutput.hook}</p>
              </div>
              <div className="p-4 bg-foreground/[0.02] border border-sidebar-border rounded-2xl">
                <p className="text-xs font-bold text-foreground/50 uppercase mb-2">Strategi</p>
                <p className="text-sm italic">{scrapeOutput.strategy}</p>
              </div>
              <div className="p-4 bg-foreground/[0.02] border border-sidebar-border rounded-2xl">
                <p className="text-xs font-bold text-foreground/50 uppercase mb-2">Kelemahan</p>
                <p className="text-sm text-red-500/80">{scrapeOutput.weakness}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
