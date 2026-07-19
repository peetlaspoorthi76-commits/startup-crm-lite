import api from './api';

export const getLeads = async (params) => (await api.get('/api/leads', { params })).data;
export const createLead = async (data) => (await api.post('/api/leads', data)).data;
export const updateLead = async (id, data) => (await api.put(`/api/leads/${id}`, data)).data;
export const updateLeadStatus = async (id, status) => (await api.patch(`/api/leads/${id}/status`, { status })).data;
export const deleteLead = async (id) => (await api.delete(`/api/leads/${id}`)).data;
export const getLeadStats = async () => (await api.get('/api/leads/stats/summary')).data;
export const getMonthlyStats = async () => (await api.get('/api/leads/stats/monthly')).data;