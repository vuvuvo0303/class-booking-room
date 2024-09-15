import axios from 'axios';
export const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const axiosClientMultipart = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'multipart/form-data',
  },
});

axiosClientMultipart.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.Accept = '*/*';
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);