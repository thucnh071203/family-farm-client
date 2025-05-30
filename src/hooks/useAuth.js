import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import instance, { isTokenExpired, refreshAccessToken } from "../Axios/axiosConfig";
import { toast } from "react-toastify";

const useAuth = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isChecking, setIsChecking] = useState(true); // trạng thái kiểm tra token

    useEffect(() => {
        const checkLoginState = async () => {
            const publicRoutes = ["/Login", "/Register"];
            if (publicRoutes.includes(location.pathname)) {
                setIsChecking(false);
                return;
            }

            const accessToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
            if (!accessToken) {
                toast.info("Please login first");
                navigate("/Login", { replace: true }); // replace để tránh ghi lại vào lịch sử
                return;
            }

            try {
                await instance.get("/api/account/own-profile");
            } catch (error) {
                toast.info("Session expired. Please login again.");
                navigate("/Login", { replace: true });
                return;
            } finally {
                setIsChecking(false);
            }
        };

        checkLoginState();

        const refreshInterval = setInterval(async () => {
            const accessToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
            if (accessToken && isTokenExpired()) {
                try {
                    await refreshAccessToken();
                } catch (error) {
                    toast.info("Session expired. Please login again.");
                    navigate("/Login", { replace: true });
                }
            }
        }, 5 * 60 * 1000);

        return () => clearInterval(refreshInterval);
    }, [navigate, location.pathname]);

    return { isChecking }; // trả ra để dùng trong AppContent
};

export default useAuth;
