export default function StatsCard({ title, value, icon: Icon, change, colorClass }) {
  const isPositive = change >= 0;

  return (
    <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex flex-col transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10 dark:bg-opacity-20`}>
          <Icon className={colorClass} size={24} />
        </div>
        <span
          className={`text-sm font-medium px-2 py-1 rounded-full ${
            isPositive
              ? 'bg-secondary/20 text-secondary'
              : 'bg-accent/20 text-accent'
          }`}
        >
          {isPositive ? '+' : ''}
          {change}%
        </span>
      </div>
      <h3 className="text-muted text-sm font-medium">{title}</h3>
      <p className="text-3xl font-bold text-foreground mt-1">{value}</p>
    </div>
  );
}
