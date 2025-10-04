import axios from 'axios';

const BASE_URL = '/api/v1/products';

// List all products
export const listProducts = () => axios.get(BASE_URL);

// Get product by ID
export const getProductById = (id) => axios.get(`${BASE_URL}/${id}`);

// Add new product (formData with multiple files)
export const addProduct = (formData) =>
  axios.post(BASE_URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

// Update product by ID
export const updateProduct = (id, formData) =>
  axios.put(`${BASE_URL}/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

// Delete product by ID
export const deleteProduct = (id) =>
  axios.delete(`${BASE_URL}/${id}`);
