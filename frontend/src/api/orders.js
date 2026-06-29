import { apiRequest } from './client';

export const createOrder = (body) =>
  apiRequest('/order/createorder', { method: 'POST', body });

export const updateOrderStatus = (orderId, body) =>
  apiRequest(`/order/orderstatus/${orderId}`, { method: 'PUT', body });
