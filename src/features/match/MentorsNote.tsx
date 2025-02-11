import React, { useState } from "react";
import { ProgressBar } from "../progress/ProgressBar";
import { PencilIcon } from "lucide-react";// Ensure you're using Heroicons

interface MentorNoteProps {
  role: "mentor" | "student";
  colors: Record<
    "mentor" | "student",
    { bg: string; border: string; text: string; buttonBg: string; buttonHoverBg: string }
  >;
}

export const MentorsNote: React.FC<MentorNoteProps> = ({ colors, role }) => {
  const [note, setNote] = useState("Focus!!!");
  const [isEditing, setIsEditing] = useState(false);
  const [tempNote, setTempNote] = useState(note);

  const handleEditClick = () => {
    setIsEditing(true);
    setTempNote(note);
  };

  const handleSaveNote = () => {
    setNote(tempNote);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Progress Section */}
      <div className={`border-2 p-4 py-6 ${colors[role].border}`}>
        <h1 className={`${colors[role].text} text-lg font-semibold`}>Progress</h1>
        <ProgressBar progress={40} userType={role} />
      </div>

      {/* Mentor's Note Section */}
      <div className={`border-2 p-4 py-6 ${colors[role].border} relative`}>
        <h1 className={`${colors[role].text} text-lg font-semibold flex items-center`}>
          Mentor's Note
          {role === "mentor" && !isEditing && (
            <PencilIcon
              className="w-5 h-5 text-yellow-500 ml-2 cursor-pointer hover:text-yellow-400"
              onClick={handleEditClick}
            />
          )}
        </h1>

        {isEditing ? (
          <div className="mt-2">
            <textarea
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={tempNote}
              onChange={(e) => setTempNote(e.target.value)}
            />
            <div className="flex justify-end mt-2">
              <button
                className={`px-3 py-1 text-sm font-semibold text-white rounded-md  mr-2 ${colors[role].buttonBg} ${colors[role].buttonHoverBg}`}
                onClick={handleSaveNote}
              >
                Save
              </button>
              <button
                className="px-3 py-1 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-500"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className={`${colors[role].text} text-md mt-2`}>{note}</p>
        )}
      </div>
    </div>
  );
};
