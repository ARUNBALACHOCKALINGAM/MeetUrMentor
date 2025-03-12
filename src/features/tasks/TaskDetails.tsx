import { useSelector } from "react-redux";
import { UserState } from "../../abstraction/types/userData.types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Attachments } from "./Attachments";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import ActivityLog from "./ActivityLog";
import { SubTask } from "./SubTask";
import { axiosTask } from "../../utils/axiosInstance";
import { Activity, SingleTask, Attachment } from "../../abstraction/types/tasks.types";

export const TaskDetails = () => {
  const navigate = useNavigate();
  const userType = useSelector((state: UserState) => state.user.userType);
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState<SingleTask>({
    name: "",
    id: "",
    description: "",
    status: "Todo",
    subTasks: [],
    resources: [],
    points: 5,
    difficulty: "Medium",
    type: "default",
  });
  // Attachments array will store both already-uploaded file info and new File objects for upload
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const { taskId } = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axiosTask.get(`/tasks/${taskId}`);
        const taskData = response.data;
        setTask({
          name: taskData.name,
          id: taskData._id, // map _id to id
          description: taskData.description,
          status: taskData.status,
          points: taskData.points,
          difficulty: taskData.difficulty,
          type: taskData.type,
          subTasks: taskData.subTasks || [],
          resources: taskData.resources || [],
        });
        // Map existing file objects into attachments with a downloadable URL.
        const formattedResources = taskData.resources.map((resource: any) => ({
          name: resource.filename,
          type: resource.metadata.mimetype,
          _id: resource._id,
          url: `/api/files/${resource._id}`,
          size: resource.metadata.size,
        }));
        setAttachments(formattedResources);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    const fetchActivities = async () => {
      try {
        const response = await axiosTask.get(`/activity/${taskId}`);
        setActivities(response.data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    if (taskId) {
      fetchTask();
      fetchActivities();
    }
  }, [taskId]);

  const onDeleteSubTask = (subTaskId: string) => {
    setTask((prevTask) => ({
      ...prevTask,
      subTasks: prevTask.subTasks.filter((subTask) => subTask._id !== subTaskId),
    }));
  };

  const onEditTask = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleEdit = async () => {
    setIsEditing((prev) => !prev);
    if (isEditing) {
      try {
        const formData = new FormData();
        // Append task fields to the form data.
        formData.append("name", task.name);
        formData.append("description", task.description);
        formData.append("difficulty", task.difficulty);
        formData.append("points", task.points.toString());
        formData.append("type", task.type);
        // Append new files (only files with a data property, i.e. newly added ones)
        attachments.forEach((file) => {
          if (file?.data instanceof File) {
            formData.append("resources", file?.data);
          }
        });
        const response = await axiosTask.put(`/tasks/update/${taskId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Task updated:", response.data);
        // Optionally update your local state with returned data.
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  const handleDeleteAttachment = async (fileId: string) => {
    try {
      // Adjust endpoint as needed.
      await axiosTask.delete(`/tasks/${taskId}/resource/${fileId}`);
      setAttachments((prev) => prev.filter((file) => file._id !== fileId));
    } catch (error) {
      console.error("Error deleting attachment:", error);
    }
  };

  const handleDownloadAttachment = (fileId: string) => {
    const file = attachments.find((file) => file._id === fileId);
    if (!file) return;
    // Create a temporary link to download the file.
    const a = document.createElement("a");
    a.href = file.url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    // For new uploads, we store a temporary ID and URL.
    const newFiles = files.map((file) => ({
      name: file.name,
      type: file.type,
      _id: Math.random().toString(), // temporary ID until backend returns the saved resource
      url: URL.createObjectURL(file),
      size:file.size,
      data: file, // Store the File object to send in FormData
    }));
    setAttachments((prev) => [...prev, ...newFiles]);
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
      console.log("Status updated:", response.data);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="mx-auto overflow-y-scroll p-8 bg-white rounded-md text-left">
      {/* Back Button */}
      <button
        onClick={() => navigate("/tasks")}
        className={`mb-4 text-sm ${colors.text} hover:underline flex items-center justify-center`}
      >
        <ArrowLeftCircleIcon width={20} fontSize={12} /> <span className="ml-2">All tasks</span>
      </button>

      {/* Task Header */}
      <div className="flex justify-between items-center mb-4">
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
              className={`px-2 py-1 text-xs bg-gray-200 text-gray-800 rounded-md border ${
                userType === "mentor" ? "bg-yellow-200" : "bg-blue-100"
              }`}
            >
              <option value="Todo">Todo</option>
              <option value="InProgress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        )}
        {userType === "mentor" && (
          <button onClick={handleEdit} className={`text-sm ${colors.text} hover:underline ml-4`}>
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
      <Attachments
        colors={colors}
        isEditing={isEditing}
        handleFileUpload={handleFileUpload}
        attachments={attachments}
        handleDeleteAttachment={handleDeleteAttachment}
        handleDownloadAttachment={handleDownloadAttachment}
      />

      {/* Sub-tasks */}
      <SubTask parentTask={task} subTasks={task.subTasks} onDeleteSubTask={onDeleteSubTask} />

      {/* Activity Log */}
      <ActivityLog taskId={taskId} activities={activities} colors={colors} />
    </div>
  );
};
