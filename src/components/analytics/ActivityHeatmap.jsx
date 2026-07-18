export default function ActivityHeatmap({ data }) {
  return (
    <div className="bg-[#1E293B] p-6 rounded-2xl border border-slate-700 shadow-sm flex flex-col h-full min-h-[280px]">
      <h3 className="text-lg font-bold text-white mb-1">Daily Sales Activity Grid</h3>
      <p className="text-xs text-slate-400 mb-6">Visual correlation grid showing sales team activity throughout the last 30 days.</p>

      <div className="flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-10 gap-2 mx-auto">
          {data.map((item, i) => (
            <div
              key={i}
              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-md border border-slate-700 ${
                item.intensity === 0 ? 'bg-slate-800' :
                item.intensity === 1 ? 'bg-emerald-900/40' :
                item.intensity === 2 ? 'bg-emerald-600/70' : 'bg-emerald-500'
              }`}
              title={`${item.intensity} activities on day ${item.day}`}
            />
          ))}
        </div>

        <div className="flex justify-between items-center mt-8 text-[10px] sm:text-xs text-slate-500">
          <div className="flex items-center gap-1 sm:gap-2">
            <span>Less</span>
            <div className="w-3 h-3 rounded-sm bg-slate-800 border border-slate-700"></div>
            <div className="w-3 h-3 rounded-sm bg-emerald-900/40 border border-slate-700"></div>
            <div className="w-3 h-3 rounded-sm bg-emerald-600/70 border border-slate-700"></div>
            <div className="w-3 h-3 rounded-sm bg-emerald-500 border border-slate-700"></div>
            <span>More</span>
          </div>
          <span>Total Activities: 45 | Touchpoints</span>
        </div>
      </div>
    </div>
  );
}