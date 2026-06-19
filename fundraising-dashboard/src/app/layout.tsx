import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FundEase | Management Dashboard",
  description: "Modern Fundraising Management Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col md:flex-row`}>
        <Sidebar />
        <main className="flex-1 md:ml-64 p-4 md:p-8 bg-background mt-16 md:mt-0 w-full overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
