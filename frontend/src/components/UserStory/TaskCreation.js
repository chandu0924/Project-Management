import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./TaskCreation.css";

export default function CreateTaskForm() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [userStoryData, setUserStoryData] = useState(null);
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(1);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const { epicId, storyId } = useParams();

  useEffect(() => {
    const newStoryId = parseInt(storyId);
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/userstories/getById/${newStoryId}`)
      .then((res) => {setUserStoryData(res.data); console.log("thisis ",res.data);})
      .catch((err) => console.error("Error fetching user stories", err));

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/getAll`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/create`, {
        storyId: parseInt(storyId),
        title,
        description,
        status : "ToDo",
        priority,
        assigned_to: userId,
      });
      setMessage("Task created successfully.");
      setTitle("");
      setDescription("");
      // setuserStoryId("");
      setUserId("");
      setPriority(1);

      setTimeout(() => {
        navigate(`/backlog/epic/${epicId}/userstory/${storyId}`);
      }, 1000);
    } catch (err) {
      setMessage("Error creating task.");
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Create Task</h2>

      <label>User Story:</label>
      {/* <select value={userStoryId} onChange={(e) => setuserStoryId(parseInt(e.target.value))} required>
        <option value="">Select User Story</option>
        {stories.map((story) => (
          <option key={story.id} value={story.id}>{story.title}</option>
        ))}
      </select> */}
      <select value={storyId} disabled required>
        <option value={storyId}>
          {userStoryData ? userStoryData[0].title : "Loading..."}
        </option>
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
