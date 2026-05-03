import React, { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, task]);
    setTask("");
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>TO-DO Application</h2>

      <input
        type="text"
        placeholder="Enter task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={addTask}>Add</button>

      <ul style={{ listStyle: "none" }}>
        {tasks.map((t, i) => (
          <li key={i}>
            {t}
            <button onClick={() => deleteTask(i)}> ❌ </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;