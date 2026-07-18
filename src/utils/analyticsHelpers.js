// Chart 1: Status Distribution
export const getStatusDistribution = (leads) => {
  if (!leads) return [];
  const statuses = ['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'];
  const colors = { 'New': '#3B82F6', 'Contacted': '#6366F1', 'Meeting Scheduled': '#F59E0B', 'Proposal Sent': '#EC4899', 'Won': '#22C55E', 'Lost': '#EF4444' };
  return statuses.map(status => ({ name: status, value: leads.filter(l => l.status === status).length, fill: colors[status] })).filter(item => item.value > 0);
};

// Chart 2: Funnel
export const getFunnelData = (leads) => {
  if (!leads) return [];
  return [
    { name: 'New', value: leads.length, fill: '#3B82F6' },
    { name: 'Contacted', value: leads.filter(l => ['Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won'].includes(l.status)).length, fill: '#6366F1' },
    { name: 'Meeting', value: leads.filter(l => ['Meeting Scheduled', 'Proposal Sent', 'Won'].includes(l.status)).length, fill: '#8B5CF6' },
    { name: 'Proposal', value: leads.filter(l => ['Proposal Sent', 'Won'].includes(l.status)).length, fill: '#EC4899' },
    { name: 'Won', value: leads.filter(l => l.status === 'Won').length, fill: '#22C55E' }
  ];
};

// Chart 3 & 4: Monthly Leads & Conversion
export const getMonthlyLeads = (leads) => [
  { name: 'Jan', leads: 12 }, { name: 'Feb', leads: 18 }, { name: 'Mar', leads: 14 },
  { name: 'Apr', leads: 22 }, { name: 'May', leads: 19 }, { name: 'Jun', leads: 28 + (leads?.length || 0) }
];

export const getConversionByMonth = () => [
  { name: 'Jan', rate: 18 }, { name: 'Feb', rate: 24 }, { name: 'Mar', rate: 22 },
  { name: 'Apr', rate: 35 }, { name: 'May', rate: 42 }, { name: 'Jun', rate: 48 }
];

// Chart 5 & 6: Revenue & Acquisition
export const getRevenueGrowth = () => [
  { name: 'Jan', revenue: 30000 }, { name: 'Feb', revenue: 40000 }, { name: 'Mar', revenue: 55000 },
  { name: 'Apr', revenue: 70000 }, { name: 'May', revenue: 85000 }, { name: 'Jun', revenue: 195000 }
];

export const getLeadSourceStats = (leads) => {
  if (!leads || leads.length === 0) return [];
  const sources = leads.reduce((acc, lead) => { acc[lead.source] = (acc[lead.source] || 0) + 1; return acc; }, {});
  return Object.keys(sources).map(source => ({ name: source, value: sources[source] })).sort((a, b) => b.value - a.value);
};

// Top KPIs
export const getPipelineValue = (leads) => leads?.filter(l => l.status !== 'Lost' && l.status !== 'Won').reduce((sum, lead) => sum + 25000, 0) || 0; // Fixed proxy value
export const getWonRevenue = (leads) => leads?.filter(l => l.status === 'Won').reduce((sum, lead) => sum + 45000, 0) || 0;
export const getAverageSalesCycle = () => 14;
export const getSalesVelocity = () => 6500;
export const getTopPerformers = (leads) => [{ name: 'Dinesh Singh', revenue: 195000 }];

// Heatmap Data Generator (Last 30 days mock)
export const getActivityHeatmapData = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    intensity: Math.floor(Math.random() * 4) // 0 to 3
  }));
};