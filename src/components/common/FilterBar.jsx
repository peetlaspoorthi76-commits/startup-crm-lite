const FILTERS = ['All', 'New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'];

export default function FilterBar({ activeFilter, onFilterChange, leads }) {
  const getCount = (status) => {
    if (status === 'All') return leads.length;
    return leads.filter((lead) => lead.status === status).length;
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {FILTERS.map((filter) => {
        const count = getCount(filter);
        const isActive = activeFilter === filter;

        return (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'bg-primary text-white shadow-sm border-transparent'
                : 'bg-surface text-muted border border-border hover:bg-surface-hover'
            }`}
          >
            {filter} ({count})
          </button>
        );
      })}
    </div>
  );
}
