import React, { useState, useRef, useEffect } from 'react';

const ChatList = () => {
    const [isChatListVisible, setIsChatListVisible] = useState(false);
    const chatListRef = useRef(null);
    // Dữ liệu mẫu dựa trên ListChatResponseDTO
    const chatData = {
        Success: true,
        Message: "Chats retrieved successfully",
        unreadChatCount: 1,
        Chats: [
            { id: 1, fullName: 'John Doe', avatar: "https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png", message: 'Hey, how’s it going?', time: '10:30 AM' },
            { id: 2, fullName: 'Jane Smith', avatar: "https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png", message: 'Check out this new crop!', time: '9:15 AM' },
            { id: 3, fullName: 'Mike Brown', avatar: "https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png", message: 'Need help with planting?', time: 'Yesterday' },
        ],
    };

    const toggleChatList = () => {
        setIsChatListVisible((prev) => !prev);
    };

    // Xử lý tắt list click bên ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (chatListRef.current && !chatListRef.current.contains(event.target)) {
                setIsChatListVisible(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={chatListRef}>
            <div className="chat-box flex items-center cursor-pointer" onClick={toggleChatList}>
                <i className="fa-solid fa-comment text-gray-600"></i>
                {chatData.unreadChatCount > 0 && (
                    <div className="chat-number bg-red-500 text-white rounded-full px-2 py-1 text-xs ml-2">
                        {chatData.unreadChatCount}
                    </div>
                )}
            </div>
            {isChatListVisible && (
                <div className="absolute top-12 right-4 w-[450px] bg-white rounded-lg shadow-xl z-50 border border-gray-200">
                    <div className="p-4 border-b bg-gray-50 rounded-t-lg">
                        <h3 className="text-lg font-semibold text-gray-800">
                            List chat
                        </h3>
                    </div>
                    <ul className="max-h-64 overflow-y-auto">
                        {chatData.Chats.length > 0 ? (
                            chatData.Chats.map((chat) => (
                                <li className="p-1 border-b hover:bg-gray-100 transition-colors duration-200">
                                    <div className="flex justify-between items-center p-1">
                                        <div className='flex items-center'>
                                            <img src={chat.avatar}
                                                alt="Avatar"
                                                className="w-14 h-14 rounded-full" />
                                            <div className='p-2 text-left'>                                            
                                                <p className="font-bold">{chat.fullName}</p>
                                                <p className="text-sm text-gray-600 truncate">{chat.message}</p>                                        
                                                <span className="text-xs text-gray-500">{chat.time}</span>
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-500">{chat.time}</span>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className="p-4 text-center text-gray-500">Không có tin nhắn nào</li>
                        )}
                    </ul>
                    <div className="p-4 border-t bg-gray-50 rounded-b-lg">
                        <a
                            href="/chats"
                            className="text-blue-600 hover:underline text-sm font-medium"
                        >
                            Xem tất cả tin nhắn
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatList;