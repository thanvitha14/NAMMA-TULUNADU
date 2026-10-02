import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1',
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('tulunadu_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  console.info('[API request]', api.getUri(config));
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.info('[API response]', api.getUri(response.config), response.status);
    return response;
  },
  (error) => {
    const requestUrl = error.config ? api.getUri(error.config) : api.defaults.baseURL;
    console.info('[API response]', requestUrl, error.response?.status ?? 'NO_RESPONSE');
    return Promise.reject(error);
  }
);

export default api;
