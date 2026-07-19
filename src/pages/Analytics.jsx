import React, { useMemo } from 'react';
import { useLeadContext } from '../context/LeadContext';
import { useAuth } from '../context/AuthContext';
import { Users, TrendingUp, DollarSign, Activity } from 'lucide-react';
import {
  getCoreMetrics,
  getFunnelData,
  getStatusDistribution,
  getMonthlyLeads,
  getConversionByMonth,
  getRevenueGrowth,
  getLeadSourceStats,
  getActivityHeatmapData,
  getTopPerformers,
  formatCurrency,
} from '../utils/analyticsHelpers';
import FunnelChartCard from '../components/analytics/FunnelChartCard';
import PieChartCard from '../components/analytics/PieChartCard';
import BarChartCard from '../components/analytics/BarChartCard';
import LineChartCard from '../components/analytics/LineChartCard';
import LeadSourceChart from '../components/analytics/LeadSourceChart';
import RevenueGrowthChart from '../components/analytics/RevenueGrowthChart';
import ActivityHeatmap from '../components/analytics/ActivityHeatmap';
import TopPerformersCard from '../components/analytics/TopPerformersCard';
import ForecastCard from '../components/analytics/ForecastCard';
import SalesVelocityCard from '../components/analytics/SalesVelocityCard';

export default function Analytics() {
  const { leads } = useLeadContext();
  const { user } = useAuth();

  const metrics = useMemo(() => getCoreMetrics(leads), [leads]);
  const funnelData = useMemo(() => getFunnelData(leads), [leads]);
  const statusData = useMemo(() => getStatusDistribution(leads), [leads]);
  const monthlyLeads = useMemo(() => getMonthlyLeads(leads), [leads]);
  const conversionData = useMemo(() => getConversionByMonth(leads), [leads]);
  const revenueData = useMemo(() => getRevenueGrowth(leads), [leads]);
  const sourceData = useMemo(() => getLeadSourceStats(leads), [leads]);
  const heatmapData = useMemo(() => getActivityHeatmapData(leads), [leads]);
  const performers = useMemo(() => getTopPerformers(leads, user), [leads, user]);

  return (
    <div className="space-y-6 pb-10">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Analytics Dashboard</h2>
        <p className="text-sm text-muted">Track real sales performance and growth trends from your live pipeline.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface p-4 rounded-xl border border-border shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted">Total Leads</span>
            <Users size={16} className="text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground">{metrics.totalLeads}</h3>
        </div>
        <div className="bg-surface p-4 rounded-xl border border-border shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted">Conversion Rate</span>
            <TrendingUp size={16} className="text-secondary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground">{metrics.conversionRate}%</h3>
        </div>
        <div className="bg-surface p-4 rounded-xl border border-border shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted">Pipeline Value</span>
            <DollarSign size={16} className="text-accent" />
          </div>
          <h3 className="text-2xl font-bold text-foreground">{formatCurrency(metrics.pipelineValue)}</h3>
        </div>
        <div className="bg-surface p-4 rounded-xl border border-border shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted">Won Revenue</span>
            <Activity size={16} className="text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground">{formatCurrency(metrics.wonRevenue)}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FunnelChartCard data={funnelData} />
        <PieChartCard data={statusData} total={metrics.totalLeads} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChartCard data={monthlyLeads} />
        <LineChartCard data={conversionData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LeadSourceChart data={sourceData} />
        <RevenueGrowthChart data={revenueData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityHeatmap data={heatmapData} />
        <TopPerformersCard data={performers} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ForecastCard forecast={metrics.forecast} confidence={metrics.confidence} />
        <SalesVelocityCard
          velocity={metrics.velocity}
          opportunities={metrics.opportunities}
          conversionRate={metrics.conversionRate}
          avgDealSize={metrics.avgDealSize}
          leads={leads}
        />
      </div>
    </div>
  );
}
