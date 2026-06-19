import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import RootLayoutInner from "@/components/RootLayoutInner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { AuthGuard } from "@/components/AuthGuard";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MaveCode AI | Platform Marketing AI Terlengkap",
  description: "Platform Marketing AI terlengkap untuk bisnis Anda. WhatsApp Broadcast Otomatis, Konten AI, Manajemen Inventori & Keuangan — semua dalam satu dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${jakarta.variable} font-sans antialiased`}>
        <AuthProvider>
          <ThemeProvider>
            <AuthGuard>
              <RootLayoutInner>
                {children}
              </RootLayoutInner>
            </AuthGuard>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
