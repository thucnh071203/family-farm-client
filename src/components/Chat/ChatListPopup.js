import React, { useEffect, useState } from "react";
import cancelIcon from "../../assets/images/cancel_vector.png";
import headLine from "../../assets/images/head_line.png";
import ChatList from "./ChatList";
import ChatDetails from "./ChatDetails";
import formatTime from "../../utils/formatTime";
import { Link } from "react-router-dom";
import { SignalRProvider } from "../../context/SignalRContext";

const ChatListPopup = ({ onToggle, isVisible }) => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [unreadChatCount, setUnreadChatCount] = useState(0); // Thêm state để lưu unreadChatCount

    // Close chat popup
    useEffect(() => {
        const handleClose = () => onToggle();
        window.addEventListener("closeChat", handleClose);
        return () => window.removeEventListener("closeChat", handleClose);
    }, [onToggle]);

    const handleChatSelect = (chat) => {
        setSelectedChat(chat);
    };

    const handleCloseDetails = () => {
        setSelectedChat(null);
    };

    // Hàm nhận unreadChatCount từ ChatList
    const handleUnreadCountChange = (count) => {
        setUnreadChatCount(count);
    };

    return (
        <SignalRProvider>
            <div className="relative">
                <div
                    className="chat-box"
                    onClick={onToggle}
                    role="button"
                    aria-label="Toggle chats"
                    aria-expanded={isVisible}
                >
                    <i className={`fa-solid fa-comment ${isVisible ? "text-[#3DB3FB]" : ""}`}></i>
                    <div className="chat-number">{unreadChatCount}</div>
                </div>

                {isVisible && (
                    <div className="fixed md:right-5 right-0 top-16 max-w-sm z-[50] border border-gray-300 border-solid shadow-lg rounded-xl h-[90vh] overflow-y-auto">
                        <div className="w-full h-full p-4 pt-4 bg-white rounded-xl">
                            <div className="w-full flex justify-between items-center mx-auto px-4 sm:px-0 h-[35px]">
                                <div className="font-bold text-black text-[18px] leading-normal whitespace-nowrap">
                                    Chats
                                </div>
                                <div
                                    className="flex w-[35px] h-[35px] items-center justify-center gap-2.5 p-1.5 bg-[#c0bebe] rounded-full overflow-hidden cursor-pointer hover:bg-[#999999]"
                                    onClick={onToggle}
                                    role="button"
                                    aria-label="Close chats"
                                >
                                    <img className="w-[12.62px] h-[12.62px]" src={cancelIcon} alt="Close" />
                                </div>
                            </div>
                            <img className="w-full h-[1px] object-cover mt-3" src={headLine} alt="Header line" />
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
                                    <Link
                                        to="/Chats"
                                        className="font-semibold text-gray-500 text-[13px] leading-normal whitespace-nowrap cursor-pointer hover:text-[#344258] transition-colors duration-200"
                                    >
                                        VIEW ALL
                                    </Link>
                                </div>
                            </div>
                            <ChatList
                                onChatSelect={handleChatSelect}
                                onUnreadCountChange={handleUnreadCountChange} // Truyền callback
                            />
                        </div>
                    </div>
                )}

                {selectedChat && (
                    <div className="chat-details-container fixed md:bottom-3 md:right-20 bottom-0 right-0 z-[50] border border-gray-300 border-solid shadow-lg md:h-[500px] max-w-sm">
                        <ChatDetails
                            isVisible={!!selectedChat}
                            onClose={handleCloseDetails}
                            chatId={selectedChat.chatId}
                            receiverId={selectedChat.receiverId}
                            senderName={selectedChat.senderName}
                            senderAvatar={selectedChat.senderAvatar}
                            formatTime={formatTime}
                            currentUserId={
                                localStorage.getItem("accId") || sessionStorage.getItem("accId")
                            }
                        />
                    </div>
                )}
            </div>
        </SignalRProvider>
    );
};

export default ChatListPopup;