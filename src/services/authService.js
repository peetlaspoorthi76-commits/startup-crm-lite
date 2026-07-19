import api from './api';

export const register = async (name, email, password) => (await api.post('/api/auth/register', { name, email, password })).data;
export const login = async (email, password) => (await api.post('/api/auth/login', { email, password })).data;
export const logout = () => localStorage.removeItem('crm-token');
export const getProfile = async () => (await api.get('/api/auth/profile')).data;