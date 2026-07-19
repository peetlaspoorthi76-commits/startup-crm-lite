export default function StatusBadge({ status }) {
  const colors = {
    New: 'bg-background text-foreground border border-border',
    Contacted: 'bg-primary/15 text-primary',
    'Meeting Scheduled': 'bg-secondary/15 text-secondary',
    'Proposal Sent': 'bg-accent/15 text-accent',
    Won: 'bg-primary/20 text-primary',
    Lost: 'bg-accent/20 text-accent',
  };

  const colorClass = colors[status] || colors.New;

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${colorClass}`}>{status}</span>
  );
}
