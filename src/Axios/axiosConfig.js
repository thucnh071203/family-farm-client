import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Utility to check if token is expired
export const isTokenExpired = () => {
  const expiryIn = localStorage.getItem("tokenExpiryIn") || sessionStorage.getItem("tokenExpiryIn");
  const loginTime = localStorage.getItem("loginTime") || sessionStorage.getItem("loginTime");

  if (!expiryIn || !loginTime) {
    console.log("Missing expiryIn or loginTime:", { expiryIn, loginTime });
    return true;
  }

  const expiryTime = parseInt(loginTime, 10) + parseInt(expiryIn, 10) * 1000;
  const bufferTime = 30 * 1000; // Refresh 30 seconds before expiry
  const isExpired = Date.now() >= expiryTime - bufferTime;
  console.log("Token expiry check:", { expiryTime, currentTime: Date.now(), isExpired });
  return isExpired;
};

// Utility to refresh token
export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken") || sessionStorage.getItem("refreshToken");
  if (!refreshToken) {
    console.error("No refresh token available");
    throw new Error("No refresh token available");
  }

  try {
    console.log("Attempting to refresh token with:", refreshToken);
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/api/authen/refresh-token`,
      { token: refreshToken },
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("Refresh token response:", response.data);

    const { accessToken, tokenExpiryIn, refreshToken: newRefreshToken, accId } = response.data;
    const storage = localStorage.getItem("accessToken") ? localStorage : sessionStorage;

    storage.setItem("accessToken", accessToken);
    storage.setItem("refreshToken", newRefreshToken || refreshToken);
    storage.setItem("tokenExpiryIn", tokenExpiryIn);
    storage.setItem("accId", accId); // Store accId to match LoginForm
    storage.setItem("loginTime", Date.now().toString());

    return accessToken;
  } catch (error) {
    console.error("Token refresh failed:", error.response?.data || error.message);
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/Login";
    throw new Error("Failed to refresh token");
  }
};

// Request interceptor
instance.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");

    if (token && isTokenExpired()) {
      console.log("Token expired, refreshing...");
      try {
        token = await refreshAccessToken();
      } catch (error) {
        console.error("Request interceptor refresh error:", error.message);
        return Promise.reject(error);
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling 401 errors
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("Received 401, attempting to refresh token...");
      try {
        const newToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        console.error("Response interceptor refresh error:", refreshError.message);
        return Promise.reject(refreshError);
      }
    }

    console.error("Response interceptor error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default instance;