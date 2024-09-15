import axios from 'axios';
export const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-type': 'application/json',
    },
});

axiosClient.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            config.headers.Accept = 'application/json';
            config.headers['Content-Type'] = 'application/json';
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);