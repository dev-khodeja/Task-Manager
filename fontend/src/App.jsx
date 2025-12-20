import axios from "axios";
import { useEffect, useState } from "react";
import TaskForm from "./components/taskform";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state add kora holo
  const [error, setError] = useState(null);   // Error state add kora holo

  // 🔄 Task list fetch korar function
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`);
      console.log("Full Response:", res); // এটি কনসোলে চেক করুন

      // অনেক সময় res.data এর বদলে res.data.data বা res.data.tasks এ লিস্ট থাকে
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

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-center mb-5 text-gray-800">
        ✅ TaskFlow Manager
      </h1>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* ➕ Task Add Form */}
        <TaskForm refresh={fetchTasks} />

        <hr className="my-6 border-gray-200" />

        {/* 🚧 Loading/Error Message */}
        {loading && <p className="text-center text-blue-500">Loading.....</p>}
        {error && <p className="text-center text-red-500 font-medium">Error: {error}</p>}

        {/* 📝 Task List */}
        {!loading && !error && (
          <TaskList tasks={tasks} refresh={fetchTasks} />
        )}

        {!loading && !error && tasks.length === 0 && (
          <p className="text-center text-gray-500 mt-4"></p>
        )}
      </div>
    </div>
  );
}

export default App;