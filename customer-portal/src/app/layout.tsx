import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "FundRaise | Marketplace Sosial",
  description: "Belanja produk sosial dan berkontribusi untuk perubahan yang lebih baik.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <Navbar />
        <main className="pt-20 pb-16 min-h-screen">{children}</main>
        <footer className="border-t border-sidebar-border py-8 text-center text-xs text-foreground/30">
          © 2026 FundRaise. Dibuat dengan ❤️ untuk kebaikan sosial.
        </footer>
      </body>
    </html>
  );
}
