import React, { useState } from 'react';
import { Message, ChatProps } from '../../abstraction/types/chat.types'; // Assuming types are in a separate file

export const Chat: React.FC<ChatProps> = ({ userType }) => {
    const [messages, setMessages] = useState<Message[]>([{ text: "hi", sender: "mentor" }]);
    const [inputValue, setInputValue] = useState<string>("");

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



    const handleSendMessage = (): void => {
        if (inputValue.trim()) {
            setMessages([...messages, { text: inputValue, sender: userType }]);
            setInputValue("");
        }
    };

    return (
        <div className="h-full rounded-lg py-8 px-4 relative bg-gray-100 border border-gray-300 shadow-md">
            {/* Message Display Section */}
            <div className="overflow-y-auto h-[90%] mb-2">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.sender === userType ? "justify-end" : "justify-start"
                            } mb-2`}
                    >
                        <div
                            className={`flex items-center ${message.sender === userType ? "flex-row-reverse" : "flex-row"
                                }`}
                        >
                            {/* Avatar */}
                            <div
                                className={`w-10 h-10 rounded-full ${message.sender === "mentor" ? "bg-[#FFC400]" : "bg-[#1D4ED8]"
                                    } flex items-center justify-center text-white font-bold`}
                            >
                                {message.sender === "mentor" ? "M" : "U"}
                            </div>

                            {/* Message Bubble */}
                            <div
                                className={`${message.sender===userType ? "mr-2" : "ml-2"} p-2 rounded-lg ${colors[message.sender as "mentor" | "student"].bg
                                    } ${colors[message.sender as "mentor" | "student"].border} ${colors[message.sender as "mentor" | "student"].text
                                    } border shadow-md`}
                            >
                                {message.text}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Section */}
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
                    className={`ml-2 px-4 py-2 rounded-lg ${colors[userType].buttonBg} ${colors[userType].buttonHoverBg} text-white shadow-md`}
                    onClick={handleSendMessage}
                >
                    Send
                </button>

            </div>
        </div>
    );
};

