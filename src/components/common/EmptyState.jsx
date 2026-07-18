import { SearchX } from 'lucide-react';

export default function EmptyState({ onClear }) {
return (
<div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-slate-200 border-dashed">
    <div className="p-4 bg-slate-50 rounded-full mb-4">
    <SearchX size={32} className="text-slate-400" />
    </div>
    <h3 className="text-lg font-bold text-slate-900 mb-1">No leads found</h3>
    <p className="text-slate-500 mb-4 text-center max-w-sm">
    We couldn't find any leads matching your current search and filter settings.
    </p>
    <button
    onClick={onClear}
    className="px-4 py-2 text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors"
    >
    Clear all filters
    </button>
</div>
);
}