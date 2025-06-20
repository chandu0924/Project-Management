import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EpicCreation.css";
import { useNavigate, useParams } from "react-router-dom";

export default function UnifiedTaskCreation() {
  const [projects, setProjects] = useState([]);
  const [epics, setEpics] = useState([]);
  const [stories, setStories] = useState([]);
  const [users, setUsers] = useState([]);

  const { projectId } = useParams();

  const [selectedEpic, setSelectedEpic] = useState("");
  const [selectedStory, setSelectedStory] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const [createEpic, setCreateEpic] = useState(false);
  const [newEpicTitle, setNewEpicTitle] = useState("");
  const [newEpicDesc, setNewEpicDesc] = useState("");

  const [createStory, setCreateStory] = useState(false);
  const [newStoryTitle, setNewStoryTitle] = useState("");
  const [newStoryDesc, setNewStoryDesc] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(1);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const userRes = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/getAll`);
        setUsers(userRes.data);
        console.log("users data", userRes.data)
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (projectId) {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/epics/getByProjectId/${parseInt(projectId)}`)
        .then((res) => setEpics(res.data))
        .catch((err) => console.error("Failed to fetch epics", err));
    } else {
      setEpics([]);
      setSelectedEpic("");
    }
  }, [projectId]);

  useEffect(() => {
    if (selectedEpic) {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/userstories/getByEpicId/${parseInt(selectedEpic)}`) 
        .then((res) => setStories(res.data))
        .catch((err) => console.error("Failed to fetch stories", err));
    } else {
      setStories([]);
      setSelectedStory("");
    }
  }, [selectedEpic]);

  const handleEpicCreate = async () => {
    if (!newEpicTitle || !projectId) return;
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/epics/create`, {
        title: newEpicTitle,
        description: newEpicDesc,
        projectId: parseInt(projectId),
      });

      console.log("created",res.data)
      const newEpic = res.data;
      setEpics([...epics, newEpic]);
      setSelectedEpic(newEpic.id.toString());
      setCreateEpic(false);
      setNewEpicTitle("");
      setNewEpicDesc("");
    } catch (err) {
      console.error("Epic creation failed", err);
    }
  };

  const handleStoryCreate = async () => {
    if (!newStoryTitle || !selectedEpic) return;
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/userstories/create`, {
        title: newStoryTitle,
        description: newStoryDesc,
        epicId: parseInt(selectedEpic),
      });
      const newStory = res.data;
      setStories([...stories, newStory]);
      setSelectedStory(newStory.id.toString());
      setCreateStory(false);
      setNewStoryTitle("");
      setNewStoryDesc("");
    } catch (err) {
      console.error("User story creation failed", err);
    }
  };

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStory || !selectedUser) {
      setMessage("Please select user story and user.");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/create`, {
        storyId: parseInt(selectedStory),
        title,
        description,
        priority,
        status: "ToDo",
        assigned_to: selectedUser,
        projectId: parseInt(projectId),
        epicId: parseInt(selectedEpic)
      });
      setMessage("Task created successfully!");
      setTimeout(() => setMessage(""), 1500);

      setTitle("");
      setDescription("");
      setPriority(1);
      setSelectedUser("");
    } catch (err) {
      console.error("Task creation failed", err);
      setMessage("Failed to create task.");
    }
  };

  return (
    <div className="unified-task-form">
      <h2>Create Task</h2>
      <form onSubmit={handleTaskSubmit}>
        {/* Project */}
        <label>Project:</label>
        <input
          type="text"
          value={projectId}
          disabled
        />

        {/* Epic */}
        <label>Epic:</label>
        <select
          value={selectedEpic.toString()}
          onChange={(e) => {
            if (e.target.value === "new") setCreateEpic(true);
            else {
              setSelectedEpic(e.target.value);
              setCreateEpic(false);
            }
          }}
          disabled={!projectId}
          required
        >
          {/* <option value="">Select Epic</option> */}
          {epics.map((epic) => (
            <option key={epic.id} value={epic.id}>{epic.title}</option>
          ))}
          <option value="new">+ Create New Epic</option>
        </select>

        {createEpic && (
          <div className="inline-create">
            <input placeholder="Epic title" value={newEpicTitle} onChange={(e) => setNewEpicTitle(e.target.value)} />
            <input placeholder="Epic description" value={newEpicDesc} onChange={(e) => setNewEpicDesc(e.target.value)} />
            <button type="button" onClick={handleEpicCreate}>Save Epic</button>
          </div>
        )}

        {/* User Story */}
        <label>User Story:</label>
        <select
          value={selectedStory.toString()}
          onChange={(e) => {
            if (e.target.value === "new") setCreateStory(true);
            else {
              setSelectedStory(e.target.value);
              setCreateStory(false);
            }
          }}
          disabled={!selectedEpic}
          required
        >
          {/* <option value="">Select Story</option> */}
          {stories.map((story) => (
            <option key={story.id} value={story.id}>{story.title}</option>
          ))}
          <option value="new">+ Create New Story</option>
        </select>

        {createStory && (
          <div className="inline-create">
            <input placeholder="Story title" value={newStoryTitle} onChange={(e) => setNewStoryTitle(e.target.value)} />
            <input placeholder="Story description" value={newStoryDesc} onChange={(e) => setNewStoryDesc(e.target.value)} />
            <button type="button" onClick={handleStoryCreate}>Save Story</button>
          </div>
        )}

        {/* Assign To */}
        <label>Assign To:</label>
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} required>
          <option value="">Select User</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>{u.email}</option>
          ))}
        </select>

        {/* Task Details */}
        <label>Title:</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Priority (1-5):</label>
        <input type="number" min={1} max={5} value={priority} onChange={(e) => setPriority(e.target.value)} required />

        <button type="submit">Create Task</button>
        {message && <p className="msg">{message}</p>}
      </form>
    </div>
  );
}
