import axios from "axios";

const port = 4000

const axiosInstance = axios.create({
  baseURL: `http://localhost:${port}`
});

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
})

export default axiosInstance;