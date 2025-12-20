import axios from "axios";

// Vite API URL configuration
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const TaskList = ({ tasks = [], refresh }) => {
  
  // 🗑️ Task Delete Function
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      refresh(); 
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };

  // ✅ Task Toggle Function
  const toggleTask = async (id) => {
    try {
      await axios.patch(`${API_URL}/tasks/${id}`);
      refresh(); 
    } catch (err) {
      console.error("Toggle error:", err.message);
    }
  };


  if (!Array.isArray(tasks) || tasks.length === 0) {
    return <p className="text-center text-gray-500 mt-4 italic">"No tasks available. Please add one!"</p>;
  }

  return (
    <ul className="space-y-3 mt-4">
      {tasks.map((task) => (
        <li
          key={task._id}
          className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-3">
            <input 
              type="checkbox" 
              checked={task.status || false} 
              onChange={() => toggleTask(task._id)}
              className="w-5 h-5 cursor-pointer"
            />
            <span
              className={`text-lg cursor-pointer ${
                task.status ? "line-through text-gray-400" : "text-gray-700"
              }`}
              onClick={() => toggleTask(task._id)}
            >
              {task.title}
            </span>
          </div>

          <button
            onClick={() => deleteTask(task._id)}
            className="bg-red-100 hover:bg-red-200 p-2 rounded-full text-red-600 transition-colors"
            title="Delete Task"
          >
            ❌
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;