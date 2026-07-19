import { Trophy } from 'lucide-react';
import { formatCurrency } from '../../utils/analyticsHelpers';

export default function TopPerformersCard({ data = [] }) {
  const performers = Array.isArray(data) ? data : [];

  return (
    <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all flex flex-col h-[400px]">
      <h3 className="text-lg font-bold text-foreground mb-1">Top Performers</h3>
      <p className="text-xs text-muted mb-6">
        Ranking sales representatives by closed won deals revenue.
      </p>

      <div className="flex-1 flex flex-col gap-4">
        {performers.length > 0 ? (
          performers.map((rep, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-background rounded-xl border border-border"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    index === 0
                      ? 'bg-accent/20 text-accent'
                      : index === 1
                        ? 'bg-secondary/20 text-secondary'
                        : 'bg-primary/20 text-primary'
                  }`}
                >
                  {index === 0 ? <Trophy size={16} /> : index + 1}
                </div>
                <span className="font-medium text-foreground">{rep.name}</span>
              </div>
              <span className="font-bold text-foreground">{formatCurrency(rep.revenue)}</span>
            </div>
          ))
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted text-sm">
            No won deals yet to rank performers.
          </div>
        )}
      </div>
    </div>
  );
}
