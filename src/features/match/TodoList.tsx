import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trash, CheckCircle } from "lucide-react";

const colors: Record<
  "mentor" | "student",
  { bg: string; border: string; text: string; buttonBg: string; buttonHoverBg: string }
> = {
  mentor: {
    bg: "bg-[#FFF5E6]",
    border: "border-[#FFC400]",
    text: "text-[#FF8C00]",
    buttonBg: "bg-[#FFC400]",
    buttonHoverBg: "hover:bg-[#FFD966]",
  },
  student: {
    bg: "bg-[#EFF6FF]",
    border: "border-[#1D4ED8]",
    text: "text-[#1D4ED8]",
    buttonBg: "bg-[#1D4ED8]",
    buttonHoverBg: "hover:bg-[#3B82F6]",
  },
};

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

interface TodoProps {
  role: "mentor" | "student";
}

const TodoList: React.FC<TodoProps> = ({ role }) => {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className={`px-6 py-8 h-full overflow-scroll max-w-lg mx-auto rounded-lg shadow-md ${colors[role].bg} ${colors[role].border} border-2`}>
      <h2 className={`text-2xl font-semibold mb-4 ${colors[role].text}`}>Today's task</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={addTask}
          className={`px-4 py-2 text-white font-semibold rounded-lg transition ${colors[role].buttonBg} ${colors[role].buttonHoverBg}`}
        >
          Add
        </button>
      </div>

      <ul className="space-y-3">
        {tasks.map((task) => (
          <motion.li
            key={task.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className={`flex justify-between items-center p-3 rounded-lg border ${colors[role].border} shadow-sm ${
              task.completed ? "opacity-50 line-through" : ""
            }`}
          >
            <span className="flex-1">{task.text}</span>
            <div className="flex gap-2">
              <button onClick={() => toggleTask(task.id)} className="text-green-600 hover:text-green-800">
                <CheckCircle size={20} />
              </button>
              <button onClick={() => deleteTask(task.id)} className="text-red-600 hover:text-red-800">
                <Trash size={20} />
              </button>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
