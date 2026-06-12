"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "ai";
  text: string;
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "Halo! 👋 Saya adalah OpenClaw AI. Saya di sini untuk membantu Anda menemukan produk yang memberikan dampak sosial terbaik, melacak pesanan, atau sekadar berdiskusi tentang misi kami. Apa yang ingin Anda ketahui hari ini?" },
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
      setMessages(prev => [...prev, { role: "ai", text: "Maaf, koneksi saya sedang terganggu. Mari coba lagi dalam sekejap! 🙏" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 h-[calc(100vh-8rem)] flex flex-col pt-10">
      <header className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-4xl font-black tracking-tighter">AI Assistant</h1>
        <p className="text-white/30 font-bold uppercase tracking-[0.3em] text-[10px] mt-2">Powered by OpenClaw Engine</p>
      </header>

      <div className="flex-1 glass rounded-[40px] p-6 md:p-10 flex flex-col overflow-hidden relative shadow-2xl shadow-accent/5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] -z-10" />
        
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto space-y-8 mb-8 pr-4 custom-scrollbar">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in zoom-in-95 duration-500`}>
              <div className={`flex items-end space-x-3 max-w-[85%] md:max-w-[70%] ${msg.role === "user" ? "flex-row-reverse space-x-reverse" : "flex-row"}`}>
                <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center text-xl shadow-lg ${
                  msg.role === "user" ? "bg-white text-black" : "bg-accent text-white"
                }`}>
                  {msg.role === "user" ? "👤" : "🤖"}
                </div>
                <div className={`px-6 py-4 rounded-[28px] text-base font-medium leading-relaxed whitespace-pre-wrap shadow-xl ${
                  msg.role === "user"
                    ? "bg-white text-black rounded-br-md"
                    : "glass border-white/10 text-white rounded-bl-md"
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start animate-in fade-in duration-300">
              <div className="flex items-end space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-accent text-white flex items-center justify-center text-xl shadow-lg">🤖</div>
                <div className="glass border-white/10 px-6 py-4 rounded-[28px] rounded-bl-md">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="relative group">
          <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-3xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
          <div className="relative glass border-white/10 rounded-3xl p-2 flex items-center shadow-2xl">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ketik pesan Anda di sini..."
              className="flex-1 bg-transparent border-none px-6 py-4 focus:ring-0 outline-none text-white font-medium text-lg placeholder:text-white/20"
            />
            <button 
              type="submit" 
              disabled={loading || !input.trim()}
              className="bg-white text-black p-4 rounded-2xl font-black hover:bg-accent hover:text-white transition-all disabled:opacity-50 shadow-xl shadow-white/5 active:scale-95"
            >
              <svg className="w-6 h-6 rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
