import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./UserStory.css";

const dummyData = {
  epic1: {
    title: "Authentication",
    userStories: [
      {
        id: "us1",
        title: "Sign Up",
        tasks: [
          { id: "t1", title: "Build signup UI" },
          { id: "t2", title: "Validate email" },
          { id: "t3", title: "Connect to API" },
        ],
      },
    ],
  },
};

const UserStory = () => {
  const { epicId,storyId, projectId } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchUserStoryData = async () => {
      try {
        let storyIdCopy = storyId;
        storyIdCopy = parseInt(storyIdCopy);
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/tasks/getByStoryId/${storyIdCopy}`
        );
        setTasks(res.data);
      } catch (err) {
        console.error("Failed to fetch user story data", err);
      }
    };
    fetchUserStoryData();
  }, [storyId]);

  return (
    <div className="user-story-container">
      <div className="user-story-header">
        <h2 className="user-story-header">Tasks</h2>
        <button onClick={() => navigate(`/projects/${projectId}/epic/${epicId}/userstory/${storyId}/task/new`)}>Create Task</button>
      </div>
      <ul>
        {tasks && tasks.map((task) => (
          <div
            key={task.id}
            className="task-card"
            onClick={() =>
              navigate(
                `/projects/${projectId}/epic/${epicId}/userstory/${storyId}/task/${task.id}`
              )
            }
          >
            <h4>{task.title} </h4>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default UserStory;
