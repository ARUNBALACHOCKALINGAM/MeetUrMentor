// Progress.jsx
import { useState } from "react";
import TaskTable from "./TaskTable";
import { useSelector } from "react-redux";
import { UserState } from "../../abstraction/types/userData.types";
import { Task } from "../../abstraction/types/tasks.types";

export const Progress = () => {

  const userType = useSelector((state: UserState) => state.user.userType);

  const colors =
    userType === "mentor"
      ? {
        bg: "bg-[#FFC400]",
        border: "border-[#FFC400]",
        text: "text-black",
        hoverBg: "hover:bg-[#FFF5E6]",
        shadow: "hover:shadow-sm shadow-[#FFC400]",
      }
      : {
        bg: "bg-[#1D4ED8]",
        border: "border-[#1D4ED8]",
        text: "text-black",
        hoverBg: "hover:bg-[#1D4ED8]",
        shadow: "shadow-xs hover:shadow-[#1D4ED8]",
      };


  const levels = [
    {
      level: "1",
      tasks: [
        { name: "Task #1", points: 100, difficulty: "Easy", status: "Todo" },
        { name: "Task #2", points: 120, difficulty: "Medium", status: "Inprogress" },
        { name: "Task #3", points: 150, difficulty: "Hard", status: "Completed" },
      ],
      isCompleted: true,
      isUnlocked: true
    },
    {
      level: "2",
      tasks: [
        { name: "Task #1", points: 200, difficulty: "Easy", status: "Todo" },
        { name: "Task #2", points: 220, difficulty: "Medium", status: "Todo" },
        { name: "Task #3", points: 250, difficulty: "Hard", status: "Todo" },
      ],
      isUnlocked: false,
      isCompleted: false
    },
  ];




  const [selectedLevel, setSelectedLevel] = useState(levels[0]);

  // Calculate progress
  const calculateProgress = (tasks: Task[]) => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.status === "Completed").length;
    return Math.round((completedTasks / totalTasks) * 100);
  };

  const progress = calculateProgress(selectedLevel.tasks);

  return (
    <div className="mx-auto w-[90%]">
      {/* Level Selection */}
      <div className="flex items-center space-x-6 mt-4">
        {levels.map((level) => (
          <button
            key={level.level}
            onClick={() => setSelectedLevel(level)}
            className={`px-6 py-2 rounded-md  ${selectedLevel.level === level.level ? colors.bg : "bg-gray-400"}  text-white`}
          >
            Level {level.level}
          </button>
        ))}
      </div>
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-4 my-4">
        <div
          className="h-4 rounded-full"
          style={{ width: `${progress}%`, backgroundColor: userType === "mentor" ? "#FFC400" : "#1D4ED8" }}
        ></div>
        <div className="text-gray-400 text-sm mt-2 text-left">
          <span>4/6 tasks |</span>
          <span className="ml-2">{progress}% Completed</span>
        </div>

      </div>
      {/* Task Table */}
      <TaskTable tasks={selectedLevel.tasks} userType={userType} />
    </div>
  );
};

export default Progress;
