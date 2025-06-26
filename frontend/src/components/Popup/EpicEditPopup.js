import React, { useState } from "react";
import "./EditPopup.css";

export default function EpicEditPopup({ initialData, onClose, onUpdate }) {
  const [title, setTitle] = useState(initialData.title);
  const [description, setDescription] = useState(initialData.description);

  const handleSubmit = () => {
    if (!title || !description) {
      alert("All fields required");
      return;
    }
    onUpdate({ ...initialData, name:title, description });
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <h3 className="popup-title">Edit Epic</h3>
        <input
          type="text"
          placeholder="Epic Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Epic Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="popup-actions">
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
