import { Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { SingleTask } from "../../abstraction/types/tasks.types";
import { useNavigate } from "react-router-dom";
import { axiosTask } from "../../utils/axiosInstance";
import { useState } from "react";

interface SubTaskProps {
    subTasks: SingleTask[];
    parentTask: SingleTask;
    onDeleteSubTask: (taskId: string) => void; // Callback to update parent state
}

export const SubTask = ({ subTasks, parentTask, onDeleteSubTask }: SubTaskProps) => {
    const user = useSelector((state: any) => state.user);
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);

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

    const onCreateSubIssue = () => {
        navigate(`/addTask/${parentTask._id}`);
    };

    const onDeleteTask = async (taskId?: string) => {
        setIsDeleting(true);
        try {
            await axiosTask.delete(`/tasks/${taskId}/${parentTask._id}`);
            // Notify the parent component to remove the deleted task from the UI
            onDeleteSubTask(taskId || "");
            console.log("Task deleted successfully");
        } catch (error) {
            console.error("Error deleting task:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    const filterCompletedTasks = subTasks.filter((subTask: SingleTask) => subTask.status === "Completed");

    return (
        <div className={`mb-6 p-4 border rounded-lg ${colors.border} ${colors.bg}`}>
            <div className="flex items-center justify-between">
                <h1 className={`text-md font-semibold ${colors.text}`}>Sub-issues</h1>
                <span className="text-sm text-gray-600">
                    {filterCompletedTasks.length} of {subTasks.length}
                </span>
            </div>

            {subTasks.length === 0 ? (
                <p className="text-sm text-gray-500 mt-3">No sub-tasks available.</p>
            ) : (
                subTasks.map((subTask: SingleTask) => (
                    <div
                        key={subTask._id}
                        onClick={() => navigate(`/task/${subTask._id}`)}
                        className={`mt-3 p-3 border rounded-md flex items-center justify-between ${colors.shadow} ${colors.hoverBg} cursor-pointer`}
                    >
                        <span className="text-sm text-gray-800">{subTask.name}</span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent navigation when clicking the delete button
                                onDeleteTask(subTask._id);
                            }}
                            disabled={isDeleting}
                            className="p-1 hover:bg-gray-100 rounded-md"
                        >
                            <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-600" />
                        </button>
                    </div>
                ))
            )}

            <button
                onClick={onCreateSubIssue}
                className={`mt-3 px-4 py-2 text-sm font-medium rounded-md border ${colors.border} ${colors.text} ${colors.hoverBg} ${colors.shadow}`}
            >
                Create sub-issue
            </button>
        </div>
    );
};