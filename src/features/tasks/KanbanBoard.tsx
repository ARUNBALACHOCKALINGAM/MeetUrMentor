import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { AuthFormProps } from "../../abstraction/types/authentication.types";
import { useNavigate } from "react-router-dom";
import Confetti from 'react-confetti'

const SECTIONS = ["todo", "inprogress", "completed"] as const;
type SectionType = typeof SECTIONS[number];

interface Task {
  name: string;
  level?: "Level 1" | "Level 2" | "Level 3";
  assignedBy: "default" | "mentor";
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
    todo: [
      { name: "Task 1", level: "Level 1", assignedBy: "default" },
      { name: "Task 2", level: "Level 2", assignedBy: "mentor" },
    ],
    inprogress: [{ name: "Task 3", level: "Level 3", assignedBy: "mentor" }],
    completed: [{ name: "Task 4", assignedBy: "default" }],
  });

  const [taskCompleted,setTaskCompleted] = useState(false);

  const addTask = (section: SectionType) => {
    const taskName = prompt("Enter the task name:");
    const taskLevel = prompt("Enter task level (Level 1, Level 2, Level 3):");
    const assignedBy = userType === "mentor" ? "mentor" : "default";

    if (taskName && taskLevel) {
      const newTask: Task = {
        name: taskName,
        level: taskLevel as "Level 1" | "Level 2" | "Level 3",
        assignedBy,
      };
      setTasks((prev) => ({
        ...prev,
        [section]: [...prev[section], newTask],
      }));
    }
  };

  const deleteTask = (section: SectionType, index: number) => {
    setTasks((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const sourceSection = source.droppableId as SectionType;
    const destinationSection = destination.droppableId as SectionType;

    const sourceList = [...tasks[sourceSection]];
    const [movedItem] = sourceList.splice(source.index, 1);
    const destinationList = [...tasks[destinationSection]];
    destinationList.splice(destination.index, 0, movedItem);

    setTasks({
      ...tasks,
      [sourceSection]: sourceList,
      [destinationSection]: destinationList,
    });

    if (destinationSection === "completed") {
      setTaskCompleted(true)
    }
  };

  setTimeout(()=>{
    setTaskCompleted(false)
  },8000,taskCompleted)

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {taskCompleted && <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
      />}
      <div className="justify-center rounded-md h-full flex flex-wrap gap-4 p-4">
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
                    <Draggable key={task.name} draggableId={task.name} index={index}>
                      {(provided) => (
                        <div
                          onClick={() => navigate("/task")}
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
                              <span className={`px-2 py-1 rounded-md ${task.assignedBy === "default" ? "bg-blue-200" : "bg-yellow-200"}`}>
                                {task.assignedBy}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => deleteTask(section, index)}
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
                          </button>
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


