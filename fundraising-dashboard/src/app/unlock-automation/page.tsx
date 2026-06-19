"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/components/AuthProvider";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Unlock, ShieldAlert } from "lucide-react";

export default function UnlockAutomationPage() {
  const { unlockAutomation } = useAuth();
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);
    
    setTimeout(() => {
      const isValid = unlockAutomation(code);
      if (isValid) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/dashboard"); // Redirect to dashboard or previous automation page after unlock
        }, 1500);
      } else {
        setError(true);
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-sidebar/80 backdrop-blur-xl border border-sidebar-border p-8 rounded-2xl shadow-2xl relative z-10 text-center"
      >
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/20 mb-6">
          {success ? <Unlock size={28} className="text-white" /> : <Lock size={28} className="text-white" />}
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">
          {success ? "Access Granted" : "Restricted Area"}
        </h1>
        <p className="text-foreground/60 text-sm mb-8">
          {success 
            ? "Your account now has permanent access to automation features."
            : "This feature is strictly locked. Only authorized users with the MaveCode Secret Key can enter."
          }
        </p>

        {!success && (
          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <input 
                type="password" 
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setError(false);
                }}
                placeholder="Enter Secret Code"
                className={`w-full bg-background border ${error ? 'border-red-500/50 focus:border-red-500' : 'border-sidebar-border focus:border-purple-500'} rounded-lg px-4 py-3 text-center tracking-widest text-white focus:outline-none transition-colors`}
                required
              />
              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -5 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-xs mt-2 flex items-center justify-center space-x-1"
                >
                  <ShieldAlert size={14} />
                  <span>Invalid Security Code</span>
                </motion.p>
              )}
            </div>

            <button 
              type="submit" 
              disabled={isLoading || !code}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-medium py-3 rounded-xl shadow-lg shadow-purple-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <span>Verify Access</span>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
