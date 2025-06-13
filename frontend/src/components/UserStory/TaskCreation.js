import React, { useState } from "react";
import "./CreateTask.css";

export default function CreateTask() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("ToDo");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Task:", { name, status });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Create Task</h2>
      <input
        type="text"
        placeholder="Task Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="ToDo">To Do</option>
        <option value="InProgress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit">Create Task</button>
    </form>
  );
}
