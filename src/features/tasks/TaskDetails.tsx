import { useSelector } from "react-redux";
import { UserState } from "../../abstraction/types/userData.types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Attachments } from "./Attachments";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import ActivityLog from "./ActivityLog";
import { SubTask } from "./SubTask";
import { axiosTask } from "../../utils/axiosInstance";
import { Activity, SingleTask } from "../../abstraction/types/tasks.types";

export const TaskDetails = () => {
    const navigate = useNavigate();
    const userType = useSelector((state: UserState) => state.user.userType);
    const [isEditing, setIsEditing] = useState(false);
    const [task, setTask] = useState<SingleTask>({
        name: "",
        id: "",
        description: "",
        status: "Todo",
        title: "",
        subTasks: [],
        resources:[]
    });

    const [activities, setActivities] = useState<Activity[]>([]);
    const [newComment, setNewComment] = useState("");
    const [attachments, setAttachments] = useState<File[]>([]);

    const { taskId } = useParams();

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axiosTask.get(`/tasks/${taskId}`);
                setTask(response.data);
            } catch (error) {
                console.error("Error fetching task:", error);
            }
        };

        const fetchActivities = async () => {
            try {
                const response = await axiosTask.get(`/activity/${taskId}`);
                setActivities(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchTask();
        fetchActivities();
    }, [taskId]);

    const onDeleteSubTask = (subTaskId: string) => {
        setTask((prevTask) => ({
            ...prevTask,
            subTasks: prevTask.subTasks.filter((subTask) => subTask._id !== subTaskId),
        }));
    };

    const onEditTask = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({
            ...prevTask,
            [name]: value,
        }));
    };

    const handleEdit = async () => {
        setIsEditing((prev) => !prev);
        try {
            const response = await axiosTask.put(`/tasks/update/${taskId}`, task);
            console.log(response);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const colors =
        userType === "mentor"
            ? {
                  bg: "bg-white",
                  border: "border-[#FFC400]",
                  text: "text-black",
                  hoverBg: "hover:bg-[#FFF5E6]",
                  shadow: "hover:shadow-sm shadow-[#FFC400]",
              }
            : {
                  bg: "bg-white",
                  border: "border-[#1D4ED8]",
                  text: "text-black",
                  hoverBg: "hover:bg-[#1D4ED8]",
                  shadow: "shadow-xs hover:shadow-[#1D4ED8]",
              };


    const onUpdateStatus = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value as "Todo" | "InProgress" | "Completed";
        setTask((prevTask) => ({
            ...prevTask,
            status: newStatus,
        }));

        try {
            const response = await axiosTask.patch(`/tasks/status/${taskId}`, { status: newStatus });
            console.log(response);
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        
        setAttachments([...attachments, ...files]);
    };

    return (
        <div className="mx-auto overflow-y-scroll p-8 bg-white rounded-md text-left">
            {/* Back Button */}
            <button
                onClick={() => navigate("/tasks")}
                className={`mb-4 text-sm  ${colors.text} hover:underline flex items-center justify-center`}
            >
                <ArrowLeftCircleIcon width={20} fontSize={12} /> <span className="ml-2">All tasks</span>
            </button>

            {/* Task Header */}
            <div className={`flex justify-between items-center mb-4`}>
                {isEditing ? (
                    <input
                        type="text"
                        name="name"
                        value={task.name}
                        onChange={onEditTask}
                        className="text-xl font-semibold border border-gray-300 rounded px-2 py-1 w-full"
                    />
                ) : (
                    <div className="flex items-center space-x-4 mt-2">
                        <h2 className={`text-xl font-semibold ${colors.text}`}>{task.name}</h2>
                        <select
                            value={task.status}
                            name="status"
                            onChange={onUpdateStatus}
                            className={`px-2 py-1 text-xs bg-gray-200 text-gray-800 rounded-md border ${userType === "mentor" ? "bg-yellow-200" : "bg-blue-100"}`}
                        >
                            <option value="Todo">Todo</option>
                            <option value="Inprogress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                )}
                {userType === "mentor" && (
                    <button
                        onClick={handleEdit}
                        className={`text-sm ${colors.text} hover:underline ml-4`}
                    >
                        {isEditing ? "Save" : "Edit"}
                    </button>
                )}
            </div>

            <hr className="my-4 border-2 border-gray-100" />

            {/* Task Description */}
            <div className="mb-6">
                <div className="flex items-center space-x-4 mt-2">
                    <h3 className={`text-md font-semibold ${colors.text}`}>Description</h3>
                </div>
                {isEditing ? (
                    <textarea
                        value={task.description}
                        name="description"
                        onChange={onEditTask}
                        className="mt-2 w-full border border-gray-300 rounded px-2 py-1 text-md"
                    />
                ) : (
                    <p className="text-gray-700/75 mt-2 italic text-sm">{task.description}</p>
                )}
            </div>

            <hr className="my-4 border-gray-100" />

            {/* Attachments Section */}
            <Attachments colors={colors} isEditing={isEditing} handleFileUpload={handleFileUpload} attachments={attachments} />

            {/* Sub-issues */}
            <SubTask parentTask={task} subTasks={task.subTasks} onDeleteSubTask={onDeleteSubTask} />

            {/* Activity Log */}
            <ActivityLog taskId={taskId} activities={activities} colors={colors} />
        </div>
    );
};