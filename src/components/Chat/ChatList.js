import React, { useState, useEffect } from "react";
import lineShape from "../../assets/images/border_line.png";
import formatTime from "../../utils/formatTime";
import instance from "../../Axios/axiosConfig";
import { toast, Bounce } from "react-toastify";
import default_avatar from "../../assets/images/default-avatar.png";
import "react-toastify/dist/ReactToastify.css";
import { useSignalR } from "../../context/SignalRContext";

const ChatList = ({ onChatSelect = () => {}, onUnreadCountChange = () => {} }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const { connection, currentUserId } = useSignalR();
  const [unreadChatCount, setUnreadChatCount] = useState(0);

  useEffect(() => {
    console.log("Current user ID:", currentUserId);
    if (!currentUserId) {
      console.warn("No currentUserId, cannot fetch chats or connect to SignalR");
      toast.warn("Please log in to view chats", {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
      });
      return;
    }

    const fetchChats = async () => {
      setLoading(true);
      try {
        const response = await instance.get("/api/chat/get-by-user");
        console.log("Fetched chats:", response.data);
        console.log("Count chats:", response.data.unreadChatCount);
        if (response.data.success) {
          // Lọc các chat có dữ liệu hợp lệ
          const validChats = (response.data.chats || []).filter(
            (chat) => chat && chat.chatId && chat.receiver && chat.receiver.accId
          );
          console.log("Valid chats after filtering:", validChats);
          setChats(validChats);
          setUnreadChatCount(response.data.unreadChatCount || 0);
          onUnreadCountChange(response.data.unreadChatCount || 0);
        }
      } catch (error) {
        toast.error("Tải danh sách trò chuyện thất bại!", {
          position: "top-right",
          autoClose: 3000,
          transition: Bounce,
        });
        console.error("Fetch chats error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [currentUserId, onUnreadCountChange]);

  useEffect(() => {
    if (!connection) {
      console.warn("No SignalR connection available");
      return;
    }
    if (connection.state === "Connected") {
      const receiveMessageHandler = (chatDetail, chatDTO) => {
        console.log("ReceiveMessage:", { chatDetail, chatDTO });
        if (!chatDTO || !chatDTO.chatId || !chatDTO.receiver || !chatDTO.receiver.accId) {
          console.warn("Invalid or missing chatDTO:", { chatDetail, chatDTO });
          toast.warn("Received invalid message data", {
            position: "top-right",
            autoClose: 3000,
            transition: Bounce,
          });
          return;
        }
        setChats((prevChats) => {
          const existingChat = prevChats.find((c) => c.chatId === chatDTO.chatId);
          let updatedChats;
          if (existingChat) {
            updatedChats = prevChats.map((c) =>
              c.chatId === chatDTO.chatId
                ? { ...c, ...chatDTO, unreadCount: (c.unreadCount || 0) + 1 }
                : c
            );
          } else {
            updatedChats = [chatDTO, ...prevChats];
          }
          const newUnreadChatCount = updatedChats.reduce(
            (total, chat) => total + (chat.unreadCount || 0),
            0
          );
          setUnreadChatCount(newUnreadChatCount);
          onUnreadCountChange(newUnreadChatCount);
          return updatedChats.sort((a, b) => {
            if (a.unreadCount > 0 && b.unreadCount === 0) return -1;
            if (a.unreadCount === 0 && b.unreadCount > 0) return 1;
            return new Date(b.lastMessageAt || 0) - new Date(a.lastMessageAt || 0);
          });
        });
      };

      connection.on("ReceiveMessage", receiveMessageHandler);
      connection.on("MessageSeen", (chatId, chatDTO) => {
        console.log("MessageSeen:", { chatId, chatDTO });
        if (!chatId || !chatDTO || !chatDTO.chatId || !chatDTO.receiver || !chatDTO.receiver.accId) {
          console.warn("Invalid MessageSeen data:", { chatId, chatDTO });
          return;
        }
        setChats((prevChats) => {
          const updatedChats = prevChats.map((chat) =>
            chat.chatId === chatId ? { ...chat, ...chatDTO } : chat
          );
          const newUnreadChatCount = updatedChats.reduce(
            (total, chat) => total + (chat.unreadCount || 0),
            0
          );
          setUnreadChatCount(newUnreadChatCount);
          onUnreadCountChange(newUnreadChatCount);
          return updatedChats;
        });
      });

      connection.on("ChatRecalled", (chatId, chatDetailId, chatDTO) => {
        console.log("ChatRecalled:", { chatId, chatDetailId, chatDTO });
        if (!chatId || !chatDTO || !chatDTO.chatId || !chatDTO.receiver || !chatDTO.receiver.accId) {
          console.warn("Invalid ChatRecalled data:", { chatId, chatDetailId, chatDTO });
          return;
        }
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.chatId === chatId ? { ...chat, ...chatDTO } : chat
          )
        );
      });
      connection.on("ChatHistoryDeleted", (chatId) => {
        console.log("ChatHistoryDeleted:", chatId);
        if (!chatId) {
          console.warn("Invalid chatId for ChatHistoryDeleted");
          return;
        }
        setChats((prevChats) => prevChats.filter((chat) => chat.chatId !== chatId));
        toast.info("Lịch sử trò chuyện đã bị xóa.", {
          position: "top-right",
          autoClose: 3000,
          transition: Bounce,
        });
      });

      return () => {
        console.log("Cleaning up SignalR event handlers");
        connection.off("ReceiveMessage", receiveMessageHandler);
        connection.off("MessageSeen");
        connection.off("ChatRecalled");
        connection.off("ChatHistoryDeleted");
      };
    }
  }, [connection]);

  const filteredChats = chats.filter((chat) =>
    chat && chat.receiver && chat.receiver.fullName
      ? chat.receiver.fullName.toLowerCase().includes(searchQuery.toLowerCase())
      : false // Chỉ giữ chat có fullName hợp lệ để tránh hiển thị chat không hợp lệ
  );

  useEffect(() => {
    console.log("Filtered chats:", filteredChats);
  }, [filteredChats]);

  const handleChatClick = (chat) => {
    if (!chat || !chat.receiver || !chat.receiver.accId) {
      console.warn("Invalid chat in handleChatClick:", chat);
      toast.warn("Dữ liệu cuộc trò chuyện không hợp lệ!", {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
      });
      return;
    }
    onChatSelect({
      chatId: chat.chatId,
      receiverId: chat.receiver.accId, // Truyền receiverId đúng cách
      senderName: chat.receiver.fullName || chat.receiver.username || "Unknown User",
      senderAvatar: chat.receiver.avatar || default_avatar,
    });
  };

  if (!currentUserId) {
    return <div className="text-center py-4">Please log in to view chats</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full gap-3 mx-auto mt-3 chat-list">
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
      {loading ? (
        <div className="text-[#344258] text-[13px] text-center py-4">Loading...</div>
      ) : filteredChats.length > 0 ? (
        filteredChats.map((chat) => (
          <div key={chat.chatId} className="flex flex-col items-start w-full gap-3">
            <div
              onClick={() => handleChatClick(chat)}
              className="flex items-center w-full gap-2 cursor-pointer"
              role="button"
              aria-label={`Open chat with ${chat.receiver?.fullName || "User"}`}
            >
              <img
                className="object-cover rounded-full w-11 h-11"
                src={chat.receiver?.avatar || default_avatar}
                alt={`${chat.receiver?.fullName || "User"} avatar`}
              />
              <div className="flex flex-col items-start justify-center flex-grow gap-1 rich-text-editor">
                <div className="text-[#344258] text-left text-[14px]">
                  <p className="font-semibold cursor-pointer hover:text-[#3DB3FB] transition-colors duration-200">
                    {chat.receiver?.fullName || "Unknown User"}
                  </p>
                  <div className="text-[12px] mt-1 truncate max-w-[200px] overflow-hidden whitespace-nowrap">
                    {chat.lastMessageAccId === currentUserId ? (
                      <span className="flex line-clamp-2 break-all w-fit overflow-hidden">
                        You: <span dangerouslySetInnerHTML={{ __html: chat.lastMessage || "" }} />
                      </span>
                    ) : (
                      <span dangerouslySetInnerHTML={{ __html: chat.lastMessage || "" }} />
                    )}
                  </div>
                </div>
              </div>
              <div className="font-semibold text-[#A2A5B9] text-right text-xs min-w-[48px] h-full flex flex-col items-end gap-2">
                <span>{formatTime(chat.lastMessageAt)}</span>
                {chat.unreadCount > 0 ? (
                  <div className="flex items-center justify-center w-4 h-4 text-[10px] text-white bg-red-400 rounded-full cursor-pointer shrink-0 hover:bg-red-600">
                    {chat.unreadCount > 9 ? "9+" : chat.unreadCount}
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
  );
};

export default ChatList;