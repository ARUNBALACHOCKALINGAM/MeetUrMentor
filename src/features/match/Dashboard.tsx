import React from "react";
import TodoList from "./TodoList";
import { useSelector } from "react-redux";
import { ProgressBar } from "../progress/ProgressBar";
import { Article } from "./Article";
import { JobPick } from "./JobPick";
import { MentorsNote } from "./MentorsNote";

export default function Dashboard() {
  const user = useSelector((state: any) => state.user);

  const colors: Record<
  "mentor" | "student",
  { bg: string; border: string; text: string; buttonBg: string; buttonHoverBg: string }
> = {
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

  return (
    <div className="w-[90%] flex flex-col h-full mx-auto mt-10 gap-6">
      {/* Top Section: Todo List & Progress Section (Side by Side on Large Screens) */}
      <div className="flex flex-col lg:flex-row gap-6 overflow-scroll h-3/4">
        {/* Left side: Todo List */}
        <div className="w-full lg:w-1/2">
          <TodoList role={user.userType} />
        </div>

        {/* Right side: Progress section */}
        <div className="w-full lg:w-1/2">
           <MentorsNote colors={colors} role={user.userType} />
        </div>
      </div>

      <div className="flex justify-center h-1/2">
        {/* Bottom Sections: Articles/News & Job Opportunities (Always Below) */}
        <div className="w-full">
          {/* Articles and news - mentor's pick */}
          <Article role={user.userType}/>
        </div>
      </div>


    </div>
  );
}
