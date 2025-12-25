import { useState } from "react";
import axios from "axios";

// Vite API URL configuration
const API_URL = import.meta.env.VITE_API_URL || " https://task-manager-km43.onrender.com";

const TaskForm = ({ refresh }) => {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const addTask = async (e) => {
  
    if (e) e.preventDefault();
    
   
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
     
      await axios.post(`${API_URL}/tasks`, { title: title.trim() });
      
      setTitle("");   
      refresh();      
    } catch (err) {
      console.error("There was a problem adding the task", err.response?.data || err.message);
      alert("Error: Could not add task. Make sure the server is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Enter your task name..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addTask()} 
      />
      <button
        onClick={addTask}
        disabled={isSubmitting}
        className={`${
          isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        } text-white px-6 rounded transition-colors font-semibold`}
      >
        {isSubmitting ? "Adding..." : "Add"}
      </button>
    </div>
  );
};

export default TaskForm;