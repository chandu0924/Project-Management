// const { projectId, epicId, storyId, taskId } = useParams();
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TaskCreation.css";

export default function CreateTaskForm() {
  const [stories, setStories] = useState([]);
  const [users, setUsers] = useState([]);
  const [storyId, setStoryId] = useState("");
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user-stories`)
      .then((res) => setStories(res.data))
      .catch((err) => console.error("Error fetching user stories", err));

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/tasks`, {
        user_story_id: storyId,
        title,
        description,
        assigned_to: userId,
        priority
      });
      setMessage("Task created successfully.");
      setTitle("");
      setDescription("");
      setStoryId("");
      setUserId("");
      setPriority(1);
    } catch (err) {
      setMessage("Error creating task.");
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Create Task</h2>

      <label>User Story:</label>
      <select value={storyId} onChange={(e) => setStoryId(e.target.value)} required>
        <option value="">Select User Story</option>
        {stories.map((story) => (
          <option key={story.id} value={story.id}>{story.title}</option>
        ))}
      </select>

      <label>Assign to User:</label>
      <select value={userId} onChange={(e) => setUserId(e.target.value)}>
        <option value="">Select User</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>{user.email}</option>
        ))}
      </select>

      <label>Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

      <label>Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

      <label>Priority:</label>
      <input type="number" value={priority} min="1" max="5" onChange={(e) => setPriority(e.target.value)} />

      <button type="submit">Create</button>
      {message && <p className="msg">{message}</p>}
    </form>
  );
}
