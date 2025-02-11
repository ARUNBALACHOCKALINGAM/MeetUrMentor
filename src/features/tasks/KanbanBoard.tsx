import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { AuthFormProps } from "../../abstraction/types/authentication.types";
import { useNavigate } from "react-router-dom";
import Confetti from 'react-confetti'
import { axiosTask } from "../../utils/axiosInstance";

const SECTIONS = ["Todo", "Inprogress", "Completed"] as const;
type SectionType = typeof SECTIONS[number];

interface Task {
  _id: string; // Assuming your tasks have an _id field
  name: string;
  level?: string; // Changed to string to match your model
  type: "default" | "mentor"; // Changed assignedBy to type to match your model
  status: SectionType; // Add status to task
}

export const KanbanBoard = ({ userType }: AuthFormProps) => {
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
        hoverBg: "hover:border-2",
        shadow: "shadow-xs hover:shadow-[#1D4ED8]",
      };

  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Record<SectionType, Task[]>>({
    Todo: [],
    Inprogress: [],
    Completed: [],
  });

  const [taskCompleted, setTaskCompleted] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosTask.post("/tasks/level", { track: "Frontend", level: "Level 1" });
        const fetchedTasks: Task[] = response.data;


        console.log(response.data);

        // Group tasks by status
        const groupedTasks: Record<SectionType, Task[]> = {
          Todo: [],
          Inprogress: [],
          Completed: [],
        };

        fetchedTasks.forEach((task) => {
          groupedTasks[task.status].push(task);
        });

        setTasks(groupedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const deleteTask = async (section: SectionType, index: number) => {
    // Optimistically update the UI
    const taskIdToDelete = tasks[section][index]._id;
    setTasks((prev) => {
      const newTasks = { ...prev };
      newTasks[section] = prev[section].filter((_, i) => i !== index);
      return newTasks;
    });

    // Call the API to delete the task (assuming you have a delete API endpoint)
    try {
      await axiosTask.delete(`/tasks/${taskIdToDelete}`);
      // If the API call is successful, the optimistic update remains.
      // If it fails, you'll need to handle the error and possibly revert the UI update.
    } catch (error) {
      console.error("Error deleting task:", error);
      // Revert the UI update if the API call fails
      // You might want to show an error message to the user as well
      // Example:
      // setTasks(prevTasks); // Revert to the previous state
    }
  };


  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const sourceSection = source.droppableId as SectionType;
    const destinationSection = destination.droppableId as SectionType;

    // Find the moved task
    const taskToMove = tasks[sourceSection].find(task => task._id === draggableId);
    if (!taskToMove) return;

    // Optimistically update the UI
    setTasks(prevTasks => {
      const newTasks = { ...prevTasks };

      // Remove task from source section
      newTasks[sourceSection] = newTasks[sourceSection].filter(task => task._id !== draggableId);

      // Add task to destination section
      newTasks[destinationSection] = [
        ...newTasks[destinationSection].slice(0, destination.index),
        taskToMove,
        ...newTasks[destinationSection].slice(destination.index)
      ];

      return newTasks;
    });

    // Update task status on the server
    try {
      await axiosTask.put(`/tasks/updateStatus/${draggableId}`, { status: destinationSection });
      if (destinationSection === "Completed") {
        setTaskCompleted(true)
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      // Revert the UI update if the API call fails
      // setTasks(prevTasks); // Revert to the previous state
    }
  };

  useEffect(() => {
    if (taskCompleted) {
      const timer = setTimeout(() => {
        setTaskCompleted(false);
      }, 8000);
      return () => clearTimeout(timer); // Clear the timeout if the component unmounts or taskCompleted changes
    }
  }, [taskCompleted]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {taskCompleted && <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
      />}
      <div className="w-[95%] mx-auto justify-center rounded-md h-full flex flex-wrap gap-4 p-4">
        {SECTIONS.map((section) => (
          <Droppable key={section} droppableId={section}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`flex-1 min-w-[280px] max-w-[calc(95%-1rem)] md:min-w-[200px] md:max-w-[calc(33%-1rem)] p-4 rounded-md border ${colors.border} ${colors.bg} ${colors.shadow} flex flex-col`}
              >
                <div className={`text-lg font-semibold ${colors.text} capitalize`}>
                  {section}
                </div>
                <hr className="mt-2" />
                <div className="mt-4 space-y-2 overflow-y-auto flex-grow max-h-[90%]">
                  {tasks[section].map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          onClick={() => navigate(`/task/${task._id}`)}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`p-2 rounded-md ${colors.hoverBg} border ${colors.border} flex justify-between items-center relative group`}
                        >
                          <div className="flex flex-col text-left">
                            <span>{task.name}</span>
                            <div className="text-xs flex space-x-2 text-sm text-gray-500 mt-1">
                              {task?.level && <span className="px-2 py-1 rounded-md bg-blue-200">
                                {task.level}
                              </span>}
                              <span className={`px-2 py-1 rounded-md ${task.type === "default" ? "bg-blue-200" : "bg-yellow-200"}`}>
                                {task.type}
                              </span>
                            </div>
                          </div>
                          {task.type === "mentor" && <button
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent navigation
                              deleteTask(section, index);
                            }}
                            className="text-red-500 hidden group-hover:block absolute right-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>}

                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
                {userType === "mentor" &&
                  <div className="pt-4">
                    <button
                      onClick={() => navigate("/addtask")}
                      className={`w-full mt-auto p-2 rounded-md text-center ${colors.text} border ${colors.border} hover:shadow-md`}
                    >
                      Add Task
                    </button>
                  </div>}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};
