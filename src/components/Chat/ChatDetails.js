import React, { useState, useRef, useEffect } from "react";
import cancelIcon from "../../assets/images/cancel_vector.png";
import headLine from "../../assets/images/head_line.png";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import formatTime from "../../utils/formatTime";

const chatDetailsData = {
    Success: true,
    Message: "Chat details retrieved successfully",
    ChatDetails: [
        {
            ChatDetailId: "detail_001",
            Message: "Hey, check out my new farm photos!",
            FileUrl: null,
            FileType: null,
            FileName: null,
            SendAt: "2023-05-20T09:30:00Z",
            IsRecalled: false,
            IsSeen: true,
            ChatId: "chat_001",
            SenderId: "user_123",
            ReceiverId: "user_101",
        },
        {
            ChatDetailId: "detail_002",
            Message: "Hi",
            FileUrl: "https://firebasestorage.googleapis.com/v0/b/prn221-69738.appspot.com/o/image%2F638819670122900265_benh_la_vang.png?alt=media&token=f3205be8-8e44-4389-835f-828a8b1a8c16",
            FileType: "image",
            FileName: "FarmImage.jpg",
            SendAt: "2024-05-25T10:00:00Z",
            IsRecalled: false,
            IsSeen: false,
            ChatId: "chat_001",
            SenderId: "user_101",
            ReceiverId: "user_123",
        },
        {
            ChatDetailId: "detail_003",
            Message: "Looks great! Can you share more photos?",
            FileUrl: null,
            FileType: null,
            FileName: null,
            SendAt: "2024-05-25T10:30:00Z",
            IsRecalled: false,
            IsSeen: false,
            ChatId: "chat_001",
            SenderId: "user_123",
            ReceiverId: "user_101",
        },
        {
            ChatDetailId: "detail_006",
            Message: "Looks great! Can you share more photos?",
            FileUrl: null,
            FileType: null,
            FileName: null,
            SendAt: "2024-05-25T10:30:00Z",
            IsRecalled: false,
            IsSeen: false,
            ChatId: "chat_001",
            SenderId: "user_123",
            ReceiverId: "user_101",
        },
        {
            ChatDetailId: "detail_007",
            Message: "Looks great! Can you share more photo sad as                ddddddddddddddddddddddddssssssssssssssssssssssssddddds?",
            FileUrl: null,
            FileType: null,
            FileName: null,
            SendAt: "2024-05-25T10:30:00Z",
            IsRecalled: false,
            IsSeen: false,
            ChatId: "chat_001",
            SenderId: "user_123",
            ReceiverId: "user_101",
        },
        {
            ChatDetailId: "detail_008",
            Message: "Looks great! Can you share more photos?",
            FileUrl: null,
            FileType: null,
            FileName: null,
            SendAt: "2024-05-25T10:30:00Z",
            IsRecalled: false,
            IsSeen: false,
            ChatId: "chat_001",
            SenderId: "user_123",
            ReceiverId: "user_101",
        },
        {
            ChatDetailId: "detail_004",
            Message: "Great setup! Can we discuss the workshop?",
            FileUrl: "https://example.com/docs/workshop.pdf",
            FileType: "file",
            FileName: "Workshop.pdf",
            SendAt: "2025-05-25T15:30:00Z",
            IsRecalled: false,
            IsSeen: false,
            ChatId: "chat_002",
            SenderId: "user_789",
            ReceiverId: "user_101",
        }
    ],
};

const modules = {
    toolbar: false,
};

const formats = ["bold", "italic", "underline"];

const ChatDetails = ({ isVisible, onClose, chatId, senderName, senderAvatar, currentUserId = "user_101" }) => {
    const [content, setContent] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const quillRef = useRef(null);
    const imageInputRef = useRef(null);
    const fileInputRef = useRef(null);
    const messagesEndRef = useRef(null); // Thêm ref cho điểm neo cuối danh sách tin nhắn

    // Hàm cuộn xuống tin nhắn cuối cùng
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const filteredDetails = chatDetailsData.ChatDetails
        .filter((detail) => detail.ChatId === chatId)
        .sort((a, b) => new Date(a.SendAt) - new Date(b.SendAt));
        
    // Sử dụng useEffect để cuộn khi component được render hoặc chatId thay đổi
    useEffect(() => {
        scrollToBottom();
    }, [chatId, filteredDetails]); // Phụ thuộc vào chatId và filteredDetails để cuộn lại khi có tin nhắn mới

    if (!isVisible) return null;

    const messageGroups = [];
    let currentGroup = null;
    const TIME_THRESHOLD = 5 * 60 * 1000;

    filteredDetails.forEach((detail, index) => {
        const prevDetail = index > 0 ? filteredDetails[index - 1] : null;
        const currentTime = new Date(detail.SendAt).getTime();
        const prevTime = prevDetail ? new Date(prevDetail.SendAt).getTime() : null;

        const isNewGroup =
            !prevDetail ||
            detail.SenderId !== prevDetail.SenderId ||
            (prevTime && currentTime - prevTime >= TIME_THRESHOLD);

        if (isNewGroup) {
            currentGroup = {
                senderId: detail.SenderId,
                messages: [],
                timestamp: detail.SendAt,
            };
            messageGroups.push(currentGroup);
        }

        currentGroup.messages.push(detail);
    });

    const toggleFormat = (format) => {
        if (quillRef.current) {
            const editor = quillRef.current.getEditor();
            const isActive = editor.getFormat()[format];
            editor.format(format, !isActive);
        }
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile({
                file,
                url: URL.createObjectURL(file),
                type: file.type.startsWith("image/") ? "image" : "file",
                name: file.name,
            });
        }
    };

    const removeSelectedFile = () => {
        if (selectedFile?.url) {
            URL.revokeObjectURL(selectedFile.url);
        }
        setSelectedFile(null);
        if (imageInputRef.current) imageInputRef.current.value = "";
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSend = () => {
        if (content.trim() || selectedFile) {
            console.log("Message sent:", { content, file: selectedFile });
            setContent("");
            removeSelectedFile();
            scrollToBottom(); // Cuộn xuống dưới sau khi gửi tin nhắn
        }
    };

    return (
        <div className="flex flex-col w-full h-full p-2 pt-4 bg-white">
            <div className="w-full flex justify-between items-center mx-auto px-4 sm:px-0 h-[35px]">
                <div className="flex items-center gap-2">
                    <img
                        className="object-cover w-8 h-8 rounded-full"
                        src={senderAvatar}
                        alt={`${senderName || "User"} avatar`}
                    />
                    <div className="font-bold text-black text-[18px] leading-normal whitespace-nowrap">
                        {senderName}
                    </div>
                </div>
                <div
                    className="flex w-[35px] h-[35px] items-center justify-center gap-2.5 p-1.5 bg-[#c0bebe] rounded-full overflow-hidden cursor-pointer hover:bg-[#999999]"
                    onClick={onClose}
                    role="button"
                    aria-label="Close chat details"
                >
                    <img className="w-[12.62px] h-[12.62px]" src={cancelIcon} alt="Close" />
                </div>
            </div>
            <img className="w-full h-[1px] object-cover mt-3" src={headLine} alt="Header line" />
            <div className="flex flex-col flex-1 gap-2 p-1 mt-3 overflow-x-hidden overflow-y-auto">
                {messageGroups.length > 0 ? (
                    messageGroups.map((group, groupIndex) => (
                        <div key={`group-${groupIndex}`} className="flex flex-col w-full gap-1">
                            {(groupIndex === 0 ||
                                new Date(group.timestamp).getTime() -
                                new Date(messageGroups[groupIndex - 1].timestamp).getTime() >=
                                TIME_THRESHOLD) && (
                                    <div className="text-center text-xs text-[#A2A5B9] my-2">
                                        {formatTime(group.timestamp)}
                                    </div>
                                )}
                            <div
                                className={`flex flex-col ${group.senderId === currentUserId ? "items-end" : "items-start"} w-full`}
                            >
                                {group.messages.map((detail, msgIndex) => (
                                    <div
                                        key={`${detail.ChatDetailId}-${msgIndex}`}
                                        className={`flex items-end gap-2 ${group.senderId === currentUserId ? "flex-row-reverse" : "flex-row"} ${msgIndex > 0 ? "mt-1" : ""} w-full`}
                                    >
                                        {group.senderId !== currentUserId && msgIndex === group.messages.length - 1 ? (
                                            <img
                                                className="object-cover w-6 h-6 rounded-full"
                                                src={senderAvatar}
                                                alt={`${senderName || "User"} avatar`}
                                            />
                                        ) : (
                                            group.senderId !== currentUserId && <div className="w-6 h-6" />
                                        )}
                                        <div className={`flex flex-col gap-1 max-w-[80%] ${group.senderId === currentUserId ? "items-end" : "items-start"}`}>
                                            {detail.IsRecalled ? (
                                                <div
                                                    className={`p-2 rounded-lg ${group.senderId === currentUserId ? "bg-[#3DB3FB] text-white" : "bg-gray-100 text-[#344258]"} break-all w-fit overflow-hidden`}
                                                >
                                                    <p className={`text-sm italic ${group.senderId === currentUserId ? "text-right" : "text-left"}`}>Message recalled</p>
                                                </div>
                                            ) : (
                                                <>
                                                    {detail.FileUrl && detail.FileType === "image" && (
                                                        <a href={detail.FileUrl} target="_blank" rel="noopener noreferrer" className="w-fit">
                                                            <img
                                                                src={detail.FileUrl}
                                                                alt={detail.FileName || "Image"}
                                                                className="max-w-[150px] w-full h-auto rounded-md"
                                                            />
                                                        </a>
                                                    )}
                                                    {detail.FileUrl && detail.FileType === "file" && (
                                                        <div
                                                            className={`p-2 rounded-lg ${group.senderId === currentUserId ? "bg-[#3DB3FB] text-white" : "bg-gray-100 text-[#344258]"} break-all w-fit overflow-hidden`}
                                                        >
                                                            <a
                                                                href={detail.FileUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className={`text-sm underline truncate max-w-[150px] ${group.senderId === currentUserId ? "text-right" : "text-left"} block`}
                                                            >
                                                                {detail.FileName || "File"}
                                                            </a>
                                                        </div>
                                                    )}
                                                    {detail.Message && (
                                                        <div
                                                            className={`p-2 rounded-lg ${group.senderId === currentUserId ? "bg-[#3DB3FB] text-white" : "bg-gray-100 text-[#344258]"} break-all w-fit overflow-hidden`}
                                                        >
                                                            <p className={`text-sm ${group.senderId === currentUserId ? "text-right" : "text-left"}`}>{detail.Message}</p>
                                                        </div>
                                                    )}
                                                    {!detail.Message && !detail.FileUrl && (
                                                        <div
                                                            className={`p-2 rounded-lg ${group.senderId === currentUserId ? "bg-[#3DB3FB] text-white" : "bg-gray-100 text-[#344258]"} break-all w-fit overflow-hidden`}
                                                        >
                                                            <p className={`text-sm italic ${group.senderId === currentUserId ? "text-right" : "text-left"}`}>No content</p>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                        {group.senderId === currentUserId && msgIndex === group.messages.length - 1 && (
                                            <span className="text-xs text-[#A2A5B9] ml-1">
                                                {detail.IsSeen ? "✓✓" : "✓"}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-[#344258] text-[13px] text-center py-4">No messages found</div>
                )}
                <div ref={messagesEndRef} /> {/* Điểm neo để cuộn xuống */}
            </div>
            <hr />
            <div className="w-full sm:px-0 rich-text-editor">
                <div className="flex items-center gap-2 p-1">
                    <label
                        htmlFor="imageInput"
                        className="p-1 border border-gray-300 rounded cursor-pointer hover:bg-gray-300"
                        aria-label="Upload image"
                    >
                        <i className="fas fa-image"></i>
                    </label>
                    <input
                        type="file"
                        id="imageInput"
                        accept="image/*"
                        className="hidden"
                        ref={imageInputRef}
                        onChange={handleFileSelect}
                    />
                    <label
                        htmlFor="fileInput"
                        className="p-1 border border-gray-300 rounded cursor-pointer hover:bg-gray-300"
                        aria-label="Upload file"
                    >
                        <i className="fas fa-paperclip"></i>
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                    />
                    <button
                        onClick={() => toggleFormat("bold")}
                        className="p-1 cursor-pointer hover:bg-gray-300"
                        aria-label="Toggle bold text"
                    >
                        <i className="fas fa-bold"></i>
                    </button>
                    <button
                        onClick={() => toggleFormat("italic")}
                        className="p-1 cursor-pointer hover:bg-gray-300"
                        aria-label="Toggle italic text"
                    >
                        <i className="fas fa-italic"></i>
                    </button>
                    <button
                        onClick={() => toggleFormat("underline")}
                        className="p-1 cursor-pointer hover:bg-gray-300"
                        aria-label="Toggle underline text"
                    >
                        <i className="fas fa-underline"></i>
                    </button>
                </div>
                {selectedFile && (
                    <div className="flex items-center w-full gap-2 p-2 mt-1 bg-gray-100 rounded-md">
                        {selectedFile.type === "image" ? (
                            <img
                                src={selectedFile.url}
                                alt="Preview"
                                className="object-cover w-12 h-12 rounded"
                            />
                        ) : (
                            <span className="text-sm text-[#344258] truncate max-w-[150px]">
                                {selectedFile.name}
                            </span>
                        )}
                        <button
                            onClick={removeSelectedFile}
                            className="p-1 text-red-500 hover:text-red-700"
                            aria-label="Remove file"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                )}
                <div className="flex items-end border border-gray-300 rounded-md">
                    <ReactQuill
                        ref={quillRef}
                        value={content}
                        onChange={setContent}
                        className="flex-1 text-sm bg-white border-none"
                        placeholder="Type message..."
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        style={{ maxHeight: "100px", overflowY: "auto" }}
                    />
                    <button
                        onClick={handleSend}
                        className="h-full p-3 text-[#3DB3FB] rounded-r-md"
                        aria-label="Send message"
                    >
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatDetails;