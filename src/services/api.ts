import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { secureStorage } from '@/src/lib/secureStorage';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com';

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor to add Authorization Bearer Token
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await secureStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// Response Interceptor for global error formatting and 401 handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized session expiry
      await secureStorage.deleteItem('auth_token');
    }
    return Promise.reject(error);
  },
);
