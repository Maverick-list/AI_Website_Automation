"use client";

import { useAuth } from "./AuthProvider";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

// Routes that don't require authentication
const publicRoutes = ["/", "/login", "/signup"];

// Routes that require the secret automation access code
const automationRoutes = ["/broadcast-automation", "/g-workspace"];

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, hasAutomationAccess } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Check if the current route is public
    const isPublic = publicRoutes.includes(pathname);
    
    // If not authenticated and trying to access a protected route, redirect to login
    if (!isAuthenticated && !isPublic) {
      router.replace("/login");
      return;
    }

    // If authenticated but trying to access login/signup, redirect to dashboard
    if (isAuthenticated && (pathname === "/login" || pathname === "/signup")) {
      router.replace("/dashboard");
      return;
    }

    // If trying to access automation routes without the secret code, redirect to unlock
    const isAutomationRoute = automationRoutes.some(route => pathname.startsWith(route));
    if (isAuthenticated && isAutomationRoute && !hasAutomationAccess) {
      router.replace("/unlock-automation");
    }
  }, [isAuthenticated, hasAutomationAccess, pathname, router]);

  return <>{children}</>;
}
