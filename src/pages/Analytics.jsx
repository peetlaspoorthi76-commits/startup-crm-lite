import { useMemo, useState } from 'react';
import { useLeads } from '../context/LeadContext';
import {
  getPipelineValue, getWonRevenue, getAverageSalesCycle,
  getStatusDistribution, getFunnelData, getLeadSourceStats,
  getTopPerformers, getMonthlyLeads, getConversionByMonth,
  getRevenueGrowth, getActivityHeatmapData
} from '../utils/analyticsHelpers';
import { Users, Target, DollarSign, TrendingUp, Clock, Zap, BarChart3 } from 'lucide-react';

import FunnelChartCard from '../components/analytics/FunnelChartCard';
import PieChartCard from '../components/analytics/PieChartCard';
import LeadSourceChart from '../components/analytics/LeadSourceChart';
import TopPerformersCard from '../components/analytics/TopPerformersCard';
import BarChartCard from '../components/analytics/BarChartCard';
import LineChartCard from '../components/analytics/LineChartCard';
import RevenueGrowthChart from '../components/analytics/RevenueGrowthChart';
import ActivityHeatmap from '../components/analytics/ActivityHeatmap';
import ForecastCard from '../components/analytics/ForecastCard';
import SalesVelocityCard from '../components/analytics/SalesVelocityCard';

export default function Analytics() {
  const { leads } = useLeads();
  const [filter, setFilter] = useState('All Time');

  const analyticsData = useMemo(() => {
    const totalLeads = leads.length;
    const wonLeads = leads.filter(l => l.status === 'Won').length;
    const lostLeads = leads.filter(l => l.status === 'Lost').length;

    return {
      total: totalLeads,
      winRate: totalLeads > 0 ? Math.round((wonLeads / totalLeads) * 100) : 0,
      lostRate: totalLeads > 0 ? Math.round((lostLeads / totalLeads) * 100) : 0,
      pipelineValue: getPipelineValue(leads),
      wonRevenue: getWonRevenue(leads),
      avgCycle: getAverageSalesCycle(),
      statusDist: getStatusDistribution(leads),
      funnel: getFunnelData(leads),
      sources: getLeadSourceStats(leads),
      performers: getTopPerformers(leads),
      monthlyLeads: getMonthlyLeads(leads),
      conversionTrend: getConversionByMonth(),
      revenueTrend: getRevenueGrowth(),
      heatmap: getActivityHeatmapData()
    };
  }, [leads]);

  if (!leads || leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="p-4 bg-slate-800 rounded-full mb-4">
          <BarChart3 size={48} className="text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">No analytics available yet</h2>
        <p className="text-slate-400 mb-6 max-w-sm">Add your first lead to start tracking business performance.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-slate-400 mt-1">Track sales performance and growth trends.</p>
        </div>
        <div className="flex gap-2 bg-[#1E293B] p-1 rounded-lg border border-slate-700">
            {['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'This Year', 'All Time'].map(f => (
                <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${filter === f ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                    {f}
                </button>
            ))}
        </div>
      </div>

      {/* Row 1: Top KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <StatCard title="TOTAL LEADS" value={analyticsData.total} icon={Users} color="text-blue-500" />
        <StatCard title="CONVERSION RATE" value={`${analyticsData.winRate}%`} icon={Target} color="text-green-500" />
        <StatCard title="PIPELINE VALUE" value={`₹${analyticsData.pipelineValue.toLocaleString()}`} icon={DollarSign} color="text-yellow-500" />
        <StatCard title="WON REVENUE" value={`₹${analyticsData.wonRevenue.toLocaleString()}`} icon={TrendingUp} color="text-emerald-500" />
        <StatCard title="AVG SALES CYCLE" value={`${analyticsData.avgCycle} Days`} icon={Clock} color="text-purple-500" />
        <StatCard title="LOST RATE" value={`${analyticsData.lostRate}%`} icon={Zap} color="text-red-500" />
      </div>

      {/* Row 2: Distribution & Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <PieChartCard data={analyticsData.statusDist} total={analyticsData.total} />
        <FunnelChartCard data={analyticsData.funnel} />
      </div>

      {/* Row 3: Monthly & Conversion Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <BarChartCard data={analyticsData.monthlyLeads} />
        <LineChartCard data={analyticsData.conversionTrend} />
      </div>

      {/* Row 4: Revenue & Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <RevenueGrowthChart data={analyticsData.revenueTrend} />
        <LeadSourceChart data={analyticsData.sources} />
      </div>

      {/* Row 5: Heatmap & Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ActivityHeatmap data={analyticsData.heatmap} />
        <TopPerformersCard data={analyticsData.performers} />
      </div>

      {/* Row 6: Forecast & Velocity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ForecastCard />
        <SalesVelocityCard />
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-[#1E293B] p-5 rounded-2xl border border-slate-700 shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">{title}</h4>
        <Icon size={16} className={color} />
      </div>
      <p className="text-2xl font-bold text-white mt-2">{value}</p>
    </div>
  );
}