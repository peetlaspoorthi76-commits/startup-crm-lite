import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function LineChartCard({ data = [] }) {
  const safeData = Array.isArray(data) ? data : [];

  return (
    <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex flex-col h-[400px]">
      <h3 className="text-lg font-bold text-foreground mb-1">Monthly Conversion Trend</h3>
      <p className="text-xs text-muted mb-6">Ratio of won opportunities over total registered.</p>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={safeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--chart-grid)" opacity={0.5} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} dy={10} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--muted)', fontSize: 12 }}
              tickFormatter={(val) => `${val}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--chart-tooltip-bg)',
                border: '1px solid var(--chart-tooltip-border)',
                borderRadius: '8px',
                color: 'var(--chart-tooltip-text)',
              }}
              formatter={(value) => [`${value}%`, 'Conversion Rate']}
            />
            <Line
              type="monotone"
              dataKey="rate"
              stroke="var(--secondary)"
              strokeWidth={3}
              dot={{ r: 4, fill: 'var(--secondary)', strokeWidth: 0 }}
              activeDot={{ r: 6, fill: 'var(--foreground)', stroke: 'var(--primary)', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
