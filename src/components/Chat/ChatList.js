import React, { useState } from "react";
import { Link } from "react-router-dom";
import lineShape from "../../assets/images/border_line.png";
import ChatDetails from "./ChatDetails";
import formatTime from "../../utils/formatTime";

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
            SenderAvatar: "https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png",
        },
        {
            ChatId: "chat_002",
            Acc1Id: "user_101",
            Acc2Id: "user_789",
            CreateAt: "2025-05-19T14:30:00Z",
            LastMessage: "Great setup! Can we discuss the workshop? Great setup! Can we discuss the workshop? Great setup! Can we discuss the workshop?",
            LastMessageAt: "2025-05-27T18:38:00Z",
            UnreadCount: 10,
            SenderName: "David Kim",
            SenderAvatar: "https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png",
        },
        {
            ChatId: "chat_003",
            Acc1Id: "user_101",
            Acc2Id: "user_456",
            CreateAt: "2025-05-18T09:00:00Z",
            LastMessage: "Thanks for the friend request! Thanks for the friend request!",
            LastMessageAt: "2025-05-18T09:10:00Z",
            UnreadCount: 0,
            SenderName: "Sarah Lee",
            SenderAvatar: "https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png",
        }
    ],
};

const ChatList = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedChat, setSelectedChat] = useState(null);

    // Filter chats based on search query
    const filteredChats = chatData.Chats.filter((chat) =>
        chat.SenderName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleChatClick = (chat) => {
        setSelectedChat({
            chatId: chat.ChatId,
            senderName: chat.SenderName,
            senderAvatar: chat.SenderAvatar,
        });
    };

    const handleCloseDetails = () => {
        setSelectedChat(null);
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full gap-3 px-4 mx-auto mt-3 sm:px-0">
                <div className="w-full">
                    <div className="relative">
                        <i className="absolute text-gray-500 transform -translate-y-1/2 fa-solid fa-magnifying-glass left-3 top-1/2"></i>
                        <input
                            type="text"
                            placeholder="Search chats by name"
                            className="w-full rounded-full pl-10 pr-4 py-2 text-sm text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#3DB3FB]"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            aria-label="Search chats"
                        />
                    </div>
                </div>
                {filteredChats.length > 0 ? (

                    filteredChats.map((chat) => (
                        <div key={chat.ChatId} className="flex flex-col items-start w-full gap-3">
                            <div
                                onClick={() => handleChatClick(chat)}
                                className="flex items-center w-full gap-2 cursor-pointer"
                                role="button"
                                aria-label={`Open chat with ${chat.SenderName}`}
                            >
                                <img
                                    className="object-cover rounded-full w-11 h-11"
                                    src={chat.SenderAvatar}
                                    alt={`${chat.SenderName || "User"} avatar`}
                                />
                                <div className="flex flex-col items-start justify-center flex-grow gap-1">
                                    <div className="text-[#344258] text-left text-[14px]">
                                        <p className="font-semibold cursor-pointer hover:text-[#3DB3FB] transition-colors duration-200">
                                            {chat.SenderName}
                                        </p>
                                        <span className="text-[12px] break-words line-clamp-2">{chat.LastMessage}</span>
                                    </div>
                                </div>
                                <div className="font-semibold text-[#A2A5B9] text-right text-xs min-w-[48px] h-full flex flex-col items-end gap-2">
                                    <span>{formatTime(chat.LastMessageAt)}</span>
                                    {chat.UnreadCount > 0 ? (
                                        <div className="flex items-center justify-center w-4 h-4 text-[10px] text-white bg-red-400 rounded-full cursor-pointer shrink-0 hover:bg-red-600">
                                            {chat.UnreadCount > 9 ? "9+" : chat.UnreadCount}
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center w-4 h-4"></div>
                                    )}
                                </div>
                            </div>
                            <img className="w-full h-[1px] mb-[-0.94px]" src={lineShape} alt="Separator" />
                        </div>
                    ))
                ) : (
                    <div className="text-[#344258] text-[13px] text-center py-4">No chats found</div>
                )}
            </div>
            {selectedChat && (
                <div className="fixed bottom-3 right-20 z-[50] border border-gray-300 border-solid shadow-lg h-[500px] max-w-md">
                    <ChatDetails
                        isVisible={!!selectedChat}
                        onClose={handleCloseDetails}
                        chatId={selectedChat.chatId}
                        senderName={selectedChat.senderName}
                        senderAvatar={selectedChat.senderAvatar}
                        formatTime={formatTime}
                    />
                </div>
            )}
        </>
    );
};

export default ChatList;