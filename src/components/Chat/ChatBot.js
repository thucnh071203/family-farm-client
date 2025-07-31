import React, { useState } from 'react';
import chatbot_icon from "../../assets/icons/Chatbot.svg";
import cancelIcon from "../../assets/images/cancel_vector.png";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hi, you can choose question below to get information",
            isBot: true,
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');

    const predefinedQuestions = [
        "How I can booking service?",
        "How I can view my booking?",
    ];

    const botResponses = {
        "default": "Thank you for your question! Our support team will help you with that. You can also try selecting one of the suggested questions above."
    };

    const handleToggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleSendMessage = (messageText = inputMessage) => {
        if (!messageText.trim()) return;

        const userMessage = {
            id: messages.length + 1,
            text: messageText,
            isBot: false,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);

        setTimeout(() => {
            const botResponse = {
                id: messages.length + 2,
                text: botResponses[messageText] || botResponses.default,
                isBot: true,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botResponse]);
        }, 1000);

        setInputMessage('');
    };

    const handleQuestionClick = (question) => {
        handleSendMessage(question);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-50">
            {!isOpen && (
                <button
                    onClick={handleToggleChat}
                    className="bg-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-solid border-gray-300"
                >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center">
                        <img src={chatbot_icon} className='w-16 h-16' alt='chatbot_icon'></img>
                    </div>
                </button>
            )}

            {isOpen && (
                <div className="bg-white rounded-2xl shadow-2xl w-80 h-96 flex flex-col overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-400 to-green-400 p-2 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <img src={chatbot_icon} className='w-6 h-6' alt='chatbot_icon'></img>
                            </div>
                            <span className="text-white font-semibold">Chatbot</span>
                        </div>
                        <button
                            onClick={handleToggleChat}
                            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
                        >
                            <img className="w-[12.62px] h-[12.62px]" src={cancelIcon} alt="Close" />
                        </button>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`mb-4 ${message.isBot ? 'flex items-start' : 'flex items-end justify-end'}`}
                            >
                                {message.isBot && (
                                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mr-2 flex-shrink-0 border border-solid border-gray-300">
                                        <img src={chatbot_icon} className='w-5 h-5 p-0.5' alt='chatbot_icon'></img>
                                    </div>
                                )}
                                <div
                                    className={`px-3 py-2 rounded-lg text-sm text-left ${message.isBot
                                            ? 'bg-white text-gray-800 shadow-sm'
                                            : 'bg-blue-500 text-white'
                                        } ${!message.isBot ? 'max-w-[80%] break-words' : ''}`}
                                    style={{
                                        minWidth: '0',
                                        wordBreak: 'break-word',
                                        width: message.isBot ? 'auto' : message.text.length < 20 ? 'auto' : '80%'
                                    }}
                                >
                                    {message.text}
                                </div>
                            </div>
                        ))}

                        {messages.length === 1 && (
                            <div className="mt-4 space-y-0">
                                {predefinedQuestions.map((question, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleQuestionClick(question)}
                                        className="w-full text-left p-2 bg-whit shadow-sm hover:shadow-md hover:bg-blue-50 transition-all duration-200 text-xs text-gray-700 border border-gray-100"
                                    >
                                        {question}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t border-gray-200 bg-white">
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your question..."
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                            <button
                                onClick={() => handleSendMessage()}
                                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
                            >
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;