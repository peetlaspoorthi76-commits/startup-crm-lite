import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function BarChartCard({ data }) {
return (
<div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col h-[400px]">
    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Monthly Leads Trend</h3>
    <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Number of new opportunities registered monthly.</p>

    <div className="flex-1">
    <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
        <Tooltip
            cursor={{ fill: '#334155', opacity: 0.1 }}
            contentStyle={{ backgroundColor: '#0F172A', border: 'none', borderRadius: '8px', color: '#fff' }}
        />
        <Bar dataKey="leads" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={32} />
        </BarChart>
    </ResponsiveContainer>
    </div>
</div>
);
}