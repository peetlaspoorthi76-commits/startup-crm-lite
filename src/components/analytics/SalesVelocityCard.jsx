export default function SalesVelocityCard() {
  return (
    <div className="bg-[#1E293B] p-6 rounded-2xl border border-slate-700 shadow-sm flex flex-col h-full min-h-[280px]">
      <h3 className="text-lg font-bold text-white mb-1">Sales Velocity Widget</h3>
      <p className="text-xs text-slate-400 mb-6">Estimated revenue flowing through your sales funnel daily.</p>

      <div className="mb-6">
        <p className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-1">Current Sales Velocity</p>
        <div className="flex items-baseline gap-1">
          <p className="text-3xl font-bold text-white">₹2,686</p>
          <span className="text-slate-500 text-sm">/ day</span>
        </div>
        <p className="text-xs text-slate-500 mt-1">0% change vs previous period</p>
      </div>

      <div className="mt-auto border-t border-slate-700/50 pt-4">
        <p className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-3">Formula Variables</p>
        <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
          <span className="text-slate-400 truncate">Opportunities</span>
          <span className="text-slate-400 truncate">Conversion Win Rate</span>
          <span className="text-slate-400 truncate">Avg Deal Size</span>
          <span className="text-slate-400 truncate">Avg Sales Cycle</span>
        </div>
      </div>
    </div>
  );
}