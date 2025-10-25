import axios from '../../lib/axios';

const API_URL = '/api/v1/auth';
const API_USER_INFO = '/api/v1/auth/billing-info';
const config = { withCredentials: true };

const signup = (userData) => axios.post(`${API_URL}/register`, userData, { withCredentials: true });
const login = (credentials) => axios.post(`${API_URL}/login`, credentials, { withCredentials: true });
const logout = () => axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
const getProfile = () => axios.get(`${API_URL}/profile`, { withCredentials: true });
const verifyOtp = (otpData) => axios.post(`${API_URL}/verify-email`, otpData, { withCredentials: true });
const deleteUser = (id) => axios.delete(`${API_URL}/${id}`, { withCredentials: true });
const UpdateProfile = (id, userData) => axios.patch(`${API_URL}/update-profile/${id}`, userData, { withCredentials: true });
const searchUser = (query) => axios.get(`${API_URL}/search-user`, { params: { query }, withCredentials: true });

const getAllProfile = () => axios.get(`${API_URL}/allprofiles`, { withCredentials: true });

const getBillingInfo = () => axios.get(API_USER_INFO, config);
const saveBillingInfo = (info) => axios.post(API_USER_INFO, info, config);


export default {

  signup,
  login,
  logout,
  getProfile,
  verifyOtp,
  getAllProfile, 
  deleteUser,
  UpdateProfile,
  searchUser,
  getBillingInfo,
  saveBillingInfo
  
};