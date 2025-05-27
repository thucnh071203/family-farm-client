import React, { useEffect } from "react";
import cancelIcon from "../../assets/images/cancel_vector.png";
import headLine from "../../assets/images/head_line.png";
import ChatList from "./ChatList";

const ChatListPopup = ({ onToggle, isVisible }) => {
    // Close chat popup
    useEffect(() => {
        const handleClose = () => onToggle();
        window.addEventListener("closeChat", handleClose);
        return () => window.removeEventListener("closeChat", handleClose);
    }, [onToggle]);

    return (
        <div className="relative">
            <div
                className="chat-box"
                onClick={onToggle}
                role="button"
                aria-label="Toggle chats"
                aria-expanded={isVisible}
            >
                <i className={`fa-solid fa-comment ${isVisible ? "text-[#3DB3FB]" : ""}`}></i>
                <div className="chat-number">2</div>
            </div>

            {isVisible && (
                <div className="fixed right-5 top-16 max-w-sm z-[50] border border-gray-300 border-solid shadow-lg rounded-xl max-h-[90vh] overflow-y-auto">
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
                                <div className="font-semibold text-gray-500 text-[13px] leading-normal whitespace-nowrap cursor-pointer hover:text-[#344258] transition-colors duration-200">
                                    VIEW ALL
                                </div>
                            </div>
                        </div>
                        <ChatList />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatListPopup;