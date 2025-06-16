import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserStoryCreation.css";

export default function UserStoryCreation() {
  const [epics, setEpics] = useState([]);
  const [epicId, setEpicId] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/epics/getAll`)
      .then((res) => setEpics(res.data))
      .catch((err) => console.error("Error fetching epics", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/userstories/create`, {
        title,
        description,
        epicId,
      });
      setMessage("User Story created successfully.");
      setTitle("");
      setDescription("");
      setEpicId("");
    } catch (err) {
      setMessage("Error creating user story.");
    }
  };

  return (
    <form className="userstory-form" onSubmit={handleSubmit}>
      <h2>Create User Story</h2>

      <label>Epic:</label>
      <select value={epicId} onChange={(e) => setEpicId(parseInt(e.target.value))} required>
        <option value="">Select Epic</option>
        {epics.map((epic) => (
          <option key={epic.id} value={epic.id}>{epic.title}</option>
        ))}
      </select>

      <label>Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

      <label>Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

      <button type="submit">Create</button>
      {message && <p className="msg">{message}</p>}
    </form>
  );
}
