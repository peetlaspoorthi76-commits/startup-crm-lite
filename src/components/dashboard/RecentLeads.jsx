export default function RecentLeads({ leads }) {
  const recent = leads.slice(0, 5);

  return (
    <div className="bg-surface p-6 rounded-xl border border-border shadow-sm transition-colors">
      <h3 className="text-lg font-bold text-foreground mb-4">Recent Leads</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-muted">
          <thead className="bg-background text-muted border-b border-border">
            <tr>
              <th className="px-4 py-3 font-medium rounded-tl-lg">Name</th>
              <th className="px-4 py-3 font-medium">Company</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium rounded-tr-lg">Date Added</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {recent.map((lead, i) => (
              <tr key={i} className="hover:bg-surface-hover transition-colors">
                <td className="px-4 py-3 font-medium text-foreground">{lead.name}</td>
                <td className="px-4 py-3">{lead.company}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-background text-foreground rounded-full text-xs font-medium">
                    {lead.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
