import React, { useState } from "react";
import ChatDetails from "../../components/Chat/ChatDetails";
import ChatList from "../../components/Chat/ChatList";
import Header from "../../components/Header/Header";
import NavbarHeader from "../../components/Header/NavbarHeader";
import formatTime from "../../utils/formatTime";
import ChatHistorySearch from "../../components/Chat/ChatHistorySearch";

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const currentUserId = localStorage.getItem("accId") || sessionStorage.getItem("accId");

  const handleChatSelect = (chat) => {
    setSelectedChat({
      chatId: chat.chatId,
      receiverId: chat.receiverId,
      senderName: chat.senderName,
      senderAvatar: chat.senderAvatar,
    });
  };

  return (
    <div>
      <Header />
      <NavbarHeader />
      <div className="grid grid-cols-12 md:gap-4 md:pt-[120px] pt-[60px] mx-auto px-5 max-w-[1400px] overflow-hidden">
        <div className="col-span-12 md:col-span-4 lg:col-span-3 p-3 bg-white rounded-lg shadow-lg max-h-[calc(100vh-120px)] overflow-y-auto">
          <ChatList onChatSelect={handleChatSelect} />
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
              Vui lòng chọn một cuộc trò chuyện để xem chi tiết
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
  );
};

export default ChatPage;