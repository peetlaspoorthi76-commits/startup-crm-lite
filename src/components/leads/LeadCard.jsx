import { Pencil, Trash2, Mail, Phone } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function LeadCard({ lead, onEdit, onDelete }) {
return (
<div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
    <div className="flex justify-between items-start">
    <div>
        <h3 className="font-bold text-slate-900">{lead.name}</h3>
        <p className="text-sm text-slate-500">{lead.company}</p>
    </div>
    <StatusBadge status={lead.status} />
    </div>

    <div className="flex flex-col gap-1 text-sm text-slate-600">
    <div className="flex items-center gap-2"><Mail size={14} /> {lead.email}</div>
    {lead.phone && <div className="flex items-center gap-2"><Phone size={14} /> {lead.phone}</div>}
    </div>

    <div className="flex justify-end gap-2 mt-2 pt-3 border-t border-slate-100">
    <button onClick={() => onEdit(lead)} className="p-2 text-slate-500 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50">
        <Pencil size={18} />
    </button>
    <button onClick={() => onDelete(lead.id)} className="p-2 text-slate-500 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50">
        <Trash2 size={18} />
    </button>
    </div>
</div>
);
}