export default function PipelineOverview({ leads }) {
const total = leads.length || 1;
const newLeads = leads.filter(l => l.status === 'New').length;
const wonLeads = leads.filter(l => l.status === 'Won').length;
const lostLeads = leads.filter(l => l.status === 'Lost').length;

return (
<div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm mt-6 transition-colors">
    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Pipeline Overview</h3>
    <div className="flex h-4 rounded-full overflow-hidden mb-4 bg-slate-100 dark:bg-slate-800">
    <div style={{ width: `${(newLeads / total) * 100}%` }} className="bg-blue-500"></div>
    <div style={{ width: `${(wonLeads / total) * 100}%` }} className="bg-green-500"></div>
    <div style={{ width: `${(lostLeads / total) * 100}%` }} className="bg-red-500"></div>
    <div style={{ width: `${((total - newLeads - wonLeads - lostLeads) / total) * 100}%` }} className="bg-slate-300 dark:bg-slate-600"></div>
    </div>
    <div className="flex gap-4 text-sm text-slate-600 dark:text-slate-400">
    <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-500"></span> New</div>
    <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-500"></span> Won</div>
    <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500"></span> Lost</div>
    <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600"></span> Other</div>
    </div>
</div>
);
}