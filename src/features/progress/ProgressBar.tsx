import React from 'react'

export const ProgressBar = ({progress,userType}:any) => {
    return (
        <div className="w-full bg-gray-200 rounded-full h-4 my-4">
            <div
                className="h-4 rounded-full"
                style={{ width: `${progress}%`, backgroundColor: userType === "mentor" ? "#FFC400" : "#1D4ED8" }}
            ></div>
            <div className="text-gray-400 text-xs mt-2 text-left">
                <span>4/6 tasks |</span>
                <span className="ml-2">{progress}% Completed</span>
            </div>
        </div>
    )
}
