import { apiRequest } from './client';

export const getUser = () => apiRequest('/user/getuser');

export const updateUser = (body) =>
  apiRequest('/user/updateuser', { method: 'PUT', body });

export const resetPassword = (body) =>
  apiRequest('/user/resetpassword', { method: 'POST', body });

export const updatePassword = (body) =>
  apiRequest('/user/updatepassword', { method: 'POST', body });

export const deleteUser = () =>
  apiRequest('/user/deleteuser', { method: 'DELETE' });
