import { Trophy } from 'lucide-react';

export default function TopPerformersCard({ data }) {
  return (
    <div className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex flex-col h-[400px]">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Top Performers</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Ranking sales representatives by closed won deals revenue.</p>

      <div className="flex-1 flex flex-col gap-4">
        {data && data.length > 0 ? (
          data.map((rep, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  index === 0 ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30' :
                  index === 1 ? 'bg-slate-200 text-slate-600 dark:bg-slate-700' :
                  'bg-orange-100 text-orange-600 dark:bg-orange-900/30'
                }`}>
                  {index === 0 ? <Trophy size={16} /> : index + 1}
                </div>
                <span className="font-medium text-slate-900 dark:text-white">{rep.name}</span>
              </div>
              <span className="font-bold text-slate-900 dark:text-white">₹{rep.revenue.toLocaleString()}</span>
            </div>
          ))
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-500 dark:text-slate-400 text-sm">
            No won deals yet to rank performers.
          </div>
        )}
      </div>
    </div>
  );
}