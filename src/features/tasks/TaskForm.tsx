import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserState } from "../../abstraction/types/userData.types";
import { useNavigate, useParams } from "react-router-dom";
import { axiosTask } from "../../utils/axiosInstance";
import { SingleTask } from "../../abstraction/types/tasks.types";

export const TaskForm: React.FC = () => {
  const user = useSelector((state: UserState) => state.user);
  const { taskId } = useParams();
  const navigate = useNavigate();

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
          hoverBg: "hover:bg-[#1D4ED8]",
          shadow: "shadow-xs hover:shadow-[#1D4ED8]",
        };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    difficulty: "Medium" as "Easy" | "Medium" | "Hard",
    points: 5,
    attachments: [] as File[],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState<SingleTask>({
    name: "",
    id: "",
    description: "",
    status: "Todo",
    subTasks: [],
    resources: [],
    points:5,
    difficulty:"Medium",
    type:"mentor"
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axiosTask.get(`/tasks/${taskId}`);
        setTask(response.data);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    if (taskId) {
      fetchTask();
    }
  }, [taskId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setFormData({ ...formData, attachments: files });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Task title is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (formData.points < 1 || formData.points > 10) {
      newErrors.points = "Points must be between 1 and 10";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const requestData = new FormData();
    requestData.append("name", formData.name);
    requestData.append("description", formData.description);
    requestData.append("difficulty", formData.difficulty);
    requestData.append("points", formData.points.toString());
    requestData.append("track", user.track);
    if (taskId) {
      requestData.append("parentTaskId", taskId);
    }

    formData.attachments.forEach((file) => {
      requestData.append("resources", file);
    });

    try {
      const response = await axiosTask.post("/tasks/create", requestData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        navigate(`/task/${taskId || response.data._id}`);
      }
    } catch (error) {
      console.error("Error saving task:", error);
      setErrors({ submit: "Failed to save task. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleDiscard = () => {
    setFormData({
      name: "",
      description: "",
      difficulty: "Medium",
      points: 5,
      attachments: [],
    });
    setErrors({});
  };

  return (
    <div className={`p-6 mx-auto h-full overflow-y-scroll rounded-lg text-left bg-gray-50 shadow-lg ${colors.border}`}>
      <h2 className={`text-xl font-semibold ${colors.text}`}>
        Create a {taskId ? "Sub-" : "New-"}Task {taskId && `for ${task.name}`}
      </h2>
      <hr className="my-4 border-gray-300" />
      <div className="mt-4 space-y-4">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Task Title</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`mt-1 w-full border ${errors.name ? "border-red-500" : "border-gray-300"
              } rounded-lg px-3 py-2 focus:ring-2 focus:ring-mentorPrimary focus:border-mentorPrimary`}
            placeholder="Enter task title"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Description Textarea */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className={`mt-1 w-full border ${errors.description ? "border-red-500" : "border-gray-300"
              } rounded-lg px-3 py-2 focus:ring-2 focus:ring-mentorPrimary focus:border-mentorPrimary`}
            placeholder="Enter task description"
            rows={4}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Difficulty Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Difficulty</label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleInputChange}
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-mentorPrimary focus:border-mentorPrimary"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Points Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Points (1-10)</label>
          <input
            type="number"
            name="points"
            value={formData.points}
            onChange={handleInputChange}
            min={1}
            max={10}
            className={`mt-1 w-full border ${errors.points ? "border-red-500" : "border-gray-300"
              } rounded-lg px-3 py-2 focus:ring-2 focus:ring-mentorPrimary focus:border-mentorPrimary`}
          />
          {errors.points && <p className="text-red-500 text-sm mt-1">{errors.points}</p>}
        </div>

        {/* Attachments Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Attachments</label>
          <div className="mt-1">
            <label
              htmlFor="file-upload"
              className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mentorPrimary"
            >
              <span>Upload</span>
              <input
                id="file-upload"
                type="file"
                name="attachments"
                className="sr-only"
                multiple
                onChange={handleFileChange}
              />
            </label>
          </div>
          {formData.attachments.length > 0 && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {formData.attachments.map((file, index) => (
                <div
                  key={index}
                  className="border overflow-hidden rounded-lg shadow-sm bg-white flex flex-col items-center justify-center text-center space-y-2"
                >
                  {file.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview of ${file.name}`}
                      className="w-full h-24 object-cover rounded"
                    />
                  ) : file.type === "application/pdf" ? (
                    <embed
                      src={URL.createObjectURL(file)}
                      type="application/pdf"
                      className="w-full h-24 rounded"
                    />
                  ) : (
                    <div className="text-sm text-gray-500">File Preview Not Available</div>
                  )}
                  <span className="text-sm bg-none w-full text-left ml-2 px-2 font-medium text-gray-700 truncate">
                    {file.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={handleSave}
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-white bg-mentorPrimary/75 hover:bg-mentorPrimary focus:ring-2 focus:ring-mentorPrimary focus:ring-offset-2 ${colors.shadow}`}
        >
          {"Save"}
        </button>
        <button
          onClick={handleDiscard}
          className="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Discard
        </button>
      </div>
      {errors.submit && <p className="text-red-500 text-sm mt-2">{errors.submit}</p>}
    </div>
  );
};