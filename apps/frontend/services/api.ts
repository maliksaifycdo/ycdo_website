import axios from 'axios';

function sanitizeApiUrl(raw: string | undefined) {
  if (!raw) return null;
  const v = raw.trim();
  if (v === 'NEXT_PUBLIC_API_URL' || v.startsWith('NEXT_PUBLIC_')) return null;
  if (v.startsWith('http://') || v.startsWith('https://') || v.startsWith('/')) return v;
  return null;
}

function getApiBaseUrl() {
  // In production we rely on platform rewrites (/api -> Render backend)
  if (process.env.NODE_ENV === 'production') return '/api';
  return sanitizeApiUrl(process.env.NEXT_PUBLIC_API_URL) || 'http://localhost:10000/api';
}

const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Request interceptor: attach JWT token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('ycdo_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response interceptor: handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('ycdo_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

