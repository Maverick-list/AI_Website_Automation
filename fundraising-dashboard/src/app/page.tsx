export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-foreground/50 mt-2 text-lg">Welcome back, John. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Fundraising", value: "$42,500", change: "+12.5%", color: "text-green-500" },
          { label: "Active Campaigns", value: "12", change: "+2", color: "text-blue-500" },
          { label: "Pending Orders", value: "8", change: "-3", color: "text-orange-500" },
          { label: "AI Suggestions", value: "4 New", change: "Action Required", color: "text-purple-500" },
        ].map((stat, i) => (
          <div key={i} className="bg-card border border-sidebar-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <p className="text-sm text-foreground/50 font-medium">{stat.label}</p>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
            <p className={`text-xs mt-1 font-semibold ${stat.color}`}>{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-card border border-sidebar-border rounded-2xl p-6 shadow-sm min-h-[400px] flex flex-col justify-center items-center text-center">
          <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-4 text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
          </div>
          <h3 className="text-xl font-bold">Fundraising Performance</h3>
          <p className="text-foreground/50 max-w-sm">Charts and detailed analytics will appear here once you have active campaigns.</p>
        </div>

        <div className="bg-card border border-sidebar-border rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-4">Upcoming Meetings</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((m) => (
              <div key={m} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-foreground/5 transition-colors cursor-pointer border border-transparent hover:border-sidebar-border">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex flex-col items-center justify-center text-accent">
                  <span className="text-[10px] uppercase font-bold">May</span>
                  <span className="text-sm font-bold">0{m + 7}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold">Investor Sync #{m}</p>
                  <p className="text-xs text-foreground/50">10:00 AM - Zoom</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm font-semibold text-accent border border-accent/20 rounded-lg hover:bg-accent/5 transition-colors">
            View Calendar
          </button>
        </div>
      </div>
    </div>
  );
}
