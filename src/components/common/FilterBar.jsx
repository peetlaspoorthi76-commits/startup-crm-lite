const FILTERS = ['All', 'New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'];

export default function FilterBar({ activeFilter, onFilterChange, leads }) {
const getCount = (status) => {
if (status === 'All') return leads.length;
return leads.filter(lead => lead.status === status).length;
};

return (
<div className="flex flex-wrap gap-2 mb-6">
    {FILTERS.map(filter => {
    const count = getCount(filter);
    const isActive = activeFilter === filter;

    return (
        <button
        key={filter}
        onClick={() => onFilterChange(filter)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isActive
            ? 'bg-blue-600 text-white shadow-sm border-transparent'
            : 'bg-white dark:bg-[#1E293B] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
        }`}
        >
        {filter} ({count})
        </button>
    );
    })}
</div>
);
}