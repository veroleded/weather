import axios from "axios";

const port = 4000

const axiosInstance = axios.create({
  baseURL: `http://localhost:${port}`
});

export default axiosInstance;