"use client";

import { useState } from "react";
import { Plus, MessageSquare, Clock, Users, Edit2, Trash2, Power } from "lucide-react";
import { motion } from "framer-motion";

export default function AutoReplyPage() {
  const [replies, setReplies] = useState([
    { id: 1, keyword: "Halo", type: "Exact Match", reply: "Halo! Terima kasih telah menghubungi MaveCode AI. Ada yang bisa kami bantu?", status: "Active" },
    { id: 2, keyword: "Donasi", type: "Contains", reply: "Untuk donasi, silakan transfer ke rekening BCA 123456789 a.n Yayasan. Konfirmasi bukti transfer ke nomor ini.", status: "Active" },
    { id: 3, keyword: "Promo", type: "Exact Match", reply: "Maaf, promo bulan ini sudah habis. Ikuti terus update kami ya!", status: "Inactive" },
  ]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Auto Reply</h1>
          <p className="text-foreground/50">Balas otomatis pesan masuk berdasarkan kata kunci tertentu.</p>
        </div>
        <button className="bg-accent hover:bg-accent/90 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-accent/20 transition-all hover:scale-105 active:scale-95">
          <Plus size={18} /> Tambah Keyword
        </button>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border border-white/10 p-6 rounded-3xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <MessageSquare size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-foreground/40 uppercase">Total Keywords</p>
            <p className="text-2xl font-black">{replies.length}</p>
          </div>
        </div>
        <div className="bg-card border border-white/10 p-6 rounded-3xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center">
            <Power size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-foreground/40 uppercase">Active Auto Reply</p>
            <p className="text-2xl font-black">{replies.filter(r => r.status === 'Active').length}</p>
          </div>
        </div>
        <div className="bg-card border border-white/10 p-6 rounded-3xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-foreground/40 uppercase">Pesan Terbalas</p>
            <p className="text-2xl font-black">1,248</p>
          </div>
        </div>
      </div>

      {/* Rules List */}
      <div className="bg-card border border-white/10 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-foreground/5 border-b border-white/10">
                <th className="px-6 py-4 text-xs font-bold uppercase text-foreground/50">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-foreground/50">Keyword</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-foreground/50">Tipe Match</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-foreground/50">Isi Balasan</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-foreground/50 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {replies.map((reply, i) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={reply.id} 
                  className="hover:bg-foreground/[0.02] transition-colors"
                >
                  <td className="px-6 py-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={reply.status === 'Active'} readOnly />
                      <div className="w-9 h-5 bg-foreground/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent"></div>
                    </label>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-foreground/10 px-3 py-1 rounded-md text-sm font-bold border border-white/5">
                      {reply.keyword}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-foreground/60 bg-foreground/5 px-2 py-1 rounded-md">
                      {reply.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-foreground/80 line-clamp-2 max-w-xs">{reply.reply}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}