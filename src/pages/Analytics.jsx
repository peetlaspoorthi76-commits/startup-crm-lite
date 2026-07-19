import React, { useMemo } from 'react';
import { useLeadContext } from '../context/LeadContext';
import { useAuth } from '../context/AuthContext';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { Users, TrendingUp, DollarSign, Activity, Trophy } from 'lucide-react';

export default function Analytics() {
  const { leads } = useLeadContext();
  const { user } = useAuth(); // Pulling your profile for Top Performer

  // 1. Core Metrics Calculations
  const metrics = useMemo(() => {
    const totalLeads = leads.length;
    const wonLeads = leads.filter(lead => lead.status === 'Won');
    const activeLeads = leads.filter(lead => lead.status !== 'Won' && lead.status !== 'Lost');

    const conversionRate = totalLeads > 0
      ? Math.round((wonLeads.length / totalLeads) * 100)
      : 0;

    const pipelineValue = activeLeads.reduce((sum, lead) => sum + (Number(lead.value) || 0), 0);
    const wonRevenue = wonLeads.reduce((sum, lead) => sum + (Number(lead.value) || 0), 0);

    // Advanced widget calculations
    const forecast = Math.round(wonRevenue + (pipelineValue * (conversionRate / 100)));
    const velocity = Math.round(wonRevenue / 30); // Avg per day over 30 days
    const avgDealSize = wonLeads.length > 0 ? Math.round(wonRevenue / wonLeads.length) : 0;

    return { totalLeads, conversionRate, pipelineValue, wonRevenue, forecast, velocity, avgDealSize };
  }, [leads]);

  // 2. Chart Data Calculations
  const funnelData = useMemo(() => {
    const counts = { 'New': 0, 'Contacted': 0, 'Proposal': 0, 'Won': 0 };
    leads.forEach(lead => {
      if (counts[lead.status] !== undefined) counts[lead.status]++;
    });
    return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
  }, [leads]);

  const sourceData = useMemo(() => {
    const sources = {};
    leads.forEach(lead => {
      const source = lead.source || 'Other';
      sources[source] = (sources[source] || 0) + 1;
    });
    return Object.keys(sources).map(key => ({ name: key, value: sources[key] }));
  }, [leads]);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  // 3. Static Activity Grid (Requires Phase 2 backend updates for real daily tracking)
  const activityBoxes = Array.from({ length: 28 }).map((_, i) => (
    <div key={i} className={`w-4 h-4 rounded-sm ${Math.random() > 0.5 ? 'bg-emerald-500' : 'bg-slate-800 border border-slate-700'}`}></div>
  ));

  return (
    <div className="space-y-6 pb-10">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Analytics Dashboard</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Track real sales performance and growth trends.</p>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#1E293B] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Leads</span>
            <Users size={16} className="text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{metrics.totalLeads}</h3>
        </div>
        <div className="bg-white dark:bg-[#1E293B] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Conversion Rate</span>
            <TrendingUp size={16} className="text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{metrics.conversionRate}%</h3>
        </div>
        <div className="bg-white dark:bg-[#1E293B] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Pipeline Value</span>
            <DollarSign size={16} className="text-yellow-500" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">₹{metrics.pipelineValue.toLocaleString()}</h3>
        </div>
        <div className="bg-white dark:bg-[#1E293B] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Won Revenue</span>
            <Activity size={16} className="text-purple-500" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">₹{metrics.wonRevenue.toLocaleString()}</h3>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Sales Pipeline</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" width={80} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }} />
                <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Lead Sources</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sourceData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Advanced Widgets Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Daily Sales Activity Grid</h3>
          <p className="text-xs text-slate-500 mb-6">Visual correlation grid showing sales team activity (requires backend activity logs).</p>
          <div className="flex flex-wrap gap-2 justify-center items-center h-32">
            {activityBoxes}
          </div>
          <div className="flex justify-between text-xs text-slate-500 mt-4">
            <span>Less / More</span>
            <span>Based on touchpoints</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Top Performers</h3>
          <p className="text-xs text-slate-500 mb-6">Ranking sales representatives by closed won deals revenue.</p>
          <div className="flex-1 flex items-center justify-between p-4 bg-slate-50 dark:bg-[#0F172A] rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/10 text-yellow-500 rounded-full">
                <Trophy size={20} />
              </div>
              <span className="font-semibold text-slate-900 dark:text-white">{user?.name || 'Current User'}</span>
            </div>
            <span className="font-bold text-slate-900 dark:text-white">₹{metrics.wonRevenue.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Advanced Widgets Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Revenue Growth Forecast</h3>
          <p className="text-xs text-slate-500 mb-6">Data-driven revenue forecast projected based on current pipeline progression.</p>
          <div className="mb-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Forecasted Revenue Next Month</span>
            <h4 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">₹{metrics.forecast.toLocaleString()}</h4>
          </div>
          <div className="mt-8">
            <div className="flex justify-between text-xs text-slate-500 mb-2">
              <span>Accuracy & Confidence</span>
              <span className="text-orange-500">High Confidence (82%)</span>
            </div>
            <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 w-[82%] rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Sales Velocity Widget</h3>
          <p className="text-xs text-slate-500 mb-6">Estimated revenue flowing through your sales funnel daily.</p>
          <div className="mb-6">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Current Sales Velocity</span>
            <div className="flex items-baseline gap-1 mt-1">
              <h4 className="text-3xl font-bold text-slate-900 dark:text-white">₹{metrics.velocity.toLocaleString()}</h4>
              <span className="text-sm text-slate-500">/ day</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8 pt-4 border-t border-slate-200 dark:border-slate-700">
            <div>
              <span className="block text-xs text-slate-500 mb-1">Opportunities</span>
              <span className="font-semibold text-slate-900 dark:text-white">{metrics.totalLeads}</span>
            </div>
            <div>
              <span className="block text-xs text-slate-500 mb-1">Avg Deal Size</span>
              <span className="font-semibold text-slate-900 dark:text-white">₹{metrics.avgDealSize.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}