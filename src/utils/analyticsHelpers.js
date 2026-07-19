const STATUS_ORDER = ['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'];

const STATUS_COLORS = {
  New: '#007C91',
  Contacted: '#3AA5B8',
  'Meeting Scheduled': '#57D4E6',
  'Proposal Sent': '#FF8C61',
  Won: '#007C91',
  Lost: '#FFB089',
};

const SOURCE_COLORS = ['#007C91', '#3AA5B8', '#57D4E6', '#FF8C61', '#83E4F0', '#FFB089'];

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const safeNumber = (value) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
};

export const getLeadValue = (lead) => safeNumber(lead?.value);

const getLastSixMonths = () => {
  const now = new Date();
  return Array.from({ length: 6 }, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      name: MONTH_NAMES[date.getMonth()],
    };
  });
};

export const getCoreMetrics = (leads = []) => {
  const list = Array.isArray(leads) ? leads : [];
  const totalLeads = list.length;
  const wonLeads = list.filter((lead) => lead.status === 'Won');
  const activeLeads = list.filter((lead) => lead.status !== 'Won' && lead.status !== 'Lost');

  const conversionRate =
    totalLeads > 0 ? Math.round((wonLeads.length / totalLeads) * 100) : 0;

  const pipelineValue = activeLeads.reduce((sum, lead) => sum + getLeadValue(lead), 0);
  const wonRevenue = wonLeads.reduce((sum, lead) => sum + getLeadValue(lead), 0);

  const forecast = Math.round(wonRevenue + pipelineValue * (conversionRate / 100));
  const velocity = Math.round(wonRevenue / 30);
  const avgDealSize = wonLeads.length > 0 ? Math.round(wonRevenue / wonLeads.length) : 0;

  const confidence =
    totalLeads >= 10
      ? Math.min(95, 60 + conversionRate * 0.35)
      : totalLeads > 0
        ? Math.min(75, 40 + totalLeads * 3)
        : 0;

  return {
    totalLeads,
    conversionRate,
    pipelineValue,
    wonRevenue,
    forecast,
    velocity,
    avgDealSize,
    confidence: Math.round(confidence),
    opportunities: activeLeads.length,
  };
};

export const getStatusDistribution = (leads = []) => {
  const list = Array.isArray(leads) ? leads : [];
  return STATUS_ORDER.map((status) => ({
    name: status,
    value: list.filter((l) => l.status === status).length,
    fill: STATUS_COLORS[status],
  })).filter((item) => item.value > 0);
};

export const getFunnelData = (leads = []) => {
  const list = Array.isArray(leads) ? leads : [];
  if (list.length === 0) return [];

  return [
    { name: 'New', value: list.length, fill: STATUS_COLORS.New },
    {
      name: 'Contacted',
      value: list.filter((l) =>
        ['Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won'].includes(l.status)
      ).length,
      fill: STATUS_COLORS.Contacted,
    },
    {
      name: 'Meeting',
      value: list.filter((l) =>
        ['Meeting Scheduled', 'Proposal Sent', 'Won'].includes(l.status)
      ).length,
      fill: STATUS_COLORS['Meeting Scheduled'],
    },
    {
      name: 'Proposal',
      value: list.filter((l) => ['Proposal Sent', 'Won'].includes(l.status)).length,
      fill: STATUS_COLORS['Proposal Sent'],
    },
    {
      name: 'Won',
      value: list.filter((l) => l.status === 'Won').length,
      fill: STATUS_COLORS.Won,
    },
  ];
};

export const getPipelineByStatus = (leads = []) => {
  const list = Array.isArray(leads) ? leads : [];
  const stages = ['New', 'Contacted', 'Proposal Sent', 'Won'];
  return stages.map((stage) => ({
    name: stage,
    value: list.filter((l) => l.status === stage).length,
  }));
};

export const getMonthlyLeads = (leads = []) => {
  const list = Array.isArray(leads) ? leads : [];
  const months = getLastSixMonths();

  return months.map(({ year, month, name }) => ({
    name,
    leads: list.filter((lead) => {
      if (!lead.createdAt) return false;
      const created = new Date(lead.createdAt);
      return created.getFullYear() === year && created.getMonth() === month;
    }).length,
  }));
};

export const getConversionByMonth = (leads = []) => {
  const list = Array.isArray(leads) ? leads : [];
  const months = getLastSixMonths();

  return months.map(({ year, month, name }) => {
    const monthLeads = list.filter((lead) => {
      if (!lead.createdAt) return false;
      const created = new Date(lead.createdAt);
      return created.getFullYear() === year && created.getMonth() === month;
    });
    const won = monthLeads.filter((l) => l.status === 'Won').length;
    const rate = monthLeads.length > 0 ? Math.round((won / monthLeads.length) * 100) : 0;
    return { name, rate };
  });
};

export const getRevenueGrowth = (leads = []) => {
  const list = Array.isArray(leads) ? leads : [];
  const months = getLastSixMonths();

  return months.map(({ year, month, name }) => ({
    name,
    revenue: list
      .filter((lead) => {
        if (lead.status !== 'Won' || !lead.createdAt) return false;
        const created = new Date(lead.createdAt);
        return created.getFullYear() === year && created.getMonth() === month;
      })
      .reduce((sum, lead) => sum + getLeadValue(lead), 0),
  }));
};

export const getLeadSourceStats = (leads = []) => {
  const list = Array.isArray(leads) ? leads : [];
  if (list.length === 0) return [];

  const sources = list.reduce((acc, lead) => {
    const source = lead.source || 'Other';
    acc[source] = (acc[source] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(sources)
    .map((source, index) => ({
      name: source,
      value: sources[source],
      fill: SOURCE_COLORS[index % SOURCE_COLORS.length],
    }))
    .sort((a, b) => b.value - a.value);
};

export const getActivityHeatmapData = (leads = []) => {
  const list = Array.isArray(leads) ? leads : [];
  const now = new Date();

  return Array.from({ length: 30 }, (_, i) => {
    const dayStart = new Date(now);
    dayStart.setDate(now.getDate() - (29 - i));
    dayStart.setHours(0, 0, 0, 0);

    const dayEnd = new Date(dayStart);
    dayEnd.setHours(23, 59, 59, 999);

    const count = list.filter((lead) => {
      if (!lead.createdAt) return false;
      const created = new Date(lead.createdAt);
      return created >= dayStart && created <= dayEnd;
    }).length;

    const intensity = count === 0 ? 0 : count === 1 ? 1 : count <= 3 ? 2 : 3;

    return { day: i + 1, intensity, count };
  });
};

export const getTopPerformers = (leads = [], user = null) => {
  const list = Array.isArray(leads) ? leads : [];
  const wonRevenue = list
    .filter((l) => l.status === 'Won')
    .reduce((sum, lead) => sum + getLeadValue(lead), 0);

  if (!user?.name && wonRevenue === 0) return [];

  return [
    {
      name: user?.name || 'Current User',
      revenue: wonRevenue,
    },
  ];
};

export const getAverageSalesCycle = (leads = []) => {
  const list = Array.isArray(leads) ? leads : [];
  const wonWithDates = list.filter((l) => l.status === 'Won' && l.createdAt);

  if (wonWithDates.length === 0) return 0;

  const totalDays = wonWithDates.reduce((sum, lead) => {
    const updated = lead.updatedAt ? new Date(lead.updatedAt) : new Date();
    const created = new Date(lead.createdAt);
    const days = Math.max(0, Math.floor((updated - created) / (1000 * 60 * 60 * 24)));
    return sum + days;
  }, 0);

  return Math.round(totalDays / wonWithDates.length);
};

export const formatCurrency = (amount) => {
  const safe = safeNumber(amount);
  return `₹${safe.toLocaleString('en-IN')}`;
};

export { SOURCE_COLORS, STATUS_COLORS };
