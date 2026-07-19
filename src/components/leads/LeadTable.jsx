import { Pencil, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function LeadTable({ leads, onEdit, onDelete }) {
  return (
    <div className="bg-surface rounded-xl border border-border shadow-sm overflow-x-auto transition-colors">
      <table className="w-full text-left text-sm text-muted">
        <thead className="bg-background text-muted border-b border-border">
          <tr>
            <th className="px-6 py-4 font-medium rounded-tl-lg">Name</th>
            <th className="px-6 py-4 font-medium">Company</th>
            <th className="px-6 py-4 font-medium">Contact</th>
            <th className="px-6 py-4 font-medium">Source</th>
            <th className="px-6 py-4 font-medium">Value</th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 font-medium text-right rounded-tr-lg">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-surface-hover transition-colors">
              <td className="px-6 py-4 font-medium text-foreground">{lead.name}</td>
              <td className="px-6 py-4">{lead.company}</td>
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="text-foreground">{lead.email}</span>
                  <span className="text-xs text-muted">{lead.phone}</span>
                </div>
              </td>
              <td className="px-6 py-4">{lead.source}</td>
              <td className="px-6 py-4">₹{lead.value?.toLocaleString() || 0}</td>
              <td className="px-6 py-4">
                <StatusBadge status={lead.status} />
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(lead)}
                    className="p-2 text-muted hover:text-primary transition-colors rounded-lg hover:bg-surface-hover"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(lead.id)}
                    className="p-2 text-muted hover:text-accent transition-colors rounded-lg hover:bg-surface-hover"
                  >
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
