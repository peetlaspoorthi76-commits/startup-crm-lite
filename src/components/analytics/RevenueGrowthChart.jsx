import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function RevenueGrowthChart({ data }) {
return (
<div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col h-[400px]">
    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Revenue Growth Trend</h3>
    <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Monthly won revenue from closed deals over the last 6 months.</p>

    <div className="flex-1">
    <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
            </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} tickFormatter={(val) => `₹${val/1000}k`} />
        <Tooltip
            contentStyle={{ backgroundColor: '#0F172A', border: 'none', borderRadius: '8px', color: '#fff' }}
            formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
        />
        <Area type="monotone" dataKey="revenue" stroke="#22C55E" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
        </AreaChart>
    </ResponsiveContainer>
    </div>
</div>
);
}