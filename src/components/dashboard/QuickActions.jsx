import { Plus, List, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function QuickActions() {
return (
<div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col gap-3 transition-colors">
    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Quick Actions</h3>
    <Link to="/leads" className="flex items-center justify-center gap-2 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
    <Plus size={18} /> Add New Lead
    </Link>
    <Link to="/leads" className="flex items-center justify-center gap-2 w-full py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-medium">
    <List size={18} /> View All Leads
    </Link>
    <button className="flex items-center justify-center gap-2 w-full py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-medium">
    <Download size={18} /> Export Data
    </button>
</div>
);
}