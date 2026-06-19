"use client";

import { useState } from "react";
import { CheckCircle2, ChevronRight } from "lucide-react";

export default function GWorkspaceAutomation() {
  const [activeTab, setActiveTab] = useState("sheets");

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Google Workspace Automation
        </h1>
        <p className="text-foreground/60 mt-2">Connect MaveCode AI with your Google ecosystem for seamless automation.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Nav for G-Workspace */}
        <div className="w-full md:w-64 space-y-2 flex-shrink-0">
          <button 
            onClick={() => setActiveTab('sheets')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'sheets' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-sidebar border border-sidebar-border text-foreground/70 hover:bg-foreground/5'}`}
          >
            <div className="flex items-center gap-3">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/Google_Sheets_logo_%282014-2020%29.svg" alt="Sheets" className="w-5 h-5" />
              Google Sheets
            </div>
            <ChevronRight size={16} className={activeTab === 'sheets' ? 'text-cyan-400' : 'opacity-0'} />
          </button>
          
          <button 
            onClick={() => setActiveTab('calendar')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'calendar' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-sidebar border border-sidebar-border text-foreground/70 hover:bg-foreground/5'}`}
          >
            <div className="flex items-center gap-3">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" alt="Calendar" className="w-5 h-5" />
              Google Calendar
            </div>
            <ChevronRight size={16} className={activeTab === 'calendar' ? 'text-cyan-400' : 'opacity-0'} />
          </button>
          
          <button 
            onClick={() => setActiveTab('drive')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'drive' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-sidebar border border-sidebar-border text-foreground/70 hover:bg-foreground/5'}`}
          >
            <div className="flex items-center gap-3">
              <img src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg" alt="Drive" className="w-5 h-5" />
              Google Drive
            </div>
            <ChevronRight size={16} className={activeTab === 'drive' ? 'text-cyan-400' : 'opacity-0'} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-sidebar border border-sidebar-border rounded-xl p-8 shadow-xl">
          {activeTab === 'sheets' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 border-b border-sidebar-border pb-6">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/Google_Sheets_logo_%282014-2020%29.svg" alt="Sheets" className="w-12 h-12" />
                <div>
                  <h2 className="text-xl font-bold text-white">Google Sheets Sync</h2>
                  <p className="text-sm text-foreground/60">Export inbound messages or sync contact lists automatically.</p>
                </div>
              </div>
              
              <div className="grid gap-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-foreground/5 border border-sidebar-border">
                  <CheckCircle2 className="text-cyan-400 mt-0.5" size={20} />
                  <div>
                    <h4 className="text-white font-medium">Auto-Export Leads</h4>
                    <p className="text-sm text-foreground/60">Automatically insert new WhatsApp contacts into a specific spreadsheet row.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-foreground/5 border border-sidebar-border">
                  <CheckCircle2 className="text-cyan-400 mt-0.5" size={20} />
                  <div>
                    <h4 className="text-white font-medium">Broadcast from Sheets</h4>
                    <p className="text-sm text-foreground/60">Read columns A (Target) and B (Message) to fire automated campaigns.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-medium rounded-lg shadow-lg transition-all">
                  Connect Account
                </button>
              </div>
            </div>
          )}

          {activeTab === 'calendar' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 border-b border-sidebar-border pb-6">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" alt="Calendar" className="w-12 h-12" />
                <div>
                  <h2 className="text-xl font-bold text-white">Calendar Automation</h2>
                  <p className="text-sm text-foreground/60">Create appointments and send meeting reminders via WhatsApp.</p>
                </div>
              </div>
              <p className="text-foreground/70">
                Fitur ini memungkinkan MaveCode AI Bot membaca jadwal Anda dan otomatis mengirim pesan pengingat kepada klien 1 jam sebelum meeting dimulai.
              </p>
              <button className="px-6 py-2.5 bg-foreground/10 hover:bg-foreground/20 text-white font-medium rounded-lg transition-all border border-sidebar-border">
                Coming Soon
              </button>
            </div>
          )}

          {activeTab === 'drive' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 border-b border-sidebar-border pb-6">
                <img src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg" alt="Drive" className="w-12 h-12" />
                <div>
                  <h2 className="text-xl font-bold text-white">Drive Integration</h2>
                  <p className="text-sm text-foreground/60">Save media attachments or fetch files for broadcast campaigns.</p>
                </div>
              </div>
              <p className="text-foreground/70">
                Pilih folder di Google Drive sebagai tempat penyimpanan otomatis semua foto/dokumen yang dikirim pelanggan ke WhatsApp Anda.
              </p>
              <button className="px-6 py-2.5 bg-foreground/10 hover:bg-foreground/20 text-white font-medium rounded-lg transition-all border border-sidebar-border">
                Coming Soon
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
