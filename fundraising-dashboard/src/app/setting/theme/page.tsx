"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

export default function ThemeSettings() {
  const { theme, setTheme, resetTheme } = useTheme();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          UI Theme Settings
        </h1>
        <p className="text-foreground/60 mt-2">Customize the platform to match your brand identity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-sidebar border border-sidebar-border p-6 rounded-xl shadow-lg space-y-6">
          <h2 className="text-xl font-semibold text-white">Colors</h2>
          
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-foreground/80 font-medium">Main Background (Hex/RGB)</label>
              <div className="flex space-x-4">
                <input 
                  type="color" 
                  value={theme.background} 
                  onChange={(e) => setTheme({ background: e.target.value })}
                  className="w-12 h-10 rounded cursor-pointer bg-transparent border-0 p-0"
                />
                <input 
                  type="text" 
                  value={theme.background}
                  onChange={(e) => setTheme({ background: e.target.value })}
                  className="flex-1 bg-background border border-sidebar-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm text-foreground/80 font-medium">Text Color (Foreground)</label>
              <div className="flex space-x-4">
                <input 
                  type="color" 
                  value={theme.foreground} 
                  onChange={(e) => setTheme({ foreground: e.target.value })}
                  className="w-12 h-10 rounded cursor-pointer bg-transparent border-0 p-0"
                />
                <input 
                  type="text" 
                  value={theme.foreground}
                  onChange={(e) => setTheme({ foreground: e.target.value })}
                  className="flex-1 bg-background border border-sidebar-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm text-foreground/80 font-medium">Sidebar & Cards</label>
              <div className="flex space-x-4">
                <input 
                  type="color" 
                  value={theme.sidebar} 
                  onChange={(e) => setTheme({ sidebar: e.target.value })}
                  className="w-12 h-10 rounded cursor-pointer bg-transparent border-0 p-0"
                />
                <input 
                  type="text" 
                  value={theme.sidebar}
                  onChange={(e) => setTheme({ sidebar: e.target.value })}
                  className="flex-1 bg-background border border-sidebar-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-sidebar border border-sidebar-border p-6 rounded-xl shadow-lg space-y-6">
          <h2 className="text-xl font-semibold text-white">Typography</h2>
          
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-foreground/80 font-medium">Font Family</label>
              <select 
                value={theme.fontFamily}
                onChange={(e) => setTheme({ fontFamily: e.target.value })}
                className="bg-background border border-sidebar-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="var(--font-jakarta), sans-serif">Plus Jakarta Sans (Default Premium)</option>
                <option value="'Inter', sans-serif">Inter (Clean & Modern)</option>
                <option value="'Outfit', sans-serif">Outfit (Geometric & Tech)</option>
                <option value="Arial, sans-serif">Arial (Standard)</option>
                <option value="monospace">Monospace (Code)</option>
              </select>
            </div>
          </div>

          <div className="pt-6 border-t border-sidebar-border flex items-center justify-between">
            <button 
              onClick={resetTheme}
              className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
            >
              Reset to Defaults
            </button>
            <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-2 rounded-lg font-medium shadow-lg transition-all hover:scale-105 active:scale-95">
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
