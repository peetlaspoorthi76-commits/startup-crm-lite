import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { SOURCE_COLORS } from '../../utils/analyticsHelpers';

export default function LeadSourceChart({ data = [] }) {
  const safeData = Array.isArray(data) ? data : [];

  if (safeData.length === 0) {
    return (
      <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm flex flex-col h-[400px] items-center justify-center">
        <h3 className="text-lg font-bold text-foreground mb-1">Lead Source Analytics</h3>
        <p className="text-sm text-muted">No source data available yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all flex flex-col h-[400px]">
      <h3 className="text-lg font-bold text-foreground mb-1">Lead Source Analytics</h3>
      <p className="text-xs text-muted mb-6">
        Breakdown of opportunities by original lead generation channel.
      </p>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={safeData} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--chart-grid)" opacity={0.5} />
            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--muted)', fontSize: 12 }}
              width={80}
            />
            <Tooltip
              cursor={{ fill: 'var(--chart-grid)', opacity: 0.2 }}
              contentStyle={{
                backgroundColor: 'var(--chart-tooltip-bg)',
                border: 'none',
                borderRadius: '8px',
                color: 'var(--chart-tooltip-text)',
              }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={16}>
              {safeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill || SOURCE_COLORS[index % SOURCE_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
