import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL as string;

const api = axios.create({ baseURL: API_URL });

// on every request, grab token from localStorage
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token && cfg.headers) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api