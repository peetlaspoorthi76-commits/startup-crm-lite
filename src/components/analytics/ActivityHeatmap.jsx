export default function ActivityHeatmap({ data = [] }) {
  const safeData = Array.isArray(data) ? data : [];
  const totalActivities = safeData.reduce((sum, item) => sum + (item.count || 0), 0);

  return (
    <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm flex flex-col h-full min-h-[280px]">
      <h3 className="text-lg font-bold text-foreground mb-1">Daily Sales Activity Grid</h3>
      <p className="text-xs text-muted mb-6">New leads registered over the last 30 days.</p>

      <div className="flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-10 gap-2 mx-auto">
          {safeData.map((item, i) => (
            <div
              key={i}
              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-md border border-border ${
                item.intensity === 0
                  ? 'bg-background'
                  : item.intensity === 1
                    ? 'bg-primary/25'
                    : item.intensity === 2
                      ? 'bg-primary/55'
                      : 'bg-primary'
              }`}
              title={`${item.count || 0} new leads on day ${item.day}`}
            />
          ))}
        </div>

        <div className="flex justify-between items-center mt-8 text-[10px] sm:text-xs text-muted">
          <div className="flex items-center gap-1 sm:gap-2">
            <span>Less</span>
            <div className="w-3 h-3 rounded-sm bg-background border border-border" />
            <div className="w-3 h-3 rounded-sm bg-primary/25 border border-border" />
            <div className="w-3 h-3 rounded-sm bg-primary/55 border border-border" />
            <div className="w-3 h-3 rounded-sm bg-primary border border-border" />
            <span>More</span>
          </div>
          <span>Total New Leads: {totalActivities}</span>
        </div>
      </div>
    </div>
  );
}
