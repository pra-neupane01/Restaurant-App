import { apiRequest } from './client';

export const register = (body) =>
  apiRequest('/auth/register', { method: 'POST', body, skipAuth: true });

export const login = (body) =>
  apiRequest('/auth/login', { method: 'POST', body, skipAuth: true });
