"use client";

import { useState } from "react";
import { Search, MoreVertical, Phone, Video, Paperclip, Send, Check, CheckCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function InboxPage() {
  const [activeChat, setActiveChat] = useState(0);

  const chats = [
    { id: 0, name: "Budi Santoso", phone: "+62 812-3456-7890", lastMessage: "Apakah promo masih berlaku?", time: "10:42 AM", unread: 2, online: true },
    { id: 1, name: "Siti Aminah", phone: "+62 856-1234-5678", lastMessage: "Terima kasih atas informasinya", time: "09:15 AM", unread: 0, online: false },
    { id: 2, name: "Grup Relawan AI", phone: "Group", lastMessage: "Andi: Siap laksanakan", time: "Yesterday", unread: 5, online: true },
    { id: 3, name: "Donatur VIP", phone: "Group", lastMessage: "Anda: Laporan bulan ini sudah dikirim", time: "Yesterday", unread: 0, online: false },
  ];

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col space-y-4 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Unified Inbox</h1>
        <p className="text-foreground/50">Kelola semua percakapan WhatsApp dari satu dashboard.</p>
      </header>

      <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex relative">
        {/* Chat List Sidebar */}
        <div className="w-80 border-r border-white/10 flex flex-col bg-black/20">
          <div className="p-4 border-b border-white/10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" size={18} />
              <input 
                type="text" 
                placeholder="Cari chat atau kontak..." 
                className="w-full bg-foreground/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-accent/50 outline-none transition-all"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {chats.map((chat, idx) => (
              <div 
                key={chat.id}
                onClick={() => setActiveChat(idx)}
                className={`flex items-center gap-3 p-4 cursor-pointer transition-colors border-l-4 ${activeChat === idx ? 'bg-white/10 border-accent' : 'border-transparent hover:bg-white/5'}`}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                    {chat.name.charAt(0)}
                  </div>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#121212]"></div>
                  )}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-sm truncate">{chat.name}</h3>
                    <span className="text-[10px] text-foreground/50 whitespace-nowrap">{chat.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className={`text-xs truncate ${chat.unread > 0 ? 'text-white font-semibold' : 'text-foreground/50'}`}>
                      {chat.lastMessage}
                    </p>
                    {chat.unread > 0 && (
                      <span className="bg-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-2">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-black/40 relative">
          <div className="absolute inset-0 bg-[url('https://web.whatsapp.com/img/bg-chat-tile-dark_a4be512e7195b6b733d9110b408f075d.png')] opacity-5 pointer-events-none z-0"></div>
          
          {/* Chat Header */}
          <div className="p-4 border-b border-white/10 bg-black/40 backdrop-blur-md flex justify-between items-center z-10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold shadow-md">
                {chats[activeChat].name.charAt(0)}
              </div>
              <div>
                <h2 className="font-bold">{chats[activeChat].name}</h2>
                <p className="text-xs text-foreground/50">{chats[activeChat].online ? 'Online' : 'Offline'}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-foreground/50">
              <button className="hover:text-white transition-colors"><Video size={20} /></button>
              <button className="hover:text-white transition-colors"><Phone size={20} /></button>
              <button className="hover:text-white transition-colors"><MoreVertical size={20} /></button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 z-10 custom-scrollbar">
            <div className="flex justify-center">
              <span className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] text-foreground/50 font-medium">TODAY</span>
            </div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
              <div className="bg-white/10 backdrop-blur-md border border-white/5 p-3 rounded-2xl rounded-tl-sm max-w-[70%] shadow-md">
                <p className="text-sm">Halo MaveCode! Saya tertarik dengan fitur otomatisasi donasinya.</p>
                <p className="text-[10px] text-foreground/40 text-right mt-1">10:40 AM</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex justify-end">
              <div className="bg-accent/20 backdrop-blur-md border border-accent/20 p-3 rounded-2xl rounded-tr-sm max-w-[70%] shadow-md">
                <p className="text-sm">Halo! Tentu, fitur otomatisasi donasi kami bisa mengirimkan ucapan terima kasih dan laporan bulanan secara otomatis via WhatsApp.</p>
                <div className="flex justify-end items-center gap-1 mt-1">
                  <p className="text-[10px] text-foreground/40">10:41 AM</p>
                  <CheckCheck size={14} className="text-blue-400" />
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex justify-start">
              <div className="bg-white/10 backdrop-blur-md border border-white/5 p-3 rounded-2xl rounded-tl-sm max-w-[70%] shadow-md">
                <p className="text-sm">{chats[activeChat].lastMessage}</p>
                <p className="text-[10px] text-foreground/40 text-right mt-1">{chats[activeChat].time}</p>
              </div>
            </motion.div>
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-white/10 bg-black/40 backdrop-blur-md z-10 flex items-center gap-3">
            <button className="p-2 text-foreground/50 hover:text-white transition-colors"><Paperclip size={20} /></button>
            <input 
              type="text" 
              placeholder="Ketik pesan..." 
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-accent/50 outline-none transition-all"
            />
            <button className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-accent/20">
              <Send size={18} className="-ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}