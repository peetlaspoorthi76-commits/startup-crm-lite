export default function RecentLeads({ leads }) {
const recent = leads.slice(0, 5);

return (
<div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Recent Leads</h3>
    <div className="overflow-x-auto">
    <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
        <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
        <tr>
            <th className="px-4 py-3 font-medium rounded-tl-lg">Name</th>
            <th className="px-4 py-3 font-medium">Company</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium rounded-tr-lg">Date Added</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
        {recent.map((lead, i) => (
            <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{lead.name}</td>
            <td className="px-4 py-3">{lead.company}</td>
            <td className="px-4 py-3">
                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-xs font-medium">
                {lead.status}
                </span>
            </td>
            <td className="px-4 py-3">{lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'N/A'}</td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
</div>
);
}