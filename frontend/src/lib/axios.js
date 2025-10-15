import axios from "axios";
// // import store from '../store/store'; // your redux store
// // import { logoutUser, fetchProfile } from '../features/auth/authUserSlice';

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


// Response interceptor to catch 401 errors
// instance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         // Call refresh token endpoint to get new access token
//         const resp = await instance.post('/auth/refresh-token');
//         // Then retry original request
//         return instance(originalRequest);
//       } catch (refreshError) {
//         // Refresh token failed, logout user
//         store.dispatch(logoutUser());
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default instance;
