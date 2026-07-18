import { Pencil, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function LeadTable({ leads, onEdit, onDelete }) {
return (
<div className="bg-white dark:bg-[#1E293B] rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-x-auto transition-colors">
    <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
    <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
        <tr>
        <th className="px-6 py-4 font-medium rounded-tl-lg">Name</th>
        <th className="px-6 py-4 font-medium">Company</th>
        <th className="px-6 py-4 font-medium">Contact</th>
        <th className="px-6 py-4 font-medium">Source</th>
        <th className="px-6 py-4 font-medium">Status</th>
        <th className="px-6 py-4 font-medium text-right rounded-tr-lg">Actions</th>
        </tr>
    </thead>
    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
        {leads.map((lead) => (
        <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{lead.name}</td>
            <td className="px-6 py-4">{lead.company}</td>
            <td className="px-6 py-4">
            <div className="flex flex-col">
                <span className="dark:text-slate-300">{lead.email}</span>
                <span className="text-xs text-slate-400 dark:text-slate-500">{lead.phone}</span>
            </div>
            </td>
            <td className="px-6 py-4">{lead.source}</td>
            <td className="px-6 py-4"><StatusBadge status={lead.status} /></td>
            <td className="px-6 py-4">
            <div className="flex justify-end gap-2">
                <button onClick={() => onEdit(lead)} className="p-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800">
                <Pencil size={18} />
                </button>
                <button onClick={() => onDelete(lead.id)} className="p-2 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-slate-800">
                <Trash2 size={18} />
                </button>
            </div>
            </td>
        </tr>
        ))}
    </tbody>
    </table>
</div>
);
}