// src/api/axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000',
});

instance.interceptors.request.use((config) => {
  const user = localStorage.getItem('user');
  
  if (user) {
    try {
      const token = JSON.parse(user)?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.error('Error parsing user token:', err);
    }
  }

  return config;
});

export default instance;
