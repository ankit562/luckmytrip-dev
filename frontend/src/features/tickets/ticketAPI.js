import axios from '../../lib/axios';

const BASE_URL = '/api/v1/tickets';

export const listTickets = () => axios.get(BASE_URL);

export const getTicketById = (id) => axios.get(`${BASE_URL}/${id}`);

export const addTicket = (formData) =>
  axios.post(BASE_URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' } // image upload
  });

export const updateTicket = (id, formData) =>
  axios.put(`${BASE_URL}/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

export const deleteTicket = (id) => axios.delete(`${BASE_URL}/${id}`);
