export default function StatusBadge({ status }) {
const colors = {
'New': 'bg-slate-100 text-slate-700',
'Contacted': 'bg-blue-100 text-blue-700',
'Meeting Scheduled': 'bg-yellow-100 text-yellow-700',
'Proposal Sent': 'bg-purple-100 text-purple-700',
'Won': 'bg-green-100 text-green-700',
'Lost': 'bg-red-100 text-red-700'
};

// Fallback to New/gray if status is unknown
const colorClass = colors[status] || colors['New'];

return (
<span className={`px-3 py-1 rounded-full text-xs font-medium ${colorClass}`}>
    {status}
</span>
);
}