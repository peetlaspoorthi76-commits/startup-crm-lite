import { Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SearchBar({ value, onChange }) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [localValue, onChange]);

  return (
    <div className="relative flex-1 max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
      <input
        type="text"
        placeholder="Search by name, company, or email..."
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="w-full pl-10 pr-10 py-2 border border-border rounded-lg bg-surface text-foreground focus:ring-2 focus:ring-primary outline-none transition-shadow"
        aria-label="Search"
      />
      {localValue && (
        <button
          onClick={() => setLocalValue('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
