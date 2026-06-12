"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="border-t border-sidebar-border py-8 text-center text-xs text-foreground/30">
      © 2026 FundRaise. Dibuat dengan ❤️ untuk kebaikan sosial.
    </footer>
  );
}
