import React, { useState } from "react";
import "./EditPopup.css";

export default function TaskEditPopup({ initialData, onClose, onUpdate }) {
  const [title, setTitle] = useState(initialData.title);
  const [description, setDescription] = useState(initialData.description);
  const [status, setStatus] = useState(initialData.status);

  const handleSubmit = () => {
    if (!title || !description || !status) {
      alert("All fields required");
      return;
    }
    onUpdate({ ...initialData, title, description, status });
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <h3 className="popup-title">Edit Task</h3>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Task Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <div className="popup-actions">
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
