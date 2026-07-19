import axios from 'axios';

// Hardcoding the base URL ensures Vercel never tries to process backend requests locally
const api = axios.create({
  baseURL: 'https://backend-production-4cb0d.up.railway.app'
});

// Automatically attach JWT tokens to every outgoing request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('crm-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;