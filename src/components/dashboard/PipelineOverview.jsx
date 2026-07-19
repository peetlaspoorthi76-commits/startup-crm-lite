export default function PipelineOverview({ leads }) {
  const total = leads.length || 1;
  const newLeads = leads.filter((l) => l.status === 'New').length;
  const wonLeads = leads.filter((l) => l.status === 'Won').length;
  const lostLeads = leads.filter((l) => l.status === 'Lost').length;

  return (
    <div className="bg-surface p-6 rounded-xl border border-border shadow-sm mt-6 transition-colors">
      <h3 className="text-lg font-bold text-foreground mb-4">Pipeline Overview</h3>
      <div className="flex h-4 rounded-full overflow-hidden mb-4 bg-background">
        <div style={{ width: `${(newLeads / total) * 100}%` }} className="bg-primary" />
        <div style={{ width: `${(wonLeads / total) * 100}%` }} className="bg-secondary" />
        <div style={{ width: `${(lostLeads / total) * 100}%` }} className="bg-accent" />
        <div
          style={{ width: `${((total - newLeads - wonLeads - lostLeads) / total) * 100}%` }}
          className="bg-border"
        />
      </div>
      <div className="flex gap-4 text-sm text-muted flex-wrap">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-primary" /> New
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-secondary" /> Won
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-accent" /> Lost
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-border" /> Other
        </div>
      </div>
    </div>
  );
}
