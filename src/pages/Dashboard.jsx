import { Users, TrendingUp, DollarSign, Activity } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import PipelineOverview from '../components/dashboard/PipelineOverview';
import RecentLeads from '../components/dashboard/RecentLeads';
import QuickActions from '../components/dashboard/QuickActions';
import { useLeads } from '../context/LeadContext';

export default function Dashboard() {
const { leads } = useLeads();

// Calculate real stats based on the leads context
const wonCount = leads.filter(l => l.status === 'Won').length;
const lostCount = leads.filter(l => l.status === 'Lost').length;

return (
<div className="max-w-7xl mx-auto">
    <div className="mb-8">
    <h1 className="text-3xl font-bold text-slate-900">Good evening, Spoor!</h1>
    <p className="text-slate-600 mt-1">Here is your pipeline overview for today.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
    <StatsCard title="Total Leads" value={leads.length} icon={Users} change={0} colorClass="text-blue-600" />
    <StatsCard title="Won Deals" value={wonCount} icon={TrendingUp} change={0} colorClass="text-green-600" />
    <StatsCard title="Lost Deals" value={lostCount} icon={Activity} change={0} colorClass="text-red-600" />
    <StatsCard title="Revenue" value="₹0" icon={DollarSign} change={0} colorClass="text-indigo-600" />
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