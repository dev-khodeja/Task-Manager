import axios from "axios";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || " https://task-manager-km43.onrender.com";

const TaskList = ({ tasks = [], refresh }) => {
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  // 🗑️ Delete Task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      refresh();
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };

  // ✅ Toggle Task Status
  const toggleTask = async (id) => {
    try {
      await axios.patch(`${API_URL}/tasks/${id}`);
      refresh();
    } catch (err) {
      console.error("Toggle error:", err.message);
    }
  };

  // ✏️ Start Edit
  const startEdit = (task) => {
    setEditId(task._id);
    setEditTitle(task.title);
  };

  // 💾 Save Edit
  const saveEdit = async (id) => {
    try {
      await axios.put(`${API_URL}/tasks/${id}`, {
        title: editTitle,
      });
      setEditId(null);
      setEditTitle("");
      refresh();
    } catch (err) {
      console.error("Edit error:", err.message);
    }
  };

  if (!Array.isArray(tasks) || tasks.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-4 italic">
        No tasks available. Please add one!
      </p>
    );
  }

  return (
    <ul className="space-y-3 mt-4">
      {tasks.map((task) => (
        <li
          key={task._id}
          className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border shadow-sm"
        >
          <div className="flex items-center gap-3 flex-1">
            <input
              type="checkbox"
              checked={task.status || false}
              onChange={() => toggleTask(task._id)}
              className="w-5 h-5"
            />

            {/* ✏️ Edit Mode */}
            {editId === task._id ? (
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="border px-2 py-1 rounded w-full"
              />
            ) : (
              <span
                className={`text-lg cursor-pointer ${
                  task.status
                    ? "line-through text-gray-400"
                    : "text-gray-700"
                }`}
                onClick={() => toggleTask(task._id)}
              >
                {task.title}
              </span>
            )}
          </div>

          <div className="flex gap-2 ml-3">
            {/* 💾 Save / ✏️ Edit */}
            {editId === task._id ? (
              <button
                onClick={() => saveEdit(task._id)}
                className="bg-green-100 px-3 py-1 rounded text-green-600"
              >
                ✔️
              </button>
            ) : (
              <button
                onClick={() => startEdit(task)}
                className="bg-blue-100 px-3 py-1 rounded text-blue-600"
              >
                ✏️
              </button>
            )}

            {/* ❌ Delete */}
            <button
              onClick={() => deleteTask(task._id)}
              className="bg-red-100 px-3 py-1 rounded text-red-600"
            >
              ❌
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
