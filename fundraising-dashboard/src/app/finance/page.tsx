import { getDB } from "@/lib/db";

export default function FinancePage() {
  const db = getDB();
  const records = [...db.finance].reverse(); // Show latest first
  
  const totalIncome = db.finance
    .filter(r => r.type === "income")
    .reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Finance</h1>
          <p className="text-foreground/50">Laporan pendapatan dan pengeluaran sistem.</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 px-6 py-4 rounded-2xl text-right">
          <p className="text-xs font-bold text-green-500 uppercase">Total Pendapatan</p>
          <p className="text-3xl font-black text-green-600">Rp {totalIncome.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-card border border-sidebar-border rounded-3xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-foreground/5 border-b border-sidebar-border">
              <th className="px-6 py-4 text-xs font-bold uppercase text-foreground/50">Tanggal</th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-foreground/50">Keterangan</th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-foreground/50">Tipe</th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-foreground/50 text-right">Jumlah</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sidebar-border">
            {records.length > 0 ? (
              records.map((record) => (
                <tr key={record.id} className="hover:bg-foreground/[0.02] transition-colors">
                  <td className="px-6 py-4 text-sm font-medium">
                    {new Date(record.date).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {record.description}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-[10px] font-bold uppercase rounded bg-green-500/10 text-green-600 border border-green-500/20">
                      {record.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-right">
                    Rp {record.amount.toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-20 text-center text-foreground/40 italic">
                  Belum ada transaksi tercatat.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
