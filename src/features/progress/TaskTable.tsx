// TaskTable.jsx

import { Task } from "../../abstraction/types/tasks.types";



type TaskTableProps = {
    tasks: Task[],
    userType: string
};

const TaskTable = ({ tasks, userType }: TaskTableProps) => {
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

    return (
        <div className={`relative overflow-x-scroll shadow-md sm:rounded-lg mt-10 ${colors.border} ${colors.shadow}`}>            
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">Task</th>
                        <th scope="col" className="px-6 py-3">Points</th>
                        <th scope="col" className="px-6 py-3">Difficulty</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3">Resources</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => (
                        <tr key={index} className="bg-white border-b">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {task.name}
                            </td>
                            <td className="px-6 py-4">{task.points}</td>
                            <td className="px-6 py-4">{task.difficulty}</td>
                            <td className="px-6 py-4">
                                {task.status === "Completed" ? (
                                    <span className="flex items-center">
                                        <span className="w-4 h-4 bg-green-500 rounded-full flex justify-center items-center">
                                            <svg
                                                className="w-3 h-3 text-white font-semibold"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                        </span>
                                        <span className="ml-2">{task.status}</span>
                                    </span>
                                ) : (
                                    <span>{task.status}</span>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                <button
                                    onClick={() => alert(`Downloading resources for ${task.name}`)}
                                    className={`px-4 py-1 text-white rounded-md ${colors.hoverBg} ${userType === "mentor" ? "bg-mentorPrimary/75 hover:bg-mentorPrimary" : "bg-blue-500 hover:bg-blue-600"}`}
                                >
                                    Download
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskTable;
