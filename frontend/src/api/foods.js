import { apiRequest } from './client';

export const getAllFoods = () =>
  apiRequest('/food/getallfood', { skipAuth: true });

export const getFoodById = (id) =>
  apiRequest(`/food/getfoodbyid/${id}`, { skipAuth: true });

export const getFoodsByRestaurant = (restaurantId) =>
  apiRequest(`/food/getfoodbyrestaurantid/${restaurantId}`, { skipAuth: true });

export const createFood = (body) =>
  apiRequest('/food/createfood', { method: 'POST', body });

export const updateFood = (id, body) =>
  apiRequest(`/food/updatefood/${id}`, { method: 'PUT', body });

export const deleteFood = (id) =>
  apiRequest(`/food/deletefood/${id}`, { method: 'DELETE' });
