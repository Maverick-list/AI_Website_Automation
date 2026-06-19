"use client";

import { usePathname } from "next/navigation";

export default function RootLayoutInner({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  if (isLandingPage) {
    return (
      <div className="min-h-screen w-full">
        {children}
      </div>
    );
  }

  // Dynamic import Sidebar only for dashboard pages
  const Sidebar = require("@/components/Sidebar").default;

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 md:ml-64 p-4 md:p-8 bg-background mt-16 md:mt-0 w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
