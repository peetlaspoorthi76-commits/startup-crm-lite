import { useMemo } from 'react';
import { formatCurrency, getAverageSalesCycle } from '../../utils/analyticsHelpers';

export default function SalesVelocityCard({
  velocity = 0,
  opportunities = 0,
  conversionRate = 0,
  avgDealSize = 0,
  leads = [],
}) {
  const safeVelocity = Number.isFinite(velocity) ? velocity : 0;
  const safeOpportunities = Number.isFinite(opportunities) ? opportunities : 0;
  const safeConversion = Number.isFinite(conversionRate) ? conversionRate : 0;
  const safeAvgDeal = Number.isFinite(avgDealSize) ? avgDealSize : 0;
  const cycleDays = useMemo(() => getAverageSalesCycle(leads), [leads]);

  return (
    <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm flex flex-col h-full min-h-[280px]">
      <h3 className="text-lg font-bold text-foreground mb-1">Sales Velocity Widget</h3>
      <p className="text-xs text-muted mb-6">Estimated revenue flowing through your sales funnel daily.</p>

      <div className="mb-6">
        <p className="text-[10px] font-bold text-muted tracking-wider uppercase mb-1">
          Current Sales Velocity
        </p>
        <div className="flex items-baseline gap-1">
          <p className="text-3xl font-bold text-foreground">{formatCurrency(safeVelocity)}</p>
          <span className="text-muted text-sm">/ day</span>
        </div>
        <p className="text-xs text-muted mt-1">Based on won revenue over the last 30 days</p>
      </div>

      <div className="mt-auto border-t border-border pt-4">
        <p className="text-[10px] font-bold text-muted tracking-wider uppercase mb-3">Formula Variables</p>
        <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
          <div>
            <span className="block text-muted mb-1">Opportunities</span>
            <span className="font-semibold text-foreground">{safeOpportunities}</span>
          </div>
          <div>
            <span className="block text-muted mb-1">Conversion Win Rate</span>
            <span className="font-semibold text-foreground">{safeConversion}%</span>
          </div>
          <div>
            <span className="block text-muted mb-1">Avg Deal Size</span>
            <span className="font-semibold text-foreground">{formatCurrency(safeAvgDeal)}</span>
          </div>
          <div>
            <span className="block text-muted mb-1">Avg Sales Cycle</span>
            <span className="font-semibold text-foreground">{cycleDays} days</span>
          </div>
        </div>
      </div>
    </div>
  );
}
