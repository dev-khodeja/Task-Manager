import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editTask, setEditTask] = useState(null);

  
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`);
      console.log("Full Response:", res);

      if (Array.isArray(res.data)) {
        setTasks(res.data);
      } else if (res.data.tasks) {
        setTasks(res.data.tasks);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  const handleEditTask = (task) => {
    setEditTask(task); 
  };

  
  const handleSaveTask = async (task) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/tasks/${task.id}`, task);
      fetchTasks(); 
      setEditTask(null); 
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  return (
    <div className="min-h-screen bg-grey-100 p-5">
      <h1 className="text-3xl font-bold text-center mb-5 text-gray-800">✅ TaskFlow Manager</h1>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <TaskForm
          refresh={fetchTasks}
          editTask={editTask} 
          handleSaveTask={handleSaveTask} 
        />

        <hr className="my-6 border-gray-200" />

        {loading && <p className="text-center text-blue-500">Loading.....</p>}
        {error && <p className="text-center text-red-500 font-medium">Error: {error}</p>}

        {!loading && !error && tasks.length > 0 && (
          <TaskList tasks={tasks} handleEditTask={handleEditTask} refresh={fetchTasks} />
        )}

        {!loading && !error && tasks.length === 0 && <p className="text-center text-gray-500 mt-4">No tasks found!</p>}
      </div>
    </div>
  );
}

export default App;
