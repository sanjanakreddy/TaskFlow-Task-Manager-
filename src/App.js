import React, { useState,useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  useEffect(()=> {
    localStorage.setItem("tasks",JSON.stringify(tasks));
  },[tasks]);
  const hour = new Date().getHours();

const greeting =
  hour < 12 ? "Good Morning ☀️" :
  hour < 17 ? "Good Afternoon 🌤️" :
  hour < 21 ? "Good Evening 🌆" :
  "Good Night 🌙";

  const addTask = () => {
    if (task.trim().length < 3) {
  alert("Task must contain at least 3 characters.");
  return;
}

    setTasks([
      ...tasks,
      { id: Date.now(), title: task, done: false, priority }
    ]);

    setTask("");
  };

  const toggleTask = id =>
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    ));

  const deleteTask = id =>
    setTasks(tasks.filter(t => t.id !== id));

  const visible = tasks.filter(t =>
    (filter === "all" ||
      (filter === "completed" && t.done) ||
      (filter === "pending" && !t.done)) &&
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  const completed = tasks.filter(t => t.done).length;

  return (
    <div className="app">

      <header>
        <div>
          <h1>TaskFlow</h1>
          <p>Student Task Management</p>
        </div>
        <div className="profile"><b>S</b> Student</div>
      </header>

      <section className="welcome">
        <h2>{greeting}</h2>
        <p>Stay organized and complete your goals today.</p>
      </section>

      <section className="stats">
        <div><strong>{tasks.length}</strong><span>📋 Total Tasks</span></div>
        <div><strong>{completed}</strong><span>✓ Completed</span></div>
        <div><strong>{tasks.length - completed}</strong><span>⏳ Pending</span></div>
      </section>

      <main>
        <h2>My Tasks</h2>
        <p className="sub">Manage your daily activities</p>

        <div className="add">
          <input
            value={task}
            placeholder="Enter a new task..."
            onChange={e => setTask(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addTask()}
          />

          <select
            value={priority}
            onChange={e => setPriority(e.target.value)}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <button onClick={addTask}>+ Add Task</button>
        </div>

        <div className="toolbar">
          <div>
            {["all", "pending", "completed"].map(f => (
              <button
                className={filter === f ? "active" : ""}
                onClick={() => setFilter(f)}
                key={f}
              >
                {f[0].toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <input
            className="search"
            placeholder="Search tasks..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="tasks">
          {visible.length ? visible.map(t => (
            <div className={`task ${t.done ? "done" : ""}`} key={t.id}>
              <label>
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => toggleTask(t.id)}
                />
                <span>{t.title}</span>
                <small className={t.priority.toLowerCase()}>
                  {t.priority}
                </small>
              </label>

              <button onClick={() => deleteTask(t.id)}>🗑</button>
            </div>
          )) : (
            <div className="empty">
              📝
              <h3>No tasks found</h3>
              <p>Add a task to get started.</p>
            </div>
          )}
        </div>
      </main>

      <footer>© 2026 TaskFlow • Student Task Management System</footer>

    </div>
  );
}

export default App;