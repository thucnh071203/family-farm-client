import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./notificationstyle.css";
import cancelIcon from "../../assets/images/cancel_vector.png";
import headLine from "../../assets/images/head_line.png";
import readIcon from "../../assets/images/letter_vector.png";
import lineShape from "../../assets/images/border_line.png";

const notificationData = {
    Success: true,
    Message: "Notifications retrieved successfully",
    UnreadCount: 3,
    Notifications: [
        {
            NotifiId: "noti_001",
            Content: "Alis Wells has posted a new update.",
            CreatedAt: "2025-05-26T11:20:00Z",
            CategoryNotifiId: "cat_post",
            CategoryName: "Post",
            SenderId: "user_123",
            SenderName: "Alis Wells",
            SenderAvatar: "https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png",
            TargetId: "post_456",
            TargetType: "Post",
            TargetContent: "Check out my new farm photos!",
            IsRead: false
        },
        {
            NotifiId: "noti_002",
            Content: "David Kim commented on your post.",
            CreatedAt: "2025-05-25T15:30:00Z",
            CategoryNotifiId: "cat_comment",
            CategoryName: "Comment",
            SenderId: "user_789",
            SenderName: "David Kim",
            SenderAvatar: "https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png",
            TargetId: "post_456",
            TargetType: "Comment",
            TargetContent: "Great photos! Love the new farm setup.",
            IsRead: false
        },
        {
            NotifiId: "noti_003",
            Content: "Your friend request to Sarah Lee was accepted. asdasda dasd asd asd asda sa sda",
            CreatedAt: "2025-05-24T09:10:00Z",
            CategoryNotifiId: "cat_friend",
            CategoryName: "Friend Request",
            SenderId: "user_456",
            SenderName: "Sarah Lee",
            SenderAvatar: "https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png",
            TargetId: "user_101",
            TargetType: "FriendRequest",
            TargetContent: null,
            IsRead: true
        },
        {
            NotifiId: "noti_004",
            Content: "New event in your group: Farm Workshop. asdas asdas dasd asdasd asdasdas d",
            CreatedAt: "2025-05-23T14:00:00Z",
            CategoryNotifiId: "cat_group",
            CategoryName: "Group",
            SenderId: null,
            SenderName: null,
            SenderAvatar: "https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png",
            TargetId: "group_789",
            TargetType: "GroupEvent",
            TargetContent: "Join our Farm Workshop this weekend!",
            IsRead: false
        }
    ]
};

export default function NotificationList({ onToggle, isVisible }) {
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);

    // Close notification popup
    useEffect(() => {
        const handleClose = () => setIsNotificationVisible(false);
        window.addEventListener("closeNotification", handleClose);
        return () => window.removeEventListener("closeNotification", handleClose);
    }, [onToggle]);

    // Format time to display "X minutes ago" or similar
    const formatTime = (createdAt) => {
        const now = new Date();
        const created = new Date(createdAt);
        const diffMs = now - created;
        const diffMins = Math.floor(diffMs / 60000); // Convert to minutes
        if (diffMins < 1) return "Just now";
        if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        const diffDays = Math.floor(diffHours / 24);
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    };

    // const handleToggle = () => {
    //     if (!isNotificationVisible) {
    //         setIsNotificationVisible(true); // Mở popup nếu đang đóng
    //         onToggle(); // Cập nhật activePopup
    //     } else if (isActive) {
    //         setIsNotificationVisible(false); // Đóng popup nếu đang mở và active
    //     } else {
    //         onToggle(); // Nổi popup lên nếu đang mở nhưng không active
    //     }
    // };


    return (
        <div className="relative">
            <div
                className="notifi-box"
                onClick={onToggle}
                role="button"
                aria-label="Toggle notifications"
                aria-expanded={isVisible}
            >
                <i className={`fa-solid fa-bell ${isVisible ? 'text-[#3DB3FB]' : ''}`}></i>
                <div className="notifi-number">{notificationData.UnreadCount}</div>
            </div>

            {isVisible && (
                <div className="popup-notifi fixed right-5 top-16 max-w-[400px] w-[90%] sm:w-[400px] z-[50]">
                    <div className="w-full p-4 popup-container bg-slate-200">
                        <div className="flex items-center justify-between w-full px-4 mx-auto popup-header sm:px-0">
                            <div className="popup-title">Notifications</div>
                            <div
                                className="cancel-notifi"
                                onClick={() => setIsNotificationVisible(false)}
                                role="button"
                                aria-label="Close notifications"
                            >
                                <img className="vector" src={cancelIcon} alt="Close" />
                            </div>
                        </div>
                        <img className="w-full mt-3 header-noti-line" src={headLine} alt="Header line" />
                        {/* <div className="flex flex-row gap-2 px-4 mt-3 ml-4 read-status-container sm:px-0">
                            <div className="all-noti">All</div>
                            <div className="not-read-noti">Not read yet</div>
                        </div> */}
                        <div className="flex px-4 mt-3 ml-4 sm:px-0">
                            <div className="flex flex-row gap-2">
                                <div className="font-semibold text-gray-500 bg-gray-100 text-sm leading-normal whitespace-nowrap px-3.5 py-1.5 rounded-md cursor-pointer hover:bg-cyan-300 transition-colors duration-200">
                                    All
                                </div>
                                <div className="font-semibold text-gray-500 bg-gray-100 text-sm leading-normal whitespace-nowrap px-1.5 py-1.5 rounded-md cursor-pointer hover:bg-cyan-300 transition-colors duration-200">
                                    Not read yet
                                </div>
                            </div>
                            <div className="flex items-end justify-end w-full pr-2">
                                <div className="font-semibold text-gray-500 text-[13px] leading-normal whitespace-nowrap cursor-pointer hover:text-[#344258] transition-colors duration-200">
                                    VIEW ALL
                                </div>
                            </div>
                        </div>
                        <div className="noti-list-container w-full mx-auto mt-[16.3px] px-4 sm:px-0 flex flex-col justify-center items-center gap-3">
                            {notificationData.Notifications.map((noti) => (
                                <div key={noti.NotifiId} className="flex flex-col items-start w-full gap-3 noti-item-container">
                                    <div className="noti-item">
                                        <div className="noti-content">
                                            <img
                                                className="noti-avatar"
                                                src={noti.SenderAvatar}
                                                alt={`${noti.SenderName || 'System'} avatar`}
                                            />
                                            <div className="noti-info">
                                                <p className="p-noti text-start">
                                                    {noti.SenderName && <span className="username-span">{noti.SenderName} </span>}
                                                    <span className=" noti-action line-clamp-2">{noti.Content}</span>
                                                </p>
                                                <div className="action-time">{formatTime(noti.CreatedAt)}</div>
                                            </div>
                                        </div>
                                        <img
                                            className={`noti-status ${noti.IsRead ? '' : 'noti-status-not'}`}
                                            src={readIcon}
                                            alt={noti.IsRead ? "Read" : "Unread"}
                                        />
                                    </div>
                                    <img className="noti-item-line" src={lineShape} alt="Separator" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}