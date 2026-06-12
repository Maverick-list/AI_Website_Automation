"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const adminNav = [
  { name: "Overview", href: "/admin", icon: "📊" },
  { name: "Products", href: "/admin/products", icon: "📦" },
  { name: "Orders", href: "/admin/orders", icon: "🛒" },
  { name: "Donations", href: "/admin/donations", icon: "❤️" },
  { name: "AI Settings", href: "/admin/ai", icon: "🤖" },
  { name: "Settings", href: "/admin/settings", icon: "⚙️" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 w-64 glass border-r border-white/5 p-6 flex flex-col">
      <div className="flex items-center space-x-3 mb-12">
        <div className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center font-black">A</div>
        <div>
          <h2 className="font-black text-lg leading-tight">AdminPanel</h2>
          <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Seller Dashboard</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {adminNav.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                isActive 
                  ? "bg-white text-black shadow-xl shadow-white/10" 
                  : "text-white/40 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5">
        <Link href="/" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-all">
          <span>🚪</span>
          <span>Exit Admin</span>
        </Link>
      </div>
    </aside>
  );
}
