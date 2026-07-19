import React, { useMemo } from 'react';
import { useLeadContext } from '../context/LeadContext'; // Make sure this matches your hook name (could be useLeads)
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { Users, TrendingUp, DollarSign, Activity } from 'lucide-react';

export default function Analytics() {
  // Pull real live data from your database context
  const { leads } = useLeadContext();

  // Dynamically calculate top metrics
  const metrics = useMemo(() => {
    const totalLeads = leads.length;
    const wonLeads = leads.filter(lead => lead.status === 'Won');
    const lostLeads = leads.filter(lead => lead.status === 'Lost');
    const activeLeads = leads.filter(lead => lead.status !== 'Won' && lead.status !== 'Lost');

    const conversionRate = totalLeads > 0
      ? Math.round((wonLeads.length / totalLeads) * 100)
      : 0;

    const pipelineValue = activeLeads.reduce((sum, lead) => sum + (Number(lead.value) || 0), 0);
    const wonRevenue = wonLeads.reduce((sum, lead) => sum + (Number(lead.value) || 0), 0);

    return { totalLeads, conversionRate, pipelineValue, wonRevenue };
  }, [leads]);

  // Dynamically calculate Funnel Data
  const funnelData = useMemo(() => {
    const counts = { 'New': 0, 'Contacted': 0, 'Proposal': 0, 'Won': 0 };
    leads.forEach(lead => {
      if (counts[lead.status] !== undefined) {
        counts[lead.status]++;
      }
    });
    return Object.keys(counts).map(key => ({
      name: key,
      value: counts[key]
    }));
  }, [leads]);

  // Dynamically calculate Source Data
  const sourceData = useMemo(() => {
    const sources = {};
    leads.forEach(lead => {
      const source = lead.source || 'Other';
      sources[source] = (sources[source] || 0) + 1;
    });
    return Object.keys(sources).map(key => ({
      name: key,
      value: sources[key]
    }));
  }, [leads]);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Analytics Dashboard</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Track your real sales performance and growth trends.</p>
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

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Sales Pipeline Funnel */}
        <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Sales Pipeline</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" width={80} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                  itemStyle={{ color: '#3b82f6' }}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Sources Pie Chart */}
        <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Lead Sources</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}