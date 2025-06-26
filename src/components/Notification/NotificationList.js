import React from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import "./notificationstyle.css";
import cancelIcon from "../../assets/images/cancel_vector.png";
import headLine from "../../assets/images/head_line.png";
import readIcon from "../../assets/images/letter_vector.png";
import lineShape from "../../assets/images/border_line.png";
import formatTime from "../../utils/formatTime";
import instance from "../../Axios/axiosConfig";
import { useNotification } from "../../context/NotificationContext";


const NotificationList = ({ onToggle, isVisible }) => {

    const {
        notifications,
        unreadCount,
        loading,
        error,
        markAsRead,
        markAllAsRead,
    } = useNotification();
    
    return (
        <div className="relative">
            <div
                className="notifi-box"
                onClick={onToggle}
                role="button"
                aria-label="Toggle notifications"
                aria-expanded={isVisible}
            >
                <i className={`fa-solid fa-bell ${isVisible ? "text-[#3DB3FB]" : ""}`}></i>
                <div className="notifi-number">{unreadCount > 0 ? unreadCount : 0}</div>
            </div>

            {isVisible && (
                <div className="popup-notifi fixed md:right-5 right-0 top-16 max-w-sm z-[50] border border-gray-300 border-solid shadow-lg rounded-xl md:h-[90vh] h-[95vh]">
                    <div className="w-full h-full p-4 pt-4 bg-white rounded-xl">
                        <div className="flex items-center justify-between w-full px-4 mx-auto popup-header sm:px-0">
                            <div className="popup-title">Notifications</div>
                            <div
                                className="cancel-notifi"
                                onClick={() => onToggle()}
                                role="button"
                                aria-label="Close notifications"
                            >
                                <img className="vector" src={cancelIcon} alt="Close" />
                            </div>
                        </div>
                        <img className="w-full mt-3 header-noti-line" src={headLine} alt="Header line" />
                        <div className="flex px-4 mt-3 sm:px-0">
                            <div className="flex flex-row gap-2">
                                <div className="font-semibold text-gray-500 bg-gray-100 text-sm leading-normal whitespace-nowrap px-3.5 py-1.5 rounded-md cursor-pointer hover:bg-cyan-300 transition-colors duration-200">
                                    All
                                </div>
                                <div className="font-semibold text-gray-500 bg-gray-100 text-sm leading-normal whitespace-nowrap px-1.5 py-1.5 rounded-md cursor-pointer hover:bg-cyan-300 transition-colors duration-200">
                                    Not read yet
                                </div>
                            </div>
                            <div className="flex items-end justify-end w-full pr-2">
                                <div
                                    className="font-semibold text-gray-500 text-[13px] leading-normal whitespace-nowrap cursor-pointer hover:text-[#344258] transition-colors duration-200"
                                    onClick={markAllAsRead}
                                    role="button"
                                    aria-label="Mark all as read"
                                >
                                    Mark all as read
                                </div>
                            </div>
                        </div>
                        <div className="noti-list-container w-full mx-auto mt-[16.3px] px-4 sm:px-0 max-h-[75vh] overflow-y-auto flex flex-col justify-start items-start gap-3">
                            {loading ? (
                                <div className="text-center py-4">Đang tải...</div>
                            ) : error ? (
                                <div className="text-center py-4 text-red-500">{error}</div>
                            ) : notifications.length === 0 ? (
                                <div className="text-center py-4">Không có thông báo</div>
                            ) : (
                                notifications.map((noti) => (
                                    <div
                                        key={noti.notifiId}
                                        className="flex flex-col items-start w-full gap-3 noti-item-container"
                                    >
                                        <div className="noti-item">
                                            <div className="noti-content">
                                                <img
                                                    className="noti-avatar"
                                                    src={
                                                        noti.senderAvatar ||
                                                        "https://firebasestorage.googleapis.com/v0/b/prn221-69738.appspot.com/o/image%2F638844485492936808_default-avatar.jpg?alt=media&token=14e7b834-a6c0-4cb2-830d-088639d3f588"
                                                    }
                                                    alt={noti.senderName || "System"}
                                                />
                                                <div className="noti-info">
                                                    <p className="p-noti text-start line-clamp-2">
                                                        {noti.senderName && (
                                                            <span className="font-semibold username-span">
                                                                {noti.senderName}{" "}
                                                            </span>
                                                        )}
                                                        {noti.content}
                                                    </p>
                                                    <span className="action-time">{formatTime(noti.createdAt)}</span>
                                                </div>
                                            </div>
                                            <img
                                                className={`noti-status ${noti.status.isRead ? "noti-status-not" : ""}`}
                                                src={readIcon}
                                                alt={noti.status.isRead ? "Read" : "Unread"}
                                                onClick={() => !noti.status.isRead && markAsRead(noti.status.notifiStatusId)}
                                                style={{ cursor: noti.status.isRead ? "default" : "pointer" }}
                                            />
                                        </div>
                                        <img className="noti-item-line" src={lineShape} alt="Divider" />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationList;