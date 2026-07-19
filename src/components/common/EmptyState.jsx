import { SearchX } from 'lucide-react';

export default function EmptyState({ onClear }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 bg-surface rounded-xl border border-border border-dashed">
      <div className="p-4 bg-background rounded-full mb-4">
        <SearchX size={32} className="text-muted" />
      </div>
      <h3 className="text-lg font-bold text-foreground mb-1">No leads found</h3>
      <p className="text-muted mb-4 text-center max-w-sm">
        We couldn't find any leads matching your current search and filter settings.
      </p>
      <button
        onClick={onClear}
        className="px-4 py-2 text-primary font-medium hover:bg-surface-hover rounded-lg transition-colors"
      >
        Clear all filters
      </button>
    </div>
  );
}
