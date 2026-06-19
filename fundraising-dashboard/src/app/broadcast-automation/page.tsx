"use client";

import { useState, useEffect } from "react";

interface Broadcast {
  id: string;
  senderAccount?: string;
  target: string;
  message: string;
  media: string[] | string | null;
  type: "immediate" | "scheduled" | "recurring";
  intervalMinutes?: number;
  status: "pending" | "sending" | "sent" | "failed" | "cancelled";
  time: string | null;
  createdAt: string;
  executedAt: string | null;
  error: string | null;
}

export default function BroadcastAutomationPage() {
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [loadingBroadcasts, setLoadingBroadcasts] = useState(false);
  const [senders, setSenders] = useState<{id: string, label: string}[]>([]);
  
  // QR Code State
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [qrStatus, setQrStatus] = useState<string>("generating");

  // Pairing Mode State
  const [pairingMethod, setPairingMethod] = useState<"qr" | "code">("qr");
  const [pairingPhone, setPairingPhone] = useState("");
  const [pairingCode, setPairingCode] = useState<string | null>(null);
  const [requestingPairCode, setRequestingPairCode] = useState(false);

  // Form State
  const [senderAccount, setSenderAccount] = useState("default");
  const [target, setTarget] = useState("120363401263735503@g.us");
  const [message, setMessage] = useState("");
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleTime, setScheduleTime] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [intervalMinutes, setIntervalMinutes] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  // Dynamic API URL for resilient local testing when internet/tunnel is down
  const API_BASE = typeof window !== "undefined" && window.location.hostname === "localhost" 
    ? "http://localhost:5000/api" 
    : "https://mavecode-api-v2.loca.lt/api";

  // Load status and broadcasts
  const fetchStatus = async () => {
    setCheckingStatus(true);
    try {
      const res = await fetch(`${API_BASE}/status`, {
        headers: { "Bypass-Tunnel-Reminder": "true" }
      });
      const data = await res.json();
      setIsConnected(data.connected);
      
      // Fetch Senders
      const sendersRes = await fetch(`${API_BASE}/senders`, {
        headers: { "Bypass-Tunnel-Reminder": "true" }
      });
      const sendersData = await sendersRes.json();
      if (Array.isArray(sendersData)) {
        setSenders(sendersData);
        if (sendersData.length > 0 && !sendersData.find(s => s.id === senderAccount)) {
          setSenderAccount(sendersData[0].id);
        }
      }
    } catch (e) {
      setIsConnected(false);
    } finally {
      setCheckingStatus(false);
    }
  };

  const fetchBroadcasts = async () => {
    setLoadingBroadcasts(true);
    try {
      const res = await fetch(`${API_BASE}/broadcasts`, {
        headers: { "Bypass-Tunnel-Reminder": "true" }
      });
      const data = await res.json();
      setBroadcasts(data);
    } catch (e) {
      console.error("Failed to load broadcasts:", e);
    } finally {
      setLoadingBroadcasts(false);
    }
  };

  const fetchQR = async () => {
    try {
      const res = await fetch(`${API_BASE}/wa/add-device`, {
        headers: { "Bypass-Tunnel-Reminder": "true" }
      });
      const data = await res.json();
      setQrStatus(data.status);
      if (data.qr) {
        setQrCode(data.qr);
      } else {
        setQrCode(null);
      }
    } catch (e) {
      console.error("Failed to load QR code:", e);
    }
  };

  useEffect(() => {
    fetchStatus();
    fetchBroadcasts();
    fetchQR();
    
    // Poll QR every 3 seconds so it never expires on screen
    const qrInterval = setInterval(() => {
      fetchQR();
      fetchStatus();
    }, 3000);
    
    // Poll broadcasts every 15 seconds
    const dataInterval = setInterval(() => {
      fetchBroadcasts();
    }, 15000);
    
    return () => {
      clearInterval(qrInterval);
      clearInterval(dataInterval);
    };
  }, []);

  const handleReconnect = async () => {
    setCheckingStatus(true);
    setQrStatus("generating");
    setQrCode(null);
    setPairingCode(null);
    try {
      await fetch(`${API_BASE}/wa/reconnect`, {
        method: "POST",
        headers: { "Bypass-Tunnel-Reminder": "true" }
      });
      setTimeout(() => {
        fetchStatus();
        fetchQR();
      }, 3000);
    } catch (e) {
      console.error("Failed to reconnect", e);
      setCheckingStatus(false);
    }
  };

  const handleRequestPairingCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pairingPhone) return alert("Masukkan nomor WhatsApp tujuan!");
    
    setRequestingPairCode(true);
    try {
      const res = await fetch(`${API_BASE}/wa/pair`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Bypass-Tunnel-Reminder": "true" 
        },
        body: JSON.stringify({ phoneNumber: pairingPhone })
      });
      const data = await res.json();
      if (data.error) {
        alert("Gagal: " + data.error);
      } else if (data.code) {
        setPairingCode(data.code);
      }
    } catch (e) {
      console.error(e);
      alert("Gagal menghubungi server untuk pairing code.");
    } finally {
      setRequestingPairCode(false);
    }
  };

  const handleCreateBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!target || !message) return alert("Nomor/Grup tujuan dan pesan wajib diisi!");
    if (isScheduled && !scheduleTime) return alert("Silakan tentukan waktu penjadwalan!");

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("senderAccount", senderAccount);
      formData.append("target", target);
      formData.append("message", message);
      if (mediaFiles && mediaFiles.length > 0) {
        mediaFiles.forEach(file => {
          formData.append("mediaFiles", file);
        });
      }
      if (isScheduled && scheduleTime) {
        formData.append("time", scheduleTime);
      }
      if (isRecurring) {
        formData.append("isRecurring", "true");
        formData.append("intervalMinutes", intervalMinutes.toString());
        // Jika berulang tapi tidak diset waktu mulai, gunakan waktu saat ini
        if (!isScheduled || !scheduleTime) {
            const now = new Date();
            // set to next minute to allow backend to pick it up cleanly
            now.setMinutes(now.getMinutes() + 1);
            // Format for datetime-local is YYYY-MM-DDThh:mm
            const offset = now.getTimezoneOffset();
            const localNow = new Date(now.getTime() - (offset*60*1000));
            formData.append("time", localNow.toISOString().slice(0,16));
        }
      }

      const res = await fetch(`${API_BASE}/broadcasts`, {
        method: "POST",
        headers: { 
          "Bypass-Tunnel-Reminder": "true"
        },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Gagal membuat broadcast");
      }
      alert(isRecurring ? "Broadcast berulang berhasil diaktifkan!" : (isScheduled ? "Broadcast berhasil dijadwalkan!" : "Broadcast sedang dikirim di latar belakang!"));
      // Reset form (except target for quick reuse)
      setMessage("");
      setMediaFiles([]);
      setIsScheduled(false);
      setScheduleTime("");
      setIsRecurring(false);
      fetchBroadcasts();
    } catch (err) {
      alert("Error: " + (err instanceof Error ? err.message : "Pastikan Local Server port 5000 aktif"));
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelBroadcast = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin membatalkan jadwal broadcast ini?")) return;

    try {
      const res = await fetch(`${API_BASE}/broadcasts/${id}`, {
        method: "DELETE",
        headers: { "Bypass-Tunnel-Reminder": "true" }
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Gagal membatalkan");
      }
      alert("Jadwal broadcast berhasil dibatalkan!");
      fetchBroadcasts();
    } catch (err) {
      alert("Gagal membatalkan: " + (err instanceof Error ? err.message : "Error"));
    }
  };

  // Filter broadcasts
  const activeSchedules = broadcasts.filter((b) => b.status === "pending");
  const historyBroadcasts = broadcasts.filter((b) => b.status !== "pending");

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">WhatsApp Broadcast Automation</h1>
          <p className="text-foreground/50">Kirim dan jadwalkan pesan promosi ke grup dan kontak secara persisten.</p>
        </div>

        {/* WhatsApp Bot Connection Widget */}
        <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[1.5rem] p-4 shadow-xl relative overflow-hidden group hover:bg-white/10 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className={`w-3 h-3 rounded-full ${isConnected === true ? "bg-green-500 animate-pulse" : isConnected === false ? "bg-red-500" : "bg-yellow-500"}`} />
              <span className="text-xs font-bold uppercase tracking-wider">
                {isConnected === true ? "WhatsApp Connected" : isConnected === false ? "WhatsApp Disconnected" : "Checking Status..."}
              </span>
            </div>
            <p className="text-[10px] text-foreground/40 mt-0.5">Native WhatsApp Gateway</p>
          </div>
          <button
            onClick={handleReconnect}
            disabled={checkingStatus}
            className="p-2 bg-foreground/5 hover:bg-foreground/10 text-foreground rounded-xl transition-all disabled:opacity-50"
            title="Refresh & Reconnect WhatsApp"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={checkingStatus ? "animate-spin" : ""}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M16 3h5v5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 21H3v-5"/></svg>
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Broadcast Sender Form */}
        <div className="lg:col-span-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl h-fit relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-accent/10 text-accent rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
            </div>
            <h2 className="text-xl font-bold">New Broadcast</h2>
          </div>

          <form onSubmit={handleCreateBroadcast} className="space-y-6">
            <div>
              <label className="text-xs font-bold text-foreground/50 uppercase">Pilih Pengirim</label>
              <select
                value={senderAccount}
                onChange={(e) => setSenderAccount(e.target.value)}
                className="w-full bg-black/20 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-accent/50 outline-none appearance-none transition-all hover:bg-black/30"
              >
                {senders.length === 0 && <option value="default">Default Sender</option>}
                {senders.map(s => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </div>
            
            {/* WhatsApp Connection Status & QR */}
            <div className="bg-black/20 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden shadow-lg relative group transition-all hover:border-white/20">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600 z-10"></div>
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold">Hubungkan Perangkat Baru</h2>
                      <p className="text-sm text-foreground/50">Tautkan akun WhatsApp tambahan.</p>
                    </div>
                  </div>

                  {isConnected && !checkingStatus ? (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      </div>
                      <h3 className="text-xl font-bold text-green-500 mb-2">WhatsApp Terhubung!</h3>
                      <p className="text-sm text-foreground/60 max-w-[200px]">Anda sudah dapat mengirim broadcast.</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full min-h-[300px]">
                      
                      {/* Pairing Method Tabs */}
                      <div className="flex p-1 bg-foreground/5 rounded-xl w-full mb-6 relative z-10">
                        <button 
                          onClick={() => setPairingMethod("qr")}
                          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${pairingMethod === "qr" ? "bg-background shadow text-foreground" : "text-foreground/50 hover:text-foreground"}`}
                        >
                          Scan QR Code
                        </button>
                        <button 
                          onClick={() => setPairingMethod("code")}
                          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${pairingMethod === "code" ? "bg-background shadow text-foreground" : "text-foreground/50 hover:text-foreground"}`}
                        >
                          Gunakan Kode (Jarak Jauh)
                        </button>
                      </div>

                      {pairingMethod === "qr" ? (
                        /* QR CODE MODE */
                        qrCode ? (
                          <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                            <div className="bg-white p-3 rounded-2xl relative">
                              <img src={qrCode} alt="WhatsApp QR Code" className="w-[200px] h-[200px]" />
                            </div>
                            <p className="text-center text-xs text-foreground/50 mt-4 animate-pulse">Scan QR melalui aplikasi WhatsApp</p>
                            <p className="text-center text-[10px] text-blue-500/70 mt-1">QR ini otomatis diperbarui setiap 3 detik</p>
                          </div>
                        ) : (
                          <div className="w-[200px] h-[200px] border-2 border-dashed border-sidebar-border rounded-3xl flex flex-col items-center justify-center p-6 text-center animate-pulse">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/30 mb-4"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                            <span className="text-sm font-medium text-foreground/50">Memuat QR Code...</span>
                          </div>
                        )
                      ) : (
                        /* PAIRING CODE MODE */
                        <div className="w-full">
                          {pairingCode ? (
                            <div className="flex flex-col items-center justify-center text-center">
                              <p className="text-sm text-foreground/60 mb-4">Masukkan kode ini di WhatsApp Anda:</p>
                              <div className="text-4xl font-mono font-bold tracking-[0.25em] bg-foreground/5 p-6 rounded-2xl border border-sidebar-border shadow-inner text-blue-500">
                                {pairingCode}
                              </div>
                              <p className="text-xs text-foreground/40 mt-6 max-w-[250px]">
                                Buka WhatsApp &gt; Perangkat Tertaut &gt; Tautkan Perangkat &gt; Tautkan dengan Nomor Telepon Saja.
                              </p>
                            </div>
                          ) : (
                            <form onSubmit={handleRequestPairingCode} className="flex flex-col space-y-4">
                              <div>
                                <label className="text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-2 block">Nomor WhatsApp HP Anda</label>
                                <input
                                  type="text"
                                  placeholder="Contoh: 628123456789"
                                  value={pairingPhone}
                                  onChange={(e) => setPairingPhone(e.target.value)}
                                  className="w-full bg-background border border-sidebar-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-mono"
                                  required
                                />
                                <p className="text-[10px] text-foreground/40 mt-1">Gunakan kode negara (misal 62) tanpa tanda plus (+).</p>
                              </div>
                              <button
                                type="submit"
                                disabled={requestingPairCode}
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/20"
                              >
                                {requestingPairCode ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                                ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                )}
                                <span>{requestingPairCode ? "Meminta Kode..." : "Dapatkan Kode Tautan"}</span>
                              </button>
                            </form>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

            <div>
              <label className="text-xs font-bold text-foreground/50 uppercase">Nomor Tujuan / ID Grup</label>
              <input
                required
                type="text"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="contoh: 120363401263735503@g.us"
                className="w-full bg-black/20 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-accent/50 outline-none transition-all hover:bg-black/30"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-foreground/50 uppercase">Isi Pesan</label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tulis pesan broadcast di sini... (Mendukung markdown WhatsApp seperti *tebal* atau _miring_)"
                rows={5}
                className="w-full bg-black/20 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-accent/50 outline-none resize-none transition-all hover:bg-black/30"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-foreground/50 uppercase">Gambar / Media (Opsional)</label>
              <div className="mt-1 flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-xl cursor-pointer bg-black/20 backdrop-blur-md hover:bg-black/40 hover:border-white/40 transition-all duration-300">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                    <svg className="w-8 h-8 mb-3 text-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <p className="mb-2 text-sm text-foreground/70"><span className="font-semibold">Klik untuk upload</span> atau drag and drop</p>
                    <p className="text-xs text-foreground/50">
                      {mediaFiles.length > 0 
                        ? `${mediaFiles.length} file terpilih (${mediaFiles.map(f => f.name).join(", ")})`
                        : "PNG, JPG, MP4, PDF, DOCX (Bisa pilih banyak)"}
                    </p>
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    multiple
                    onChange={(e) => {
                      if (e.target.files) {
                        setMediaFiles(Array.from(e.target.files));
                      }
                    }} 
                  />
                </label>
              </div>
              {mediaFiles.length > 0 && (
                <button 
                  type="button" 
                  onClick={() => setMediaFiles([])}
                  className="text-xs text-red-500 mt-2 font-bold hover:underline"
                >
                  Hapus Pilihan ({mediaFiles.length} file)
                </button>
              )}
            </div>

            {/* Toggle Schedule */}
            <div className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-all cursor-pointer" onClick={() => setIsScheduled(!isScheduled)}>
              <div className="flex flex-col">
                <span className="text-sm font-bold">Jadwalkan Broadcast</span>
                <span className="text-xs text-foreground/40">Kirim di waktu mendatang</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isScheduled}
                  onChange={(e) => setIsScheduled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-foreground/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
              </label>
            </div>

            {/* Toggle Recurring */}
            <div className="flex items-center justify-between p-4 bg-blue-500/[0.05] border border-blue-500/20 rounded-2xl">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-blue-500">Kirim Berulang (Spam)</span>
                <span className="text-xs text-blue-500/60">Pesan akan dikirim berkala tanpa henti</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isRecurring}
                  onChange={(e) => setIsRecurring(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-blue-500/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>

            {isRecurring && (
              <div className="animate-in slide-in-from-top-2 duration-200">
                <label className="text-xs font-bold text-blue-500 uppercase">Jeda Waktu (Menit)</label>
                <input
                  required={isRecurring}
                  type="number"
                  min="1"
                  value={intervalMinutes}
                  onChange={(e) => setIntervalMinutes(parseInt(e.target.value))}
                  className="w-full bg-blue-500/5 border border-blue-500/30 rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-blue-500/50 outline-none"
                />
              </div>
            )}

            {isScheduled && (
              <div className="animate-in slide-in-from-top-2 duration-200">
                <label className="text-xs font-bold text-foreground/50 uppercase">Pilih Tanggal & Waktu Mulai</label>
                <input
                  required={isScheduled}
                  type="datetime-local"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="w-full bg-foreground/5 border border-sidebar-border rounded-xl px-4 py-3 mt-1 focus:ring-2 focus:ring-accent/50 outline-none"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-2xl font-black text-lg shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 border border-white/20 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
              <span className="relative z-10 flex items-center space-x-2">
              {submitting ? (
                <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <span>{isRecurring ? "Mulai Spam Berulang" : (isScheduled ? "Jadwalkan Broadcast" : "Kirim Sekarang")}</span>
              )}
              </span>
            </button>
          </form>
        </div>

        {/* Active Schedules List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-bl from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-500/10 text-yellow-500 rounded-xl flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold">Jadwal Broadcast Aktif</h2>
                  <p className="text-xs text-foreground/50">Broadcast tertunda yang akan dikirim secara otomatis.</p>
                </div>
              </div>
              <span className="bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full text-xs font-black">
                {activeSchedules.length} Scheduled
              </span>
            </div>

            {activeSchedules.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-sidebar-border rounded-2xl">
                <p className="text-sm text-foreground/40">Tidak ada jadwal broadcast aktif.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeSchedules.map((item) => (
                  <div key={item.id} className="p-6 border border-white/10 bg-black/20 backdrop-blur-md rounded-2xl flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl hover:border-white/20 transition-all duration-300 relative group/card">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity rounded-2xl pointer-events-none"></div>
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          item.type === "recurring" ? "text-blue-500 bg-blue-500/10" : "text-accent bg-accent/10"
                        }`}>
                          {item.type === "recurring" ? "Recurring" : "Scheduled"}
                        </span>
                        <span className="text-xs text-foreground/40">
                          {new Date(item.time || "").toLocaleString("id-ID")}
                        </span>
                      </div>
                      {item.type === "recurring" && (
                        <p className="text-[10px] font-bold text-blue-500 mb-2">
                          🔄 Berulang setiap {item.intervalMinutes} menit
                        </p>
                      )}
                      <p className="text-[10px] font-bold text-foreground/50 mb-1">Dari: {item.senderAccount || "default"}</p>
                      <p className="text-xs font-bold text-foreground/80 mb-1">Ke: {item.target}</p>
                      <p className="text-sm text-foreground/70 line-clamp-3 italic mb-4">"{item.message}"</p>
                      {item.media && (
                        <p className="text-[10px] text-foreground/40 truncate mb-4">
                          Media: {Array.isArray(item.media) 
                            ? item.media.map(m => m.split(/[\\/]/).pop()).join(", ")
                            : item.media.split(/[\\/]/).pop()}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleCancelBroadcast(item.id)}
                      className={`w-full text-xs py-2 rounded-xl font-bold transition-all ${
                        item.type === "recurring" 
                          ? "bg-red-500/20 hover:bg-red-500/30 text-red-500 shadow-sm shadow-red-500/20" 
                          : "bg-red-500/10 hover:bg-red-500/20 text-red-500"
                      }`}
                    >
                      {item.type === "recurring" ? "Hentikan Looping" : "Batalkan Jadwal"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Broadcast History logs */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="relative z-10 flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500/10 text-green-500 rounded-xl flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold">Riwayat & Log Broadcast</h2>
                  <p className="text-xs text-foreground/50">Rekam jejak seluruh eksekusi broadcast WhatsApp.</p>
                </div>
              </div>
            </div>

            {historyBroadcasts.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-sidebar-border rounded-2xl">
                <p className="text-sm text-foreground/40">Belum ada riwayat broadcast.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-sidebar-border text-foreground/40 text-xs font-bold uppercase">
                      <th className="pb-3">Waktu dibuat</th>
                      <th className="pb-3">Tipe</th>
                      <th className="pb-3">Dari (Pengirim)</th>
                      <th className="pb-3">Tujuan</th>
                      <th className="pb-3">Pesan</th>
                      <th className="pb-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {historyBroadcasts.map((item) => (
                      <tr key={item.id} className="hover:bg-white/5 transition-colors duration-200">
                        <td className="py-4 text-xs text-foreground/50">
                          {new Date(item.createdAt).toLocaleString("id-ID")}
                        </td>
                        <td className="py-4 text-xs font-bold uppercase">
                          {item.type}
                        </td>
                        <td className="py-4 text-xs font-bold text-foreground/80 max-w-[120px] truncate">
                          {item.senderAccount || "default"}
                        </td>
                        <td className="py-4 text-xs font-bold text-foreground/80 max-w-[120px] truncate">
                          {item.target}
                        </td>
                        <td className="py-4 text-xs text-foreground/75 max-w-[200px] truncate" title={item.message}>
                          {item.message}
                        </td>
                        <td className="py-4 text-right">
                          <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                            item.status === "sent" ? "bg-green-500/10 text-green-500" :
                            item.status === "failed" ? "bg-red-500/10 text-red-500" :
                            item.status === "cancelled" ? "bg-foreground/10 text-foreground/60" :
                            "bg-yellow-500/10 text-yellow-500 animate-pulse"
                          }`}>
                            {item.status}
                          </span>
                          {item.error && (
                            <p className="text-[9px] text-red-400 mt-1 text-right max-w-[150px] truncate ml-auto" title={item.error}>
                              {item.error}
                            </p>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
