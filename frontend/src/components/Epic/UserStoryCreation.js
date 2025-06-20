import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserStoryCreation.css";
import { useNavigate, useParams } from "react-router-dom";

export default function UserStoryCreation() {
  const [epicData, setEpicData] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const { epicId, projectId } = useParams();

  useEffect(() => {
    const newEpicId = parseInt(epicId);
    console.log("newEpicId", newEpicId)
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/epics/getById/${newEpicId}`)
      .then((res) => setEpicData(res.data))
      .catch((err) => console.error("Error fetching epics", err));
  }, [epicId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/userstories/create`, {
        title,
        description,
        epicId: parseInt(epicId),
      });
      setMessage("User Story created successfully.");
      setTitle("");
      setDescription("");
      // setEpicId("");

      setTimeout(() => {
        navigate(`/projects/${projectId}/epic/${epicId}`);
      }, 1000);
    } catch (err) {
      setMessage("Error creating user story.");
    }
  };

  return (
    <form className="userstory-form" onSubmit={handleSubmit}>
      <div className="userstory-form-header">
        <h2>Create User Story</h2>
        <div 
          className="close-button"
          onClick={() => navigate(`/projects/${projectId}/epic/${epicId}`)}
        >&#10005;</div>
      </div>
      {/* <label>Epic:</label>
      <select value={epicId} 
      onChange={(e) => setEpicId(parseInt(e.target.value))} 
       required >
        <option value={epicId}>Select Epic</option>
        {epics.map((epic) => (
          <option key={epic.id} value={epic.id}>{epic.title}</option>
        ))}
      </select> */}
      <label>Epic:</label>
      <select value={epicId} disabled required>
        <option value={epicId}>
          {epicData ? epicData[0].title : "Loading..."}
        </option>
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
