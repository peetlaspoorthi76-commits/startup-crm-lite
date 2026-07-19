import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function PieChartCard({ data = [], total = 0 }) {
  const safeData = Array.isArray(data) ? data : [];
  const safeTotal = Number.isFinite(total) ? total : 0;

  if (safeData.length === 0) {
    return (
      <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm flex flex-col h-[400px] items-center justify-center">
        <h3 className="text-lg font-bold text-foreground mb-1">Lead Status Distribution</h3>
        <p className="text-sm text-muted">No leads available to display status breakdown.</p>
      </div>
    );
  }

  return (
    <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm flex flex-col h-[400px]">
      <h3 className="text-lg font-bold text-foreground mb-1">Lead Status Distribution</h3>
      <p className="text-xs text-muted mb-4">Proportional breakdown of opportunities.</p>

      <div className="flex-1 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={safeData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {safeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--chart-tooltip-bg)',
                border: '1px solid var(--chart-tooltip-border)',
                borderRadius: '8px',
                color: 'var(--chart-tooltip-text)',
              }}
              itemStyle={{ color: 'var(--chart-tooltip-text)' }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: '12px', color: 'var(--muted)' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
          <span className="text-3xl font-bold text-foreground">{safeTotal}</span>
          <span className="text-[10px] uppercase tracking-wider text-muted">Total Leads</span>
        </div>
      </div>
    </div>
  );
}
