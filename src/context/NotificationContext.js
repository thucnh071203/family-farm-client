// NotificationContext.js - Phiên bản đã sửa
import React, { createContext, useContext, useState, useEffect } from 'react';
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import instance from "../Axios/axiosConfig";
import { useUser } from './UserContext'; // Sử dụng UserContext để check auth status

const NotificationContext = createContext();

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hubConnection, setHubConnection] = useState(null);
    const { user } = useUser(); // Lấy thông tin user từ UserContext

    // Kiểm tra xem user đã đăng nhập chưa
    const isAuthenticated = () => {
        const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
        return !!token;
    };

    const fetchNotifications = async () => {
        // Chỉ fetch khi đã đăng nhập
        if (!isAuthenticated()) {
            console.log("User not authenticated, skipping notification fetch");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await instance.get("/api/notification/get-by-user");

            if (response.data.success) {
                setNotifications(response.data.notifications || []);
                setUnreadCount(response.data.unreadCount || 0);
            } else {
                setError(response.data.message || "Cannot load notification!");
            }
        } catch (err) {
            console.error("Error fetching notifications:", err);
            // Không set error nếu user chưa đăng nhập
            if (isAuthenticated()) {
                setError("Lỗi khi tải thông báo từ máy chủ!");
            }
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (notifiStatusId) => {
        if (!isAuthenticated()) return;

        try {
            const response = await instance.put(
                `/api/notification/mark-as-read/${notifiStatusId}`
            );

            if (response.status === 200) {
                setNotifications((prevNotifications) =>
                    prevNotifications.map((noti) =>
                        noti.status.notifiStatusId === notifiStatusId
                            ? { ...noti, status: { ...noti.status, isRead: true } }
                            : noti
                    )
                );
                setUnreadCount((prevCount) => Math.max(prevCount - 1, 0));
            }
        } catch (err) {
            console.error("Error marking notification as read:", err);
        }
    };

    const markAllAsRead = async () => {
        if (!isAuthenticated()) return;

        try {
            const response = await instance.put("/api/notification/mark-all-as-read");

            if (response.status === 200) {
                setNotifications((prevNotifications) =>
                    prevNotifications.map((noti) => ({
                        ...noti,
                        status: { ...noti.status, isRead: true },
                    }))
                );
                setUnreadCount(0);
            }
        } catch (err) {
            console.error("Error marking all notifications as read:", err);
        }
    };

    // Reset state khi user logout
    const resetNotificationState = () => {
        setNotifications([]);
        setUnreadCount(0);
        setLoading(false);
        setError(null);
        if (hubConnection) {
            hubConnection.stop();
            setHubConnection(null);
        }
    };

    // Setup SignalR connection - chỉ khi đã đăng nhập
    useEffect(() => {
        if (!isAuthenticated()) {
            resetNotificationState();
            return;
        }

        const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
        
        const connection = new HubConnectionBuilder()
            .withUrl(`https://localhost:7280/notificationHub?access_token=${token}`, {
                logger: LogLevel.Information
            })
            .withAutomaticReconnect()
            .build();

        setHubConnection(connection);

        connection
            .start()
            .then(() => {
                console.log("SignalR Connected!");
                connection.on("ReceiveNotification", (notification) => {
                    console.log("Received notification:", JSON.stringify(notification, null, 2));
                    if (!notification.notifiId || !notification.content || !notification.status) {
                        console.error("Invalid notification data:", notification);
                        return;
                    }
                    setNotifications((prevNotifications) => {
                        if (prevNotifications.some((noti) => noti.notifiId === notification.notifiId)) {
                            return prevNotifications;
                        }
                        return [notification, ...prevNotifications];
                    });
                    setUnreadCount((prevCount) => prevCount + (notification.status.isRead ? 0 : 1));
                });
                connection.onreconnected(() => {
                    console.log("SignalR Reconnected!");
                    fetchNotifications();
                });
            })
            .catch((err) => {
                console.error("SignalR Connection Error:", err);
            });

        return () => {
            if (connection) {
                connection.stop();
            }
        };
    }, [user]); // Dependency là user thay vì empty array

    // Fetch notifications khi user đăng nhập
    useEffect(() => {
        if (isAuthenticated()) {
            fetchNotifications();
        } else {
            resetNotificationState();
        }
    }, [user]); // Chỉ fetch khi user state thay đổi

    const value = {
        notifications,
        unreadCount,
        loading,
        error,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
        isAuthenticated: isAuthenticated(),
        hubConnection // <-- Thêm dòng này để export
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};