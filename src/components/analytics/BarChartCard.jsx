import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function BarChartCard({ data = [] }) {
  const safeData = Array.isArray(data) ? data : [];

  return (
    <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex flex-col h-[400px]">
      <h3 className="text-lg font-bold text-foreground mb-1">Monthly Leads Trend</h3>
      <p className="text-xs text-muted mb-6">Number of new opportunities registered monthly.</p>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={safeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--chart-grid)" opacity={0.5} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} />
            <Tooltip
              cursor={{ fill: 'var(--chart-grid)', opacity: 0.2 }}
              contentStyle={{
                backgroundColor: 'var(--chart-tooltip-bg)',
                border: '1px solid var(--chart-tooltip-border)',
                borderRadius: '8px',
                color: 'var(--chart-tooltip-text)',
              }}
            />
            <Bar dataKey="leads" fill="var(--primary)" radius={[4, 4, 0, 0]} barSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
