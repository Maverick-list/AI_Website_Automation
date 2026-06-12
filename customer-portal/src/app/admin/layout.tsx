import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      {/* Admin Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 p-8 ml-64">
        {children}
      </main>
    </div>
  );
}
