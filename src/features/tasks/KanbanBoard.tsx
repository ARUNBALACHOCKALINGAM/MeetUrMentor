import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { AuthFormProps } from "../../abstraction/types/authentication.types";

// Section names as an array for better reusability
const SECTIONS = ["todo", "inprogress", "completed"] as const;

// Type for section keys
type SectionType = typeof SECTIONS[number];

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
          hoverBg: "hover:bg-[#1D4ED8]",
          shadow: "shadow-xs hover:shadow-[#1D4ED8]",
        };

  const [tasks, setTasks] = useState<Record<SectionType, string[]>>({
    todo: ["Task 1", "Task 2"],
    inprogress: ["Task 3"],
    completed: ["Task 4"],
  });

  const addTask = (section: SectionType) => {
    const task = prompt("Enter the task:");
    if (task) {
      setTasks((prev) => ({
        ...prev,
        [section]: [...prev[section], task],
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
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="bg-gray-100 justify-center rounded-md h-full flex flex-wrap gap-4 p-4">
        {SECTIONS.map((section) => (
          <Droppable key={section} droppableId={section}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`flex-1 min-w-[280px] max-w-[calc(95%-1rem)] md:min-w-[200px] md:max-w-[calc(33%-1rem)] p-4 rounded-md border ${colors.border} ${colors.bg} ${colors.shadow}`}
              >
                <div className={`text-lg font-semibold ${colors.text} capitalize`}>
                  {section}
                </div>
                <div className="mt-4 space-y-2">
                  {tasks[section].map((task, index) => (
                    <Draggable key={task} draggableId={task} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`p-2 rounded-md ${colors.hoverBg} flex justify-between items-center`}
                        >
                          <span>{task}</span>
                          <button
                            onClick={() => deleteTask(section, index)}
                            className="text-red-500 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
                <button
                  onClick={() => addTask(section)}
                  className={`mt-4 w-full p-2 rounded-md text-center ${colors.text} border ${colors.border} hover:shadow-md`}
                >
                  Add Task
                </button>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};
