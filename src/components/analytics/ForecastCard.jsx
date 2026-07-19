import { formatCurrency } from '../../utils/analyticsHelpers';

export default function ForecastCard({ forecast = 0, confidence = 0 }) {
  const safeForecast = Number.isFinite(forecast) ? forecast : 0;
  const safeConfidence = Number.isFinite(confidence) ? Math.min(100, Math.max(0, confidence)) : 0;

  const confidenceLabel =
    safeConfidence >= 80
      ? 'High Confidence'
      : safeConfidence >= 50
        ? 'Moderate Confidence'
        : safeConfidence > 0
          ? 'Low Confidence'
          : 'No Data';

  return (
    <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm flex flex-col h-full min-h-[280px] justify-between">
      <div>
        <h3 className="text-lg font-bold text-foreground mb-1">Revenue Growth Forecast</h3>
        <p className="text-xs text-muted">
          Data-driven revenue forecast projected for the upcoming calendar month.
        </p>
      </div>

      <div className="my-6">
        <p className="text-[10px] font-bold text-muted tracking-wider uppercase mb-1">
          Forecasted Revenue Next Month
        </p>
        <p className="text-3xl font-bold text-foreground">{formatCurrency(safeForecast)}</p>
        <p className="text-xs text-muted mt-1">Based on current pipeline progression</p>
      </div>

      <div>
        <div className="flex justify-between text-xs mb-2">
          <span className="text-muted">Accuracy & Confidence</span>
          <span className="text-accent font-medium">
            {confidenceLabel} ({safeConfidence}%)
          </span>
        </div>
        <div className="w-full h-2 bg-background rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all"
            style={{ width: `${safeConfidence}%` }}
          />
        </div>
      </div>
    </div>
  );
}
