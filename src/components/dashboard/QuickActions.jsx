import { Plus, List, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function QuickActions() {
  return (
    <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex flex-col gap-3 transition-colors">
      <h3 className="text-lg font-bold text-foreground mb-2">Quick Actions</h3>
      <Link
        to="/leads"
        className="flex items-center justify-center gap-2 w-full py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium"
      >
        <Plus size={18} /> Add New Lead
      </Link>
      <Link
        to="/leads"
        className="flex items-center justify-center gap-2 w-full py-2 bg-background text-foreground rounded-lg hover:bg-surface-hover transition-colors font-medium border border-border"
      >
        <List size={18} /> View All Leads
      </Link>
      <button className="flex items-center justify-center gap-2 w-full py-2 bg-background text-foreground rounded-lg hover:bg-surface-hover transition-colors font-medium border border-border">
        <Download size={18} /> Export Data
      </button>
    </div>
  );
}
