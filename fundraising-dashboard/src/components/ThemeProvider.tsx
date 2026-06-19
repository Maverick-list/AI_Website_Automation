"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ThemeConfig = {
  background: string;
  foreground: string;
  sidebar: string;
  fontFamily: string;
};

const defaultTheme: ThemeConfig = {
  background: "#0f172a", // Default dark mode background from globals.css
  foreground: "#ffffff", // Default text color
  sidebar: "#0f172a",
  fontFamily: "var(--font-jakarta), sans-serif",
};

interface ThemeContextType {
  theme: ThemeConfig;
  setTheme: (newTheme: Partial<ThemeConfig>) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  setTheme: () => {},
  resetTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeConfig>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("mavecode-theme");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setThemeState({ ...defaultTheme, ...parsed });
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Apply CSS variables to root
    const root = document.documentElement;
    root.style.setProperty("--background", theme.background);
    root.style.setProperty("--foreground", theme.foreground);
    root.style.setProperty("--sidebar", theme.sidebar);
    
    if (theme.fontFamily.includes("Jakarta")) {
      root.style.setProperty("--font-sans", "var(--font-jakarta), sans-serif");
    } else if (theme.fontFamily.includes("Inter")) {
      root.style.setProperty("--font-sans", "'Inter', sans-serif");
    } else if (theme.fontFamily.includes("Outfit")) {
      root.style.setProperty("--font-sans", "'Outfit', sans-serif");
    } else {
      root.style.setProperty("--font-sans", theme.fontFamily);
    }
    
    // Also save to local storage
    localStorage.setItem("mavecode-theme", JSON.stringify(theme));
  }, [theme, mounted]);

  const setTheme = (newTheme: Partial<ThemeConfig>) => {
    setThemeState((prev) => ({ ...prev, ...newTheme }));
  };

  const resetTheme = () => {
    setThemeState(defaultTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
