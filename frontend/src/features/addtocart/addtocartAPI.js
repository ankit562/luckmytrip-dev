import axios from '../../lib/axios';

const API_URL = '/api/v1/cart';

const config = { withCredentials: true };


export const startTicketPurchase = async (purchaseData) => {
  const response = await axios.post(`${API_URL}`, purchaseData, config);
  return response.data;
};

export const getUserCart = async () => {
  const response = await axios.get(`${API_URL}`, config);
  return response.data;
};

export const updateCartItem = async (itemId, updateData) => {
  const response = await axios.patch(`${API_URL}/${itemId}`, updateData, config);
  return response.data;
};

export const removeCartItem = async (itemId) => {
  const response = await axios.delete(`${API_URL}/${itemId}`, config);
  return response.data;
};

export const placeOrder = async (cartId) => {
  // This endpoint marks the order confirmed, in real PayU flow you will get payment url or token here
  const response = await axios.post(`${API_URL}/place-order`, { cartId }, config);
  return response.data;
};
