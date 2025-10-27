// src/lib/axios.js
import axios from "axios";
import store from "../store/store";
import { logoutUser } from "../features/auth/authUserSlice";

const getBaseURL = () => {
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_API_URL;
  }
  return import.meta.env.VITE_API_URL;
};

const instance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});



instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Do not refresh token for login or logout endpoints
    const ignoredPaths = ['/api/v1/auth/login', '/api/v1/auth/logout', '/api/v1/auth/refresh-token'];
    if (ignoredPaths.includes(originalRequest.url)) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await instance.post('/api/v1/auth/refresh-token');
        const newAccessToken = data.accessToken;
        instance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        store.dispatch(logoutUser());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


export default instance;
