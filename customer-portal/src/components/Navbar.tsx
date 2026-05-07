"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { name: "Beranda", href: "/" },
  { name: "Katalog", href: "/shop" },
  { name: "Lacak Pesanan", href: "/track" },
  { name: "AI Assistant", href: "/assistant" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-sidebar-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent-secondary rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </div>
          <span className="text-lg font-black tracking-tight">FundRaise</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                pathname === item.href
                  ? "bg-accent text-white shadow-lg shadow-accent/20"
                  : "hover:bg-foreground/5 text-foreground/60 hover:text-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg hover:bg-foreground/5">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-sidebar-border bg-background/95 backdrop-blur-xl p-4 space-y-1">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 rounded-xl text-sm font-medium ${pathname === item.href ? "bg-accent text-white" : "hover:bg-foreground/5"}`}>
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
