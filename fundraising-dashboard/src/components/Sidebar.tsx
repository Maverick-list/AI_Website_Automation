"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  Home, Smartphone, Inbox, Link as LinkIcon, BookOpen, 
  MessageSquare, CreditCard, Users, PieChart, Settings, 
  Key, Bot, UserPlus, HelpCircle, Upload, FileText, 
  ChevronDown, ChevronRight, Menu, X 
} from "lucide-react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useAuth } from "./AuthProvider";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { name: "Dashboard bdg", href: "/dashboard", icon: <Home size={20} /> },
  { name: "Device", href: "/broadcast-automation", icon: <Smartphone size={20} /> },
  { name: "Inbox", href: "/inbox", icon: <Inbox size={20} /> },
  { name: "wapos.id", href: "/wapos", icon: <LinkIcon size={20} /> },
  { 
    name: "Phonebook", icon: <BookOpen size={20} />, 
    submenus: [
      { name: "Contact", href: "/phonebook/contact" },
      { name: "Group", href: "/phonebook/group" },
      { name: "WA Group", href: "/phonebook/wa-group" },
      { name: "Google Contact", href: "/phonebook/google-contact" },
      { name: "Google CSV", href: "/phonebook/google-csv" },
      { name: "Blacklist", href: "/phonebook/blacklist" },
    ]
  },
  { 
    name: "Message", icon: <MessageSquare size={20} />, 
    submenus: [
      { name: "New Message", href: "/message/new" },
      { name: "Schedule", href: "/message/schedule" },
      { name: "Auto Responder", href: "/message/auto-responder" },
      { name: "Reminder", href: "/message/reminder" },
      { name: "Auto Reply", href: "/message/auto-reply" },
      { name: "Quick Reply", href: "/message/quick-reply" },
      { name: "Forward Message", href: "/message/forward" },
      { name: "Campaign", href: "/message/campaign" },
      { name: "Check Phone", href: "/message/check-phone" },
    ]
  },
  { 
    name: "Payment", icon: <CreditCard size={20} />, 
    submenus: [
      { name: "Subscription", href: "/payment/subscription" },
      { name: "Invoice", href: "/payment/invoice" },
      { name: "Recurring Payment (CC)", href: "/payment/recurring" },
    ]
  },
  { name: "Referral", href: "/referral", icon: <Users size={20} /> },
  { name: "Report", href: "/report", icon: <PieChart size={20} /> },
  { 
    name: "Setting", icon: <Settings size={20} />, 
    submenus: [
      { name: "Label", href: "/setting/label" },
      { name: "Channel", href: "/setting/channel" },
      { name: "Widget", href: "/setting/widget" },
      { name: "Profile", href: "/setting/profile" },
      { name: "Password Histories", href: "/setting/password-histories" },
      { name: "Change Password", href: "/setting/change-password" },
      { name: "UI Theme", href: "/setting/theme" },
    ]
  },
  { name: "G-Workspace Auto", href: "/g-workspace", icon: <Bot size={20} /> },
  { name: "AI Bots", href: "/ai-bots", icon: <Bot size={20} /> },
  { 
    name: "Team", icon: <UserPlus size={20} />,
    submenus: [
      { name: "Directory", href: "/team" },
      { name: "Community", href: "/team/community" }
    ]
  },
  { name: "Support", href: "/support", icon: <HelpCircle size={20} /> },
  { name: "Upload File", href: "/upload-file", icon: <Upload size={20} /> },
  { name: "Documentation", href: "/documentation", icon: <FileText size={20} /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

  // Auto-expand menu if a child is active
  useEffect(() => {
    const newExpanded = { ...expandedMenus };
    menuItems.forEach((item) => {
      if (item.submenus) {
        const isChildActive = item.submenus.some((sub) => pathname.startsWith(sub.href));
        if (isChildActive) {
          newExpanded[item.name] = true;
        }
      }
    });
    setExpandedMenus(newExpanded);
  }, [pathname]);

  const toggleSubmenu = (name: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  return (
    <>
      {/* Mobile Top Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-sidebar border-b border-sidebar-border z-40 flex items-center justify-between px-4">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Wablas Gateway
        </h1>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="p-2 text-foreground/70 hover:text-foreground transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside className={`w-64 bg-sidebar border-r border-sidebar-border h-screen flex flex-col fixed left-0 top-0 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 custom-scrollbar`}>
        <div className="p-6 flex items-center justify-between">
          <Link href="/">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer">
                MaveCode AI
              </h1>
              <p className="text-xs text-foreground/50 mt-1 uppercase tracking-widest font-semibold">
                Automation Gateway
              </p>
            </div>
          </Link>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-foreground/50 hover:text-foreground">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto custom-scrollbar pb-10">
          {menuItems.map((item) => {
            const hasSubmenu = !!item.submenus;
            const isExpanded = expandedMenus[item.name];
            const isActive = !hasSubmenu && pathname === item.href;

            return (
              <div key={item.name} className="flex flex-col">
                {hasSubmenu ? (
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 group text-sm font-medium ${
                      isExpanded ? "text-cyan-400 bg-cyan-400/10" : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className={isExpanded ? "text-cyan-400" : "text-foreground/50 group-hover:text-foreground"}>
                        {item.icon}
                      </span>
                      <span>{item.name}</span>
                    </div>
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                ) : (
                  <Link
                    href={item.href!}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 group text-sm font-medium ${
                      isActive
                        ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/20"
                        : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                    }`}
                  >
                    <span className={`${isActive ? "text-white" : "text-foreground/50 group-hover:text-cyan-400 transition-colors"}`}>
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </Link>
                )}

                {/* Submenu rendering */}
                <AnimatePresence>
                  {hasSubmenu && isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="ml-9 mt-1 mb-2 overflow-hidden border-l border-sidebar-border pl-2 space-y-1"
                    >
                      {item.submenus!.map((sub) => {
                        const isSubActive = pathname === sub.href;
                        return (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={() => setIsOpen(false)}
                            className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                              isSubActive 
                                ? "text-cyan-400 font-semibold bg-cyan-400/10" 
                                : "text-foreground/60 hover:text-cyan-400 hover:bg-foreground/5"
                            }`}
                          >
                            {sub.name}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border bg-sidebar mt-auto">
          {user ? (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                {user.avatar}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
                <p className="text-xs text-foreground/50 truncate">{user.role}</p>
              </div>
              <button 
                onClick={logout}
                className="p-2 text-foreground/50 hover:text-red-400 transition-colors"
                title="Logout"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              </button>
            </div>
          ) : (
            <div className="text-center">
              <Link href="/login" className="block w-full py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-sm font-medium transition-colors">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </aside>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </>
  );
}
