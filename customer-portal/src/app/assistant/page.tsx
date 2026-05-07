"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "ai";
  text: string;
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "Halo! 👋 Saya adalah FundRaise AI Assistant. Saya bisa membantu Anda menemukan produk yang tepat, menjawab pertanyaan tentang pengiriman, atau memberikan rekomendasi berdasarkan kebutuhan Anda. Apa yang bisa saya bantu hari ini?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "ai", text: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "ai", text: "Maaf, terjadi gangguan teknis. Silakan coba lagi. 🙏" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col h-[calc(100vh-12rem)]">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-black tracking-tight">AI Shopping Assistant</h1>
        <p className="text-xs text-foreground/40">Powered by Gemini AI • Siap membantu 24/7</p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] px-5 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
              msg.role === "user"
                ? "bg-accent text-white rounded-br-sm"
                : "bg-card border border-sidebar-border rounded-bl-sm"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-card border border-sidebar-border px-5 py-3 rounded-2xl rounded-bl-sm">
              <div className="flex space-x-1.5">
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="flex space-x-3">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Tanya apa saja tentang produk kami..."
          className="flex-1 bg-card border border-sidebar-border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent/50 outline-none"
        />
        <button type="submit" disabled={loading || !input.trim()}
          className="bg-accent text-white px-6 py-4 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-lg shadow-accent/20">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </form>
    </div>
  );
}
