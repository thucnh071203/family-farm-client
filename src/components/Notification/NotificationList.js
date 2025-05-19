import React, { useState, useEffect, useRef } from 'react';

const NotificationList = () => {
    const [isNotificationListVisible, setIsNotificationListVisible] = useState(false);
    const notifyListRef = useRef(null);

    // Dữ liệu mẫu dựa trên ListNotifiResponseDTO
    const notificationData = {
        Success: true,
        Message: "Notifications retrieved successfully",
        UnreadCount: 4,
        Notifications: [
            { id: 1, message: 'Yêu cầu kết bạn mới từ Anna', time: '1 giờ trước' },
            { id: 2, message: 'Cây trồng của bạn đã sẵn sàng để thu hoạch!', time: '3 giờ trước' },
            { id: 3, message: 'Sự kiện nhóm đã được lên lịch', time: 'Hôm qua' },
            { id: 4, message: 'Dịch vụ mới có sẵn', time: '2 ngày trước' },
        ],
    };

    const toggleNotificationList = () => {
        setIsNotificationListVisible((prev) => !prev);
    };

    // Xử lý sự kiện click bên ngoài
        useEffect(() => {
            const handleClickOutside = (event) => {
                if (notifyListRef.current && !notifyListRef.current.contains(event.target)) {
                    setIsNotificationListVisible(false);
                }
            };
    
            // Thêm sự kiện click vào document
            document.addEventListener('mousedown', handleClickOutside);
    
            // Cleanup sự kiện khi component unmount
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, []);

    return (
        <div ref={notifyListRef}>
            <div className="notifi-box flex items-center cursor-pointer" onClick={toggleNotificationList}>
                <i className="fa-solid fa-bell text-gray-600"></i>
                {notificationData.UnreadCount > 0 && (
                    <div className="notifi-number bg-red-500 text-white rounded-full px-2 py-1 text-xs ml-2">
                        {notificationData.UnreadCount}
                    </div>
                )}
            </div>
            {isNotificationListVisible && (
                <div className="absolute top-12 right-4 w-[450px] bg-white rounded-lg shadow-xl z-50 border border-gray-200">
                    <div className="p-4 border-b bg-gray-50 rounded-t-lg">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Thông báo
                        </h3>
                    </div>
                    <ul className="max-h-64 overflow-y-auto">
                        {notificationData.Notifications && notificationData.Notifications.length > 0 ? (
                            notificationData.Notifications.map((notification) => (
                                <li
                                    key={notification.id}
                                    className="p-4 border-b hover:bg-gray-100 transition-colors duration-200"
                                >
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-gray-600">{notification.message}</p>
                                        <span className="text-xs text-gray-500">{notification.time}</span>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className="p-4 text-center text-gray-500">Không có thông báo nào</li>
                        )}
                    </ul>
                    <div className="p-4 border-t bg-gray-50 rounded-b-lg">
                        <a href="/notifications"
                            className="text-blue-600 hover:underline text-sm font-medium">
                            Xem tất cả thông báo
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationList;