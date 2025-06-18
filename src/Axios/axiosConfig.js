import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Biến để theo dõi trạng thái refresh token
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return instance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const currentRefreshToken = localStorage.getItem("refreshToken") || sessionStorage.getItem("refreshToken");
        if (!currentRefreshToken) {
          window.location.href = "/Login";
          return Promise.reject(error);
        }

        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/api/authen/refresh-token`,
          { token: currentRefreshToken },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const refreshData = response.data;
        const storage = localStorage.getItem("refreshToken") ? localStorage : sessionStorage;

        storage.setItem("accessToken", refreshData.accessToken);
        storage.setItem("refreshToken", refreshData.refreshToken);
        storage.setItem("username", refreshData.username);
        storage.setItem("accId", refreshData.accId);
        storage.setItem("tokenExpiry", Date.now() + refreshData.tokenExpiryIn * 1000);

        console.log("✅ Token refreshed via interceptor");

        processQueue(null, refreshData.accessToken);
        originalRequest.headers.Authorization = `Bearer ${refreshData.accessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        // Chỉ xóa các token liên quan
        const storage = localStorage.getItem("refreshToken") ? localStorage : sessionStorage;
        storage.removeItem("accessToken");
        storage.removeItem("refreshToken");
        storage.removeItem("username");
        storage.removeItem("accId");
        storage.removeItem("tokenExpiry");
        window.location.href = "/Login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default instance;