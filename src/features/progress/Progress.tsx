import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchTasks } from "../../data/store/tasks";
import TaskTable from "./TaskTable";
import { ProgressBar } from "./ProgressBar";
import { useAppDispatch } from "../../utils/hooks/useAppDispatch";
import { RootState } from "../../data/store/store";
import { Level } from "../../abstraction/types/tasks.types";
import { FaArrowRightLong } from "react-icons/fa6";

export const Progress = () => {
  const dispatch = useAppDispatch();
  const userType = useSelector((state: RootState) => state.user.userType);
  const { levels, status } = useSelector((state: RootState) => state.tasks);

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
        text: "text-white",
        hoverBg: "hover:bg-[#1E40AF]",
        shadow: "shadow-xs hover:shadow-[#1D4ED8]",
      };

  // Selected Level State
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);

  // Fetch levels on mount
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // Set default level when levels change
  useEffect(() => {
    if (levels.length > 0) {
      setSelectedLevel(levels[0]);
    }
  }, [levels]);

  // Function to calculate progress
  const calculateProgress = (tasks: Level["tasks"]): number => {
    if (tasks.length === 0) return 0;
    const completedTasks = tasks.filter((task) => task.status === "Completed").length;
    return Math.round((completedTasks / tasks.length) * 100);
  };

  if (status === "loading") return <div>Loading tasks...</div>;
  if (status === "failed") return <div>Failed to load tasks.</div>;
  if (!selectedLevel) return <div>No levels available.</div>;

  const completedTasksCount = selectedLevel.tasks.filter(task => task.status === "Completed").length;
  const totalTasksCount = selectedLevel.tasks.length;
  const progress = calculateProgress(selectedLevel.tasks);

  return (
    <div className="mx-auto w-[90%]">
      {/* Level Selection */}
      <div className="flex items-center space-x-6 mt-4">
        {levels.map((level: Level) => (
          <>
            <button
              key={level._id}
              onClick={() => setSelectedLevel(level)}
              className={`px-6 py-2 rounded-md ${selectedLevel.level === level.level ? `${colors.bg} ${colors.text}` : "bg-gray-400"} text-white font-semibold`}
              disabled={!level.isUnlocked} // Disable locked levels
            >
              {level.level}
            </button>
            {levels.at(levels.length-1) !== level && <FaArrowRightLong/>}
          </>

        ))}

      </div>

      {/* Progress Bar */}
      <ProgressBar
        progress={progress}
        userType={userType}
        totalTasks={totalTasksCount}
        completedTasks={completedTasksCount}
      />

      {/* Task Table */}
      <TaskTable tasks={selectedLevel.tasks} userType={userType} />
    </div>
  );
};

export default Progress;
