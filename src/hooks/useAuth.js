// import { useEffect, useState } from "react";
// import instance from "../Axios/axiosConfig";

// const useAuth = (navigate, location) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false); // Trạng thái xác thực
//   const [isLoading, setIsLoading] = useState(true); // Trạng thái đang kiểm tra

//   useEffect(() => {
//     const refreshToken = async () => {
//       try {
//         const currentRefreshToken = localStorage.getItem("refreshToken") || sessionStorage.getItem("refreshToken");

//         // Nếu không có refreshToken và không ở trang Login/Register, chuyển hướng
//         if (!currentRefreshToken && !["/Login", "/Register"].includes(location.pathname)) {
//           setIsAuthenticated(false);
//           navigate("/Login");
//           setIsLoading(false);
//           return;
//         }

//         const response = await instance.post(
//           "/api/authen/refresh-token",
//           { token: currentRefreshToken },
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         const refreshData = response.data;
//         const storage = localStorage.getItem("refreshToken") ? localStorage : sessionStorage;

//         // Cập nhật token và thông tin
//         storage.setItem("accessToken", refreshData.accessToken);
//         storage.setItem("refreshToken", refreshData.refreshToken);
//         storage.setItem("username", refreshData.username);

//         const expiryTime = Date.now() + refreshData.tokenExpiryIn * 1000;
//         storage.setItem("tokenExpiry", expiryTime);

//         console.log("✅ Token refreshed and stored");
//         console.info("New accessToken: ", refreshData.accessToken);
//         setIsAuthenticated(true);
//       } catch (error) {
//         console.error("❌ Failed to refresh token", error);
//         if (!["/Login", "/Register"].includes(location.pathname)) {
//           navigate("/Login");
//         }
//         setIsAuthenticated(false);
//       } finally {
//         setIsLoading(false); // Kết thúc kiểm tra
//       }
//     };

//     refreshToken();

//     const intervalId = setInterval(refreshToken, 5 * 1000); // Mỗi 5 phút
//     return () => clearInterval(intervalId);
//   }, [navigate, location.pathname]);

//   return { isAuthenticated, isLoading };
// };

// export default useAuth;

import { useEffect, useState } from "react";
import instance from "../Axios/axiosConfig";

const useAuth = (navigate, location) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const refreshToken = async () => {
    try {
      const currentRefreshToken = localStorage.getItem("refreshToken") || sessionStorage.getItem("refreshToken");

      if (!currentRefreshToken && !["/Login", "/Register"].includes(location.pathname)) {
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

      // Cập nhật token và thông tin
      storage.setItem("accessToken", refreshData.accessToken);
      storage.setItem("refreshToken", refreshData.refreshToken);
      storage.setItem("username", refreshData.username);
      storage.setItem("accId", refreshData.accId); // Đồng bộ với backend
      const newExpiryTime = Date.now() + refreshData.tokenExpiryIn * 1000;
      storage.setItem("tokenExpiry", newExpiryTime);

      console.log("✅ Token refreshed and stored");
      console.log("✅ New Token: ", refreshData.accessToken);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("❌ Failed to refresh token", error);
      if (!["/Login", "/Register"].includes(location.pathname)) {
        navigate("/Login");
      }
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshToken(); // Gọi ngay khi mount

    // Gọi refresh token mỗi 10 phút
    const intervalId = setInterval(() => {
      console.log("⏰ Scheduled token refresh triggered");
      refreshToken();
    }, 10 * 60 * 1000); // 10 phút

    return () => clearInterval(intervalId); // Cleanup khi unmount
  }, [navigate, location.pathname]);

  return { isAuthenticated, isLoading };
};

export default useAuth;