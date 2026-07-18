import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function PieChartCard({ data, total }) {
  return (
    <div className="bg-[#1E293B] p-6 rounded-2xl border border-slate-700 shadow-sm flex flex-col h-[400px]">
      <h3 className="text-lg font-bold text-white mb-1">Lead Status Distribution</h3>
      <p className="text-xs text-slate-400 mb-4">Proportional breakdown of opportunities.</p>

      <div className="flex-1 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#0F172A', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#94A3B8' }} />
          </PieChart>
        </ResponsiveContainer>
        {/* Center Text overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
          <span className="text-3xl font-bold text-white">{total}</span>
          <span className="text-[10px] uppercase tracking-wider text-slate-400">Total Leads</span>
        </div>
      </div>
    </div>
  );
}