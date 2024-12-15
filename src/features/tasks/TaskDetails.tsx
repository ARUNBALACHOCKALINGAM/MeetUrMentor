import { useSelector } from "react-redux";
import { UserState } from "../../abstraction/types/userData.types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Attachments } from "./Attachments";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import ActivityLog from "./ActivityLog";

export const TaskDetails = () => {
    const navigate = useNavigate();
    const userType = useSelector((state: UserState) => state.user.userType);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState("Task Name");
    const [description, setDescription] = useState(
        "This is a detailed task description that explains the task requirements, objectives, and any additional notes. The description should provide all the necessary information about the task so the assignee knows exactly what needs to be done."
    );
    const [comments, setComments] = useState([{comment:"Good job on the progress so far! Remember to focus on the key deliverables by next week.",author:"Alex Mentor",commentId:"Eqe23r",dateCreated:"01/02/2024 20:00:00"}]);
    const [newComment, setNewComment] = useState("");
    const [status, setStatus] = useState("Todo");
    const [attachments, setAttachments] = useState<File[]>([]);

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

    const handleSave = () => {
        setIsEditing(false);
    };

    const handleAddComment = () => {
        if (newComment.trim() !== "") {
            const newCommentObject = {
                comment: newComment,
                author: "Current User", // Replace with dynamic user if needed
                commentId: Math.random().toString(36).substr(2, 9), // Generate a unique ID
                dateCreated: new Date().toLocaleString(), // Add a timestamp
            };
            setComments([...comments, newCommentObject]);
            setNewComment("");
        }
    };
    

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        setAttachments([...attachments, ...files]);
    };

    return (
        <div  className="mx-auto overflow-y-scroll p-8 bg-white rounded-md text-left">
            {/* Back Button */}
            <button
                onClick={() => navigate("/tasks")}
                className={`mb-4 text-sm  ${colors.text} hover:underline flex items-center justify-center`}
            >
                <ArrowLeftCircleIcon width={20} fontSize={12}/> <span className="ml-2">All tasks</span>
            </button>

            {/* Task Header */}
            <div className={`flex justify-between items-center mb-4`}>
                {isEditing ? (
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-xl font-semibold border border-gray-300 rounded px-2 py-1 w-full"
                    />
                ) : (
                    <div className="flex items-center space-x-4 mt-2">
                        <h2 className={`text-xl font-semibold ${colors.text}`}>{title}</h2>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className={`px-2 py-1 text-xs bg-gray-200 text-gray-800 rounded-md border ${userType === "mentor" ? "bg-yellow-200" : "bg-blue-100"}`}
                        >
                            <option value="Todo">Todo</option>
                            <option value="InProgress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                )}
                {userType === "mentor" && (
                    <button
                        onClick={() => setIsEditing(!isEditing)}
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
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-2 w-full border border-gray-300 rounded px-2 py-1 text-md"
                    />
                ) : (
                    <p className="text-gray-700/75 mt-2 italic text-sm">{description}</p>
                )}
            </div>

            <hr className="my-4 border-gray-100" />

            {/* Attachments Section */}
            <Attachments colors={colors} isEditing={isEditing} handleFileUpload={handleFileUpload} attachments={attachments}/>

       

            {/* Actions */}
            {/* <ActivityLog/> */}
            <ActivityLog colors={colors}/>

            {/* Comments Section */}
            {/* <Comments comments={comments} newComment={newComment} handleAddComment={handleAddComment} setNewComment={setNewComment}/> */}

 
        </div>
    );
};
