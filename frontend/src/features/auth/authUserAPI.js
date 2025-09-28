import axios from '../../lib/axios';

const API_URL = '/api/v1/auth';

const signup = (userData) => axios.post(`${API_URL}/register`, userData);
const login = (credentials) => axios.post(`${API_URL}/login`, credentials);
const logout = () => axios.post(`${API_URL}/logout`, {});
const getProfile = () => axios.get(`${API_URL}/profile`);
const verifyOtp = (otpData) => axios.post(`${API_URL}/verify-email`, otpData);

export default {

  signup,
  login,
  logout,
  getProfile,
  verifyOtp,
};