import React, { useState } from "react";
import ChatDetails from "../../components/Chat/ChatDetails";
import ChatList from "../../components/Chat/ChatList";
import Header from "../../components/Header/Header";
import NavbarHeader from "../../components/Header/NavbarHeader";
import formatTime from "../../utils/formatTime";
import ChatHistorySearch from "../../components/Chat/ChatHistorySearch";
import { toast, Bounce } from "react-toastify";
import { SignalRProvider } from "../../context/SignalRContext";

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [unreadChatCount, setUnreadChatCount] = useState(0);
  const currentUserId = localStorage.getItem("accId") || sessionStorage.getItem("accId");

  const handleChatSelect = (chat) => {
    if (!chat || !chat.chatId || !chat.receiverId) {
      console.warn("Invalid chat data:", chat);
      toast.error("Không thể mở cuộc trò chuyện do dữ liệu không hợp lệ!", {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
      });
      return;
    }

    setSelectedChat({
      chatId: chat.chatId,
      receiverId: chat.receiverId, // Sử dụng receiverId trực tiếp
      senderName: chat.senderName || "Unknown User",
      senderAvatar: chat.senderAvatar || null,
    });
  };

  const handleUnreadCountChange = (count) => {
    setUnreadChatCount(count);
  };

  return (
    <SignalRProvider>
      <div>
        <Header />
        <NavbarHeader />
        <div className="grid grid-cols-12 md:pt-[120px] pt-[60px] mx-auto md:px-10 overflow-hidden">
          <div className="col-span-12 md:col-span-4 lg:col-span-3 p-3 bg-white rounded-lg shadow-lg max-h-[calc(100vh-120px)] overflow-y-auto">
            <ChatList
              onChatSelect={handleChatSelect}
              onUnreadCountChange={handleUnreadCountChange}
            />
          </div>
          <div className="col-span-12 md:col-span-8 lg:col-span-6 mt-4 md:mt-0 border border-gray-200 rounded-lg bg-white h-[calc(100vh-120px)] flex flex-col">
            {selectedChat ? (
              <ChatDetails
                isVisible={!!selectedChat}
                onClose={() => setSelectedChat(null)}
                chatId={selectedChat.chatId}
                receiverId={selectedChat.receiverId}
                senderName={selectedChat.senderName}
                senderAvatar={selectedChat.senderAvatar}
                formatTime={formatTime}
                currentUserId={currentUserId}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-600 text-sm">
                Please select a conversation to view details
              </div>
            )}
          </div>
          <div className="col-span-12 md:col-span-4 lg:col-span-3 mt-4 md:mt-0 p-3 bg-white rounded-lg shadow-lg max-h-[calc(100vh-120px)] overflow-y-auto">
            <ChatHistorySearch
              selectedChat={selectedChat}
              formatTime={formatTime}
              currentUserId={currentUserId}
            />
          </div>
        </div>
      </div>
    </SignalRProvider>
  );
};

export default ChatPage;