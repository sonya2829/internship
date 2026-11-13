
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const api = axios.create({
    baseURL: "http://localhost:5001/api/tasks",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Fetch All Tasks
  const fetchTasks = async () => {
    try {
      const response = await api.get("/");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    fetchTasks();
  }, []);

  // Add Task
  const handleAddTask = async (e) => {
    e.preventDefault();

    try {
      await api.post("/", { title, description });
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add task");
    }
  };

  // Update Task
  const handleUpdateTask = async (task) => {
    const updatedTitle = prompt("Enter updated task title:", task.title);

    if (updatedTitle === null || !updatedTitle.trim()) return;

    try {
      await api.put(`/${task._id}`, {
        title: updatedTitle,
        description: task.description,
        completed: task.completed,
      });

      fetchTasks();
    } catch (error) {
      alert("Failed to update task");
    }
  };

  // Mark Task Completed
  const handleToggleTask = async (task) => {
    try {
      await api.put(`/${task._id}`, {
        title: task.title,
        description: task.description,
        completed: !task.completed,
      });

      fetchTasks();
    } catch (error) {
      alert("Failed to update task status");
    }
  };

  // Delete Task
  const handleDeleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      await api.delete(`/${id}`);
      fetchTasks();
    } catch (error) {
      alert("Failed to delete task");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>My To-Do Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>

      <form className="task-form" onSubmit={handleAddTask}>
        <h2>Add New Task</h2>

        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Add Task</button>
      </form>

      <section className="task-list">
        <h2>My Tasks ({tasks.length})</h2>

        {tasks.length === 0 ? (
          <p>No tasks available. Add your first task!</p>
        ) : (
          tasks.map((task) => (
            <div className="task-card" key={task._id}>
              <div>
                <h3
                  style={{
                    textDecoration: task.completed
                      ? "line-through"
                      : "none",
                  }}
                >
                  {task.title}
                </h3>

                <p>{task.description}</p>

                <p>
                  Status: {task.completed ? "Completed" : "Pending"}
                </p>
              </div>

              <div className="task-actions">
                <button onClick={() => handleToggleTask(task)}>
                  {task.completed ? "Undo" : "Complete"}
                </button>

                <button onClick={() => handleUpdateTask(task)}>
                  Edit
                </button>

                <button onClick={() => handleDeleteTask(task._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default Dashboard;
