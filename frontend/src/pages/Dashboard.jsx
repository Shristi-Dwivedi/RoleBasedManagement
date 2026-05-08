import { useContext, useEffect, useState } from "react";

import API from "../api/axios";

import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
    const { token, logout } = useContext(AuthContext);

    const [tasks, setTasks] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "pending",
    });

    const fetchTasks = async () => {
        try {
            const res = await API.get("/tasks", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setTasks(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const createTask = async (e) => {
        e.preventDefault();

        console.log("SUBMIT DATA:", formData);

        if (!formData.title || !formData.description) {
            alert("Fill all fields");
            return;
        }

        try {
            const res = await API.post(
                "/tasks",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("CREATED:", res.data);

            fetchTasks();
        } catch (error) {
            console.log("STATUS:", error.response?.status);
            console.log("DATA:", error.response?.data);
            console.log("MESSAGE:", error.message);
        }
    };

    const updateTaskStatus = async (id, currentStatus) => {
        try {
            const newStatus =
                currentStatus === "completed"
                    ? "pending"
                    : "completed";

            await API.put(
                `/tasks/${id}`,
                {
                    status: newStatus,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchTasks();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await API.delete(`/tasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            fetchTasks();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <div className="navbar">
                <h1>Task Dashboard</h1>

                <button
                    className="secondary-btn"
                    onClick={logout}
                >
                    Logout
                </button>
            </div>

            <div className="card">
                <h2>Create Task</h2>

                <form onSubmit={createTask}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Task title"
                        value={formData.title}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="description"
                        placeholder="Task description"
                        value={formData.description}
                        onChange={handleChange}
                    />

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="pending">
                            Pending
                        </option>

                        <option value="in-progress">
                            In Progress
                        </option>

                        <option value="completed">
                            Completed
                        </option>
                    </select>

                    <button
                        className="primary-btn"
                        type="submit"
                    >
                        Add Task
                    </button>
                </form>
            </div>

            <div className="card">
                <h2>All Tasks</h2>

                {tasks.length === 0 ? (
                    <p>No tasks available</p>
                ) : (
                    tasks.map((task) => (
                        <div
                            className="task-card"
                            key={task._id}
                        >
                            <h3>{task.title}</h3>

                            <p>{task.description}</p>

                            <p>
                                <strong>Status:</strong>{" "}
                                {task.status}
                            </p>

                            <div className="task-actions">
                                <button
                                    className="primary-btn"
                                    onClick={() =>
                                        updateTaskStatus(
                                            task._id,
                                            task.status
                                        )
                                    }
                                >
                                    Toggle Status
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() =>
                                        deleteTask(task._id)
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Dashboard;