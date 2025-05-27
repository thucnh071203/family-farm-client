import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import cancelIcon from "../../assets/images/cancel_vector.png";
import headLine from "../../assets/images/head_line.png";
import readIcon from "../../assets/images/letter_vector.png";
import lineShape from "../../assets/images/border_line.png";

const chatData = {
    Success: true,
    Message: "Chats retrieved successfully",
    unreadChatCount: 2,
    Chats: [
        {
            ChatId: "chat_001",
            Acc1Id: "user_101",
            Acc2Id: "user_123",
            CreateAt: "2025-05-20T10:00:00Z",
            LastMessage: "Hey, check out my new farm photos!",
            LastMessageAt: "2025-05-26T11:20:00Z",
            UnreadCount: 1,
            SenderName: "Alis Wells",
            SenderAvatar: "https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png"
        },
        {
            ChatId: "chat_002",
            Acc1Id: "user_101",
            Acc2Id: "user_789",
            CreateAt: "2025-05-19T14:30:00Z",
            LastMessage: "Great setup! Can we discuss the workshop? Great setup! Can we discuss the workshop? Great setup! Can we discuss the workshop?",
            LastMessageAt: "2025-05-25T15:30:00Z",
            UnreadCount: 1000,
            SenderName: "David Kim",
            SenderAvatar: "https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png"
        },
        {
            ChatId: "chat_003",
            Acc1Id: "user_101",
            Acc2Id: "user_456",
            CreateAt: "2025-05-18T09:00:00Z",
            LastMessage: "Thanks for the friend request!",
            LastMessageAt: "2025-05-24T09:10:00Z",
            UnreadCount: 0,
            SenderName: "Sarah Lee",
            SenderAvatar: "https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png"
        }
    ]
};

export default function ChatList({ onToggle, isVisible }) {
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Close chat popup
    useEffect(() => {
        const handleClose = () => setIsChatVisible(false);
        window.addEventListener("closeChat", handleClose);
        return () => window.removeEventListener("closeChat", handleClose);
    }, []);

    // Format time to display "X minutes ago" or similar
    const formatTime = (createdAt) => {
        const now = new Date();
        const created = new Date(createdAt);
        const diffMs = now - created;
        const diffMins = Math.floor(diffMs / 60000); // Convert to minutes
        if (diffMins < 1) return "Just now";
        if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''}`;
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''}`;
        const diffDays = Math.floor(diffHours / 24);
        return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
    };

    // Filter chats based on search query
    const filteredChats = chatData.Chats.filter((chat) =>
        chat.SenderName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // const handleToggle = () => {
    //     if (!isChatVisible) {
    //         setIsChatVisible(true); // Mở popup nếu đang đóng
    //         onToggle(); // Cập nhật activePopup
    //     } else if (isActive) {
    //         setIsChatVisible(false); // Đóng popup nếu đang mở và active
    //     } else {
    //         onToggle(); // Nổi popup lên nếu đang mở nhưng không active
    //     }
    // };

    return (
        <div className="relative">
            <div
                className="chat-box"
                onClick={onToggle}
                role="button"
                aria-label="Toggle chats"
                aria-expanded={isVisible}
            >
                <i className={`fa-solid fa-comment ${isVisible ? 'text-[#3DB3FB]' : ''}`}></i>
                <div className="chat-number">{chatData.unreadChatCount}</div>
            </div>

            {isVisible && (
                <div className="fixed right-5 top-16 max-w-[400px] w-[90%] sm:w-[400px] z-[50]">
                    <div className="w-full h-full p-4 pt-4 bg-slate-200">
                        <div className="w-full flex justify-between items-center mx-auto px-4 sm:px-0 h-[35px]">
                            <div className="font-bold text-black text-[18px] leading-normal whitespace-nowrap">
                                Chats
                            </div>
                            <div
                                className="flex w-[35px] h-[35px] items-center justify-center gap-2.5 p-1.5 bg-gray-400 rounded-full overflow-hidden cursor-pointer hover:bg-gray-600"
                                onClick={() => setIsChatVisible(false)}
                                role="button"
                                aria-label="Close chats"
                            >
                                <img className="w-[12.62px] h-[12.62px]" src={cancelIcon} alt="Close" />
                            </div>
                        </div>
                        <div className="w-full] mx-auto px-4 sm:px-0 mt-3">
                            <div className="relative">
                                <i className="absolute text-gray-500 transform -translate-y-1/2 fa-solid fa-magnifying-glass left-3 top-1/2"></i>
                                <input
                                    type="text"
                                    placeholder="Search chats by name"
                                    className="w-full pl-10 pr-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3DB3FB]"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    aria-label="Search chats"
                                />
                            </div>
                        </div>
                        <img className="w-full h-[1px] object-cover mt-3" src={headLine} alt="Header line" />
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
                        <div className="flex flex-col items-center justify-center w-full gap-3 px-4 mx-auto mt-3 sm:px-0">
                            {filteredChats.length > 0 ? (
                                filteredChats.map((chat) => (
                                    <div key={chat.ChatId} className="flex flex-col items-start w-full gap-3">
                                        <Link to={`/chat/${chat.ChatId}`} className="flex items-center w-full gap-2">
                                            <img
                                                className="object-cover rounded-full w-11 h-11"
                                                src={chat.SenderAvatar}
                                                alt={`${chat.SenderName || 'User'} avatar`}
                                            />
                                            <div className="flex flex-col items-start justify-center flex-grow gap-1">
                                                <div className="text-[#344258] text-left text-[14px]">
                                                    <p className="font-semibold cursor-pointer hover:text-[#3DB3FB] transition-colors duration-200">
                                                        {chat.SenderName}{' '}
                                                    </p>
                                                    <span className="text-[12px] break-words line-clamp-2">{chat.LastMessage}</span>
                                                </div>
                                            </div>
                                            <div className="font-semibold text-[#A2A5B9] text-right text-xs min-w-[48px] h-full flex flex-col items-end gap-2">
                                                <span>{formatTime(chat.LastMessageAt)}</span>
                                                {chat.UnreadCount > 0 ? (
                                                    <div className="flex items-center justify-center w-4 h-4 text-[10px] text-white bg-red-400 rounded-full cursor-pointer shrink-0 hover:bg-red-600">
                                                        {chat.UnreadCount > 9 ? (
                                                            9 + "+"
                                                        ) : (
                                                            chat.UnreadCount
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center justify-center w-4 h-4"></div>
                                                )}
                                            </div>
                                        </Link>
                                        <img className="w-full h-[1px] mb-[-0.94px]" src={lineShape} alt="Separator" />
                                    </div>
                                ))
                            ) : (
                                <div className="text-[#344258] text-[13px] text-center py-4">
                                    No chats found
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}