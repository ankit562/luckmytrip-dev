import axios from '../../lib/axios';

const API_URL = '/api/v1/auth';

const signup = (userData) => axios.post(`${API_URL}/register`, userData);
const login = (credentials) => axios.post(`${API_URL}/login`, credentials);
const logout = () => axios.post(`${API_URL}/logout`, {});
const getProfile = () => axios.get(`${API_URL}/profile`);
const verifyOtp = (otpData) => axios.post(`${API_URL}/verify-email`, otpData);
const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);
const UpdateProfile = (id, userData) => axios.patch(`${API_URL}/update-profile/${id}`, userData);




const getAllProfile = () => axios.get(`${API_URL}/allprofiles`);

export default {

  signup,
  login,
  logout,
  getProfile,
  verifyOtp,
  getAllProfile, 
  deleteUser,
  UpdateProfile,
  
};