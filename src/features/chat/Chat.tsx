import React, { useState, useEffect, useRef } from 'react';
import { Message, ChatProps } from '../../abstraction/types/chat.types';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { axiosChat } from '../../utils/axiosInstance';

interface RootState {
    user: {
        _id: string;
        matchedUserDetails: {
            username: string;
            _id: string;
        };
        userType: "mentor" | "student";
    };
}

interface ChatMessage extends Message {
    senderUserType: "mentor" | "student";
    receiverUserType: "mentor" | "student";
    message: string;
}

const colors: Record<"mentor" | "student", { bg: string; border: string; text: string; buttonBg: string; buttonHoverBg: string }> = {
    mentor: {
        bg: "bg-[#FFF5E6]",
        border: "border-[#FFC400]",
        text: "text-[#FF8C00]",
        buttonBg: "bg-[#FFC400]",
        buttonHoverBg: "hover:bg-[#FFD966]",
    },
    student: {
        bg: "bg-[#EFF6FF]",
        border: "border-[#1D4ED8]",
        text: "text-[#1D4ED8]",
        buttonBg: "bg-[#1D4ED8]",
        buttonHoverBg: "hover:bg-[#3B82F6]",
    },
};

export const Chat: React.FC<ChatProps> = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState<string>("");
    const user = useSelector((state: RootState) => state.user);


    const socket = useRef<any>(null);

    useEffect(() => {
        socket.current = io(import.meta.env.VITE_CHAT_BACKEND_URL);

        socket.current.on("connect", () => {
        });

        const fetchChatHistory = async () => {
            if (user && user.matchedUserDetails && user._id) {
                socket.current.emit("fetchMessages", { user1: user._id, user2: user.matchedUserDetails._id });
            }
        };

        fetchChatHistory();

        socket.current.on("chatHistory", (messages: ChatMessage[]) => {
            setMessages(messages);
        });

        socket.current.on("receiveMessage", (message: ChatMessage) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.current.disconnect();
        };
    }, [user]);

    const handleSendMessage = (): void => {
        if (inputValue.trim()) {
            const receiverUserType = user.userType === "mentor" ? "student" : "mentor";

            socket.current.emit("sendMessage", {
                sender: user._id,
                receiver: user.matchedUserDetails._id,
                message: inputValue,
                senderUserType: user.userType,
                receiverUserType: receiverUserType
            });
            setInputValue("");
        }
    };

    return (
        <div className="h-full w-full md:w-[90%] mx-auto md:rounded-lg py-6 px-4 relative md:border md:border-gray-300 md:shadow-md">
            <div className="flex items-center mb-4 pb-4 border-b border-gray-300">
                <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-lg mr-4">
                    A
                </div>
                <div>
                    <h1 className="text-md font-semibold">
                        {user.matchedUserDetails.username}
                    </h1>
                    <p className="text-xs text-left text-gray-500">Active now</p>
                </div>
            </div>

            <div className="overflow-y-auto h-[74%] mb-2">
                {messages.map((message, index) => {
                    const isSender = message.sender === user._id;
                    const messageUserType = isSender ? message.senderUserType : message.receiverUserType;
                    const colorTheme = message.senderUserType === "student" ? colors["student"] : colors["mentor"];

                    return (
                        <div
                            key={index}
                            className={`flex ${isSender ? "justify-end" : "justify-start"} mb-2 mt-4`}
                        >
                            <div
                                className={`flex items-center ${isSender ? "flex-row-reverse" : "flex-row"
                                    }`}
                            >
                                <div
                                      className={`p-2 rounded-lg ${colorTheme.bg} ${colorTheme.border} ${colorTheme.text} border shadow-md 
                                      max-w-xs sm:max-w-md md:max-w-lg break-words overflow-wrap-anywhere`}
                                >
                                    {message.message}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="md:w-[98%] flex items-center mx-auto pt-4">
                <input
                    type="text"
                    className="w-1/2 lg:w-full flex-1 p-2 rounded-lg outline-none border border-gray-400"
                    placeholder="Send a message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSendMessage();
                        }
                    }}
                />
                <button
                    className={`ml-2 px-4 py-2 rounded-lg ${colors[user.userType].buttonBg} ${colors[user.userType].buttonHoverBg} text-white shadow-md`}
                    onClick={handleSendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    );
};
