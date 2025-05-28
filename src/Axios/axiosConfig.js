import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000, // optional: timeout 10s
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor để tự động gửi accessToken
instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// console.log("Base URL:", process.env.REACT_APP_API_BASE_URL); // test base url 

export default instance;