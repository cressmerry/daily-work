import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const placeOrder = async (orderData) => {
  try {
    const response = await api.post('/order', orderData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getOrders = async () => {
  try {
    const response = await api.get('/order');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getOrderById = async (id) => {
  try {
    const response = await api.get(`/order/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};