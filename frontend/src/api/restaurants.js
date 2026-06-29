import { apiRequest } from './client';

export const getAllRestaurants = () =>
  apiRequest('/restaurant/getallrestaurant', { skipAuth: true });

export const getRestaurantById = (id) =>
  apiRequest(`/restaurant/getrestaurantbyid/${id}`, { skipAuth: true });

export const createRestaurant = (body) =>
  apiRequest('/restaurant/create', { method: 'POST', body });

export const deleteRestaurant = (id) =>
  apiRequest(`/restaurant/deleterestaurant/${id}`, { method: 'DELETE' });
