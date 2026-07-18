export default function FunnelChartCard({ data }) {
  if (!data || data.length === 0) return null;

  // The first stage (New) is our 100% baseline
  const maxLeads = data[0].value || 1;

  return (
    <div className="bg-[#1E293B] p-6 rounded-2xl border border-slate-700 shadow-sm flex flex-col h-[400px]">
      <h3 className="text-lg font-bold text-white mb-1">Sales Conversion Funnel</h3>
      <p className="text-xs text-slate-400 mb-8">Track stages conversion efficiency and funnel leakage.</p>

      <div className="flex-1 flex flex-col items-center justify-start w-full max-w-[280px] mx-auto pt-2">
        <div
          className="w-full h-[220px] flex flex-col gap-[2px]"
          style={{ clipPath: 'polygon(0% 0%, 100% 0%, 65% 80%, 65% 100%, 35% 100%, 35% 80%)' }}
        >
          {data.map((stage, index) => {
            const percentage = Math.round((stage.value / maxLeads) * 100);
            return (
              <div
                key={stage.name}
                className="w-full flex-1 flex items-center justify-center text-white text-xs font-bold tracking-wide"
                style={{ backgroundColor: stage.fill }}
              >
                {stage.name} ({percentage}%)
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}