export default function ForecastCard() {
  return (
    <div className="bg-[#1E293B] p-6 rounded-2xl border border-slate-700 shadow-sm flex flex-col h-full min-h-[280px] justify-between">
      <div>
        <h3 className="text-lg font-bold text-white mb-1">Revenue Growth Forecast</h3>
        <p className="text-xs text-slate-400">Data-driven revenue forecast projected for the upcoming calendar month.</p>
      </div>

      <div className="my-6">
        <p className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-1">Forecasted Revenue Next Month</p>
        <p className="text-3xl font-bold text-white">₹3,24,000</p>
        <p className="text-xs text-slate-500 mt-1">Based on current pipeline progression</p>
      </div>

      <div>
        <div className="flex justify-between text-xs mb-2">
          <span className="text-slate-500">Accuracy & Confidence</span>
          <span className="text-orange-400 font-medium">High Confidence (92%)</span>
        </div>
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <div className="w-[92%] h-full bg-orange-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}