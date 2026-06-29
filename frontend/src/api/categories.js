import { apiRequest } from './client';

export const getAllCategories = () =>
  apiRequest('/category/getallcategory', { skipAuth: true });

export const createCategory = (body) =>
  apiRequest('/category/createcategory', { method: 'POST', body });

export const updateCategory = (id, body) =>
  apiRequest(`/category/updatecategory/${id}`, { method: 'PUT', body });

export const deleteCategory = (id) =>
  apiRequest(`/category/deletecategory/${id}`, { method: 'DELETE' });
