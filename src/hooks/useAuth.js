import { useEffect, useState } from "react";
import instance from "../Axios/axiosConfig";

const useAuth = (navigate, location) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const publicRoutes = ["/Login", "/Register", "/ConfirmOtp", "/ForgotPassword", "/ConfirmOtp", "/ResetPassword"];

  const refreshToken = async () => {
    try {
      const currentRefreshToken = localStorage.getItem("refreshToken") || sessionStorage.getItem("refreshToken");

      if (!currentRefreshToken && !publicRoutes.includes(location.pathname)) {
        setIsAuthenticated(false);
        navigate("/Login");
        setIsLoading(false);
        return;
      }

      // Kiểm tra thời gian hết hạn của accessToken
      const expiryTime = parseInt(localStorage.getItem("tokenExpiry") || sessionStorage.getItem("tokenExpiry") || "0", 10);
      if (expiryTime && Date.now() < expiryTime) {
        console.log("⏳ Token still valid, skipping refresh");
        setIsAuthenticated(true);
        setIsLoading(false);
        return;
      }

      const response = await instance.post(
        "/api/authen/refresh-token",
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

      const newExpiryTime = Date.now() + refreshData.tokenExpiryIn * 1000;
      storage.setItem("tokenExpiry", newExpiryTime);

      console.log("✅ Token refreshed and stored");
      console.log("✅ New Token: ", refreshData.accessToken);
      setIsAuthenticated(true);
    } catch (error) {
      if (!publicRoutes.includes(location.pathname)) {
        navigate("/Login");
      }
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshToken();

    const intervalId = setInterval(() => {
      console.log("⏰ Scheduled token refresh triggered");
      refreshToken();
    }, 10 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [navigate, location.pathname]);

  return { isAuthenticated, isLoading };
};

export default useAuth;
