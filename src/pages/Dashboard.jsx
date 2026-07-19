import { Users, TrendingUp, DollarSign, Activity } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import PipelineOverview from '../components/dashboard/PipelineOverview';
import RecentLeads from '../components/dashboard/RecentLeads';
import QuickActions from '../components/dashboard/QuickActions';
import { useLeads } from '../context/LeadContext';
import { getCoreMetrics, formatCurrency } from '../utils/analyticsHelpers';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning!';
  if (hour < 18) return 'Good afternoon!';
  return 'Good evening!';
};

export default function Dashboard() {
  const { leads } = useLeads();
  const metrics = getCoreMetrics(leads);

  const wonCount = leads.filter((l) => l.status === 'Won').length;
  const lostCount = leads.filter((l) => l.status === 'Lost').length;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">{getGreeting()}</h1>
        <p className="text-muted mt-1">Here is your pipeline overview for today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatsCard title="Total Leads" value={leads.length} icon={Users} change={0} colorClass="text-primary" />
        <StatsCard title="Won Deals" value={wonCount} icon={TrendingUp} change={0} colorClass="text-secondary" />
        <StatsCard title="Lost Deals" value={lostCount} icon={Activity} change={0} colorClass="text-accent" />
        <StatsCard title="Revenue" value={formatCurrency(metrics.wonRevenue)} icon={DollarSign} change={0} colorClass="text-primary" />
      </div>

      <PipelineOverview leads={leads} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <RecentLeads leads={leads} />
        </div>
        <div className="lg:col-span-1">
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
