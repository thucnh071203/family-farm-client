import React, { useState , useRef, useEffect} from 'react';

const ChatList = () => {
    const [isChatListVisible, setIsChatListVisible] = useState(false);
    const chatListRef = useRef(null);
    // Dữ liệu mẫu dựa trên ListChatResponseDTO
    const chatData = {
        Success: true,
        Message: "Chats retrieved successfully",
        unreadChatCount: 1,
        Chats: [
            { id: 1, user: 'John Doe', message: 'Hey, how’s it going?', time: '10:30 AM' },
            { id: 2, user: 'Jane Smith', message: 'Check out this new crop!', time: '9:15 AM' },
            { id: 3, user: 'Mike Brown', message: 'Need help with planting?', time: 'Yesterday' },
        ],
    };

    const toggleChatList = () => {
        setIsChatListVisible((prev) => !prev);
    };

    // Xử lý sự kiện click bên ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (chatListRef.current && !chatListRef.current.contains(event.target)) {
                setIsChatListVisible(false);
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
                    <ul className="max-h-64 overflow-y-auto">
                        {chatData.Chats.length > 0 ? (
                            chatData.Chats.map((chat) => (
                                <li key={chat.id}
                                    className="p-4 border-b hover:bg-gray-100 transition-colors duration-200">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium text-gray-800">{chat.user}</p>
                                            <p className="text-sm text-gray-600 truncate">{chat.message}</p>
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