"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface User {
  name: string;
  email: string;
  avatar: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  hasAutomationAccess: boolean;
  login: (userData: User) => void;
  logout: () => void;
  unlockAutomation: (code: string) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  hasAutomationAccess: false,
  login: () => {},
  logout: () => {},
  unlockAutomation: () => false,
});

const SECRET_CODE = "MAVERICK-AI-2026"; // The secret code to unlock automation

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [hasAutomationAccess, setHasAutomationAccess] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
    const savedUser = localStorage.getItem("mavecode-user");
    const savedAccess = localStorage.getItem("mavecode-automation-access");
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedAccess === "true") {
      setHasAutomationAccess(true);
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("mavecode-user", JSON.stringify(userData));
    router.push("/dashboard");
  };

  const logout = () => {
    setUser(null);
    setHasAutomationAccess(false);
    localStorage.removeItem("mavecode-user");
    localStorage.removeItem("mavecode-automation-access");
    router.push("/login");
  };

  const unlockAutomation = (code: string) => {
    if (code === SECRET_CODE) {
      setHasAutomationAccess(true);
      localStorage.setItem("mavecode-automation-access", "true");
      return true;
    }
    return false;
  };

  // Skip rendering children until mounted to prevent hydration errors
  if (!isMounted) return null;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, hasAutomationAccess, login, logout, unlockAutomation }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
