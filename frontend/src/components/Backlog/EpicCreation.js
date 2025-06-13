import { useState, useEffect } from "react";
import axios from "axios";
import "./EpicCreation.css";

export default function EpicCreation() {
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/projects`);
        setProjects(res.data);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      }
    };
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { title, description, project_id: projectId };
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/epics`, payload);
      setMessage("Epic created successfully!");
      setTitle("");
      setDescription("");
      setProjectId("");
    } catch (err) {
      console.error("Epic creation failed:", err);
      setMessage("Error creating epic.");
    }
  };

  return (
    <div className="epic-form-container">
      <h2>Create Epic</h2>
      <form className="epic-form" onSubmit={handleSubmit}>
        <label>Project</label>
        <select value={projectId} onChange={(e) => setProjectId(e.target.value)} required>
          <option value="">-- Select Project --</option>
          {projects.map((proj) => (
            <option key={proj.id} value={proj.id}>
              {proj.title}
            </option>
          ))}
        </select>

        <label>Title</label>
        <input
          type="text"
          placeholder="Epic title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Description</label>
        <textarea
          placeholder="Epic description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <button type="submit">Create Epic</button>
        {message && <p className="epic-message">{message}</p>}
      </form>
    </div>
  );
}
