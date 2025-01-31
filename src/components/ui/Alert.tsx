import React, { useState, useEffect } from "react";

type AlertProps = {
  message: string;
  userType: "mentor" | "student";
  onClose: () => void;
};

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

export const Alert: React.FC<AlertProps> = ({ message, userType, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 500); // Delay unmounting to allow fade out
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 w-1/3 max-w-sm p-4 rounded-xl ${colors[userType].bg} ${colors[userType].border} border-l-4 flex justify-between items-center shadow-xl transition-all duration-500 ease-in-out z-10 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <span className={`${colors[userType].text} font-semibold text-lg text-center flex-1`}>{message}</span>
      <button
        className={`ml-4 px-4 py-2 rounded-lg ${colors[userType].buttonBg} ${colors[userType].buttonHoverBg} text-white text-sm font-medium shadow-md transition-all duration-300 ease-in-out`}
        onClick={() => setIsVisible(false)}
      >
        ✕
      </button>
    </div>
  );
};
