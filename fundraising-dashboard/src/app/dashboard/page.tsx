"use client";

import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
};

const financeData = [
  { month: 'Jan', revenue: 4000, expenses: 2400 },
  { month: 'Feb', revenue: 3000, expenses: 1398 },
  { month: 'Mar', revenue: 2000, expenses: 9800 },
  { month: 'Apr', revenue: 2780, expenses: 3908 },
  { month: 'May', revenue: 1890, expenses: 4800 },
  { month: 'Jun', revenue: 2390, expenses: 3800 },
  { month: 'Jul', revenue: 3490, expenses: 4300 },
];

const marketData = [
  { name: '18-24', value: 400 },
  { name: '25-34', value: 300 },
  { name: '35-44', value: 300 },
  { name: '45+', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const productData = [
  { name: 'Pro Plan', sales: 4000 },
  { name: 'Basic Plan', sales: 3000 },
  { name: 'Enterprise', sales: 2000 },
  { name: 'API Addon', sales: 2780 },
];

export default function Dashboard() {
  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="p-8 max-w-7xl mx-auto space-y-8 font-sans"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Analytics Dashboard
        </h1>
        <p className="text-foreground/60 mt-2">Comprehensive overview of your business metrics.</p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="bg-sidebar border border-sidebar-border p-6 rounded-xl shadow-lg transition-colors hover:border-cyan-500/30">
          <h3 className="text-foreground/60 text-sm font-medium">Total Revenue</h3>
          <p className="text-3xl font-bold text-white mt-2">$24,500</p>
          <p className="text-emerald-400 text-sm mt-2">↑ 12% from last month</p>
        </motion.div>
        <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="bg-sidebar border border-sidebar-border p-6 rounded-xl shadow-lg transition-colors hover:border-cyan-500/30">
          <h3 className="text-foreground/60 text-sm font-medium">Active Subscriptions</h3>
          <p className="text-3xl font-bold text-white mt-2">1,204</p>
          <p className="text-emerald-400 text-sm mt-2">↑ 5% from last month</p>
        </motion.div>
        <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="bg-sidebar border border-sidebar-border p-6 rounded-xl shadow-lg transition-colors hover:border-cyan-500/30">
          <h3 className="text-foreground/60 text-sm font-medium">Conversion Rate</h3>
          <p className="text-3xl font-bold text-white mt-2">3.8%</p>
          <p className="text-red-400 text-sm mt-2">↓ 0.2% from last month</p>
        </motion.div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Finance Analysis */}
        <motion.div variants={itemVariants} className="bg-sidebar border border-sidebar-border p-6 rounded-xl shadow-lg lg:col-span-2 group hover:border-cyan-500/20 transition-colors">
          <h3 className="text-lg font-semibold text-white mb-6">Financial Overview</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={financeData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00C49F" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00C49F" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF8042" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FF8042" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333' }} />
                <Legend />
                <Area type="monotone" dataKey="revenue" stroke="#00C49F" fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="expenses" stroke="#FF8042" fillOpacity={1} fill="url(#colorExp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Product Analysis */}
        <motion.div variants={itemVariants} className="bg-sidebar border border-sidebar-border p-6 rounded-xl shadow-lg group hover:border-cyan-500/20 transition-colors">
          <h3 className="text-lg font-semibold text-white mb-6">Product Performance</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333' }} />
                <Bar dataKey="sales" fill="#0088FE" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Market Analysis */}
        <motion.div variants={itemVariants} className="bg-sidebar border border-sidebar-border p-6 rounded-xl shadow-lg group hover:border-cyan-500/20 transition-colors">
          <h3 className="text-lg font-semibold text-white mb-6">Market Demographics</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={marketData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {marketData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
