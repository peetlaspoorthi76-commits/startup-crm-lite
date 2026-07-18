import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function LineChartCard({ data }) {
return (
<div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col h-[400px]">
    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Monthly Conversion Trend</h3>
    <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Ratio of won opportunities over total registered.</p>

    <div className="flex-1">
    <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} tickFormatter={(val) => `${val}%`} />
        <Tooltip
            contentStyle={{ backgroundColor: '#0F172A', border: 'none', borderRadius: '8px', color: '#fff' }}
            formatter={(value) => [`${value}%`, 'Conversion Rate']}
        />
        <Line
            type="monotone"
            dataKey="rate"
            stroke="#22C55E"
            strokeWidth={3}
            dot={{ r: 4, fill: '#22C55E', strokeWidth: 0 }}
            activeDot={{ r: 6, fill: '#fff', stroke: '#22C55E', strokeWidth: 2 }}
        />
        </LineChart>
    </ResponsiveContainer>
    </div>
</div>
);
}