import React, { useState } from "react";
import { useSelector } from "react-redux";
import { UserState } from "../../abstraction/types/userData.types";

export const TaskForm: React.FC = () => {
  const userType = useSelector((state: UserState) => state.user.userType);

  const colors =
    userType === "mentor"
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
    title: "",
    description: "",
    attachments: [] as File[],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setFormData({ ...formData, attachments: files });
  };

  const handleSave = () => {
    console.log("Task saved:", formData);
  };

  const handleDiscard = () => {
    setFormData({
      title: "",
      description: "",
      attachments: [],
    });
  };

  return (
    <div className={`p-6 mx-auto h-full overflow-y-scroll rounded-lg text-left bg-gray-50 shadow-lg ${colors.border}`}>
      <h2 className={`text-xl font-semibold ${colors.text}`}>Create a New Task</h2>
      <hr className="my-4 border-gray-300" />
      <div className="mt-4 space-y-4">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Task Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-mentorPrimary focus:border-mentorPrimary"
            placeholder="Enter task title"
          />
        </div>

        {/* Description Textarea */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-mentorPrimary focus:border-mentorPrimary"
            placeholder="Enter task description"
            rows={4}
          />
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
                  className="border overflow-hidden rounded-lg shadow-sm bg-white	 flex flex-col items-center justify-center text-center space-y-2"
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
                  <span className="text-sm bg-none w-full text-left ml-2 px-2 font-medium text-gray-700 truncate">{file.name}</span>
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
            className={`px-4 py-2 rounded-lg text-white bg-mentorPrimary/75 hover:mentorPrimary focus:ring-2 focus:ring-mentorPrimary focus:ring-offset-2 ${colors.shadow}`}
          >
            Save
          </button>
          <button
            onClick={handleDiscard}
            className="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Discard
          </button>
        </div>
    </div>
  );
};
