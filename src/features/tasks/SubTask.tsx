import React from "react";
import { Trash2 } from "lucide-react";
import { AuthFormProps } from "../../abstraction/types/authentication.types";
import { useSelector } from "react-redux";

export const SubTask = () => {
    const user= useSelector((state:any) => state.user);
    const colors =
        user.userType === "mentor"
            ? {
                bg: "bg-white",
                border: "border-[#FFC400]",
                text: "text-[#FF8C00]",
                hoverBg: "hover:bg-[#FFF5E6]",
                shadow: "hover:shadow-sm shadow-[#FFC400]",
            }
            : {
                bg: "bg-white",
                border: "border-[#1D4ED8]",
                text: "text-[#1D4ED8]",
                hoverBg: "hover:border-2",
                shadow: "shadow-xs hover:shadow-[#1D4ED8]",
            };

    return (
        <div className={`mb-6 p-4 border rounded-lg ${colors.border} ${colors.bg}`}>
            <div className="flex items-center justify-between">
                <h1 className={`text-md font-semibold ${colors.text}`}>Sub-issues</h1>
                <span className="text-sm text-gray-600">0 of 1</span>
            </div>
            <div className="mt-3 p-3 border rounded-md flex items-center justify-between ${colors.shadow} ${colors.hoverBg}">
                <span className="text-sm text-gray-800">new sub issue #5</span>
                <Trash2 className="w-4 h-4 text-gray-500 cursor-pointer hover:text-red-600" />
            </div>
            <button className={`mt-3 px-4 py-2 text-sm font-medium rounded-md border ${colors.border} ${colors.text} ${colors.hoverBg} ${colors.shadow}`}>
                Create sub-issue
            </button>
        </div>
    );
};
