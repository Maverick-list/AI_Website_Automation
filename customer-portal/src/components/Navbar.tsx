"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navItems = [
  { name: "Beranda", href: "/" },
  { name: "Katalog", href: "/shop" },
  { name: "Lacak Pesanan", href: "/track" },
  { name: "AI Assistant", href: "/assistant" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  if (pathname?.startsWith("/admin")) return null;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl transition-all duration-300 ${
        scrolled ? "glass rounded-2xl py-2 shadow-2xl" : "py-4"
      }`}
    >
      <div className="px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-accent via-accent-secondary to-accent-tertiary rounded-xl flex items-center justify-center shadow-lg shadow-accent/20 group-hover:rotate-12 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </div>
          <span className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            FundRaise
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all relative group ${
                  isActive
                    ? "text-white"
                    : "text-foreground/50 hover:text-foreground"
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-accent/20 blur-md rounded-xl -z-10 animate-pulse" />
                )}
                {item.name}
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full transition-all duration-300 ${isActive ? "opacity-100 translate-y-1" : "opacity-0 translate-y-2 group-hover:opacity-50"}`} />
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link href="/shop" className="bg-white text-black px-6 py-2.5 rounded-xl text-sm font-black hover:bg-accent hover:text-white transition-all shadow-xl shadow-white/5 active:scale-95">
            Mulai Belanja
          </Link>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-xl hover:bg-white/5 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {mobileOpen ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <path d="M4 12h16M4 6h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden mt-4 mx-2 glass rounded-2xl p-4 space-y-1 animate-in slide-in-from-top-4 duration-300">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              onClick={() => setMobileOpen(false)}
              className={`block px-5 py-4 rounded-xl text-sm font-bold ${pathname === item.href ? "bg-accent/20 text-white border border-accent/20" : "hover:bg-white/5"}`}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-white/5">
            <Link href="/shop" onClick={() => setMobileOpen(false)} className="block w-full bg-accent text-white px-5 py-4 rounded-xl text-center text-sm font-black shadow-lg shadow-accent/20">
              Mulai Belanja
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
