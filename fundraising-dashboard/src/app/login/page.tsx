"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/components/AuthProvider";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const { login } = useAuth();
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [inputValue, setInputValue] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      login({
        name: "MAVERICK",
        email: method === "email" ? inputValue : "maverick@ai.com",
        avatar: "MV",
        role: "Wablas Admin",
      });
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      login({
        name: "Google User",
        email: "user@gmail.com",
        avatar: "GU",
        role: "User",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden font-sans">
      {/* Background Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl pointer-events-none"
      />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-sidebar/80 backdrop-blur-xl border border-sidebar-border p-8 rounded-2xl shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-foreground/60 text-sm">Sign in to your MaveCode AI dashboard.</p>
        </div>

        <button 
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full bg-white text-gray-900 font-medium py-3 rounded-xl flex items-center justify-center space-x-3 hover:bg-gray-100 transition-colors mb-6 disabled:opacity-50"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="flex items-center space-x-4 mb-6">
          <div className="h-px bg-sidebar-border flex-1" />
          <span className="text-foreground/40 text-sm">or sign in with</span>
          <div className="h-px bg-sidebar-border flex-1" />
        </div>

        <div className="flex bg-background border border-sidebar-border rounded-lg p-1 mb-6">
          <button 
            type="button"
            onClick={() => setMethod("email")}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${method === "email" ? "bg-sidebar text-white shadow" : "text-foreground/60 hover:text-white"}`}
          >
            Email
          </button>
          <button 
            type="button"
            onClick={() => setMethod("phone")}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${method === "phone" ? "bg-sidebar text-white shadow" : "text-foreground/60 hover:text-white"}`}
          >
            Phone Number
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">
              {method === "email" ? "Email Address" : "Phone Number"}
            </label>
            <input 
              type={method === "email" ? "email" : "tel"} 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={method === "email" ? "name@company.com" : "+62 812 3456 7890"}
              className="w-full bg-background border border-sidebar-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-background border border-sidebar-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
              required
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <label className="flex items-center space-x-2 text-sm text-foreground/60 cursor-pointer">
              <input type="checkbox" className="rounded border-sidebar-border bg-background text-cyan-500 focus:ring-cyan-500/20" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">Forgot password?</a>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium py-3 rounded-xl shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-foreground/60">
          Don't have an account?{' '}
          <Link href="/signup" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
