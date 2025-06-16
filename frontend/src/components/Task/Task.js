import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Task.css";

// {
//   "id": "task1",
//   "user_story_id": "us1",
//   "user_story_title": "User Story 1",
//   "epic_id": "epic1",
//   "epic_title": "Epic 1",
//   "created_at": "2022-01-01",
//   "title": "Task 1",
//   "description": "This is a sample task",
//   "assigned_to": "user1",
//   "priority": 1,
//   "status": "To Do"
// }

export default function TaskDetail() {
  const { taskId } = useParams();
  const [task, setTask] = useState({
  "id": "task1",
  "user_story_id": "us1",
  "user_story_title": "User Story 1",
  "epic_id": "epic1",
  "epic_title": "Epic 1",
  "created_at": "2022-01-01",
  "title": "Task 1",
  "description": "This is a sample task",
  "assigned_to": "user1",
  "priority": 1,
  "status": "To Do"
});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/${taskId}`)
      .then((res) => {
        setTask(res.data); // res.data should be shaped like dummyData
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching task", err);
        setLoading(false);
      });
  }, [taskId]);

  if (loading) return <p className="task-loading">Loading task...</p>;
  if (!task) return <p className="task-loading">Task not found.</p>;

  return (
    <div className="task-detail-container">
      <h1 className="task-title">{task.title}</h1>
      <p className="task-description">{task.description || "No description provided."}</p>

      <div className="task-meta">
        <p><strong>Epic:</strong> {task.epic_title || "N/A"}</p>
        <p><strong>User Story:</strong> {task.user_story_title || "N/A"}</p>
        <p><strong>Assigned to:</strong> {task.assigned_to || "Unassigned"}</p>
        <p><strong>Priority:</strong> {task.priority}</p>
        <p><strong>Status:</strong> {task.status}</p>
        <p><strong>Created At:</strong> {task.created_at}</p>
      </div>

      <div className="task-id-note">
        <code>Task ID: {task.id}</code>
      </div>
    </div>
  );
}

