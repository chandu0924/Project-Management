import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Epic.css";

const dummyBacklog = {
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
      {
        id: "us2",
        title: "Login",
        tasks: [
          { id: "t4", title: "Design login form" },
          { id: "t5", title: "Implement token auth" },
        ],
      },
    ],
  },
  epic2: {
    title: "Chat System",
    userStories: [
      {
        id: "us3",
        title: "Send/Receive messages",
        tasks: [
          { id: "t6", title: "Socket integration" },
          { id: "t7", title: "UI updates" },
        ],
      },
    ],
  },
};

export default function Epic() {
  const { epicId, projectId } = useParams();
  const navigate = useNavigate();
  const [epicData, setEpicData] = useState([]);

  useEffect(() => {
    const fetchUserStoryData = async () => {
      try {
        console.log("epicId", epicId)
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/userstories/getByEpicId/${epicId}`);
        setEpicData(res.data);
      } catch (err) {
        console.error("Failed to fetch user story data", err);
      }
    }
    fetchUserStoryData();
  }, [epicId]);

  return (
    <div className="epic-details-container">
      <div className="epic-header">
        <h2> User Stories</h2>
        <button onClick={() => navigate(`/project/${projectId}/epic/${epicId}/userstory/new`)}>Create User Story</button>
      </div>
      {epicData && epicData.map((story) => (
        <div
          key={story.id}
          className="story-card"
          onClick={() =>
            navigate(`/project/${projectId}/epic/${epicId}/userstory/${story.id}`)
          }
        >
          <h4>User Story: {story.title}</h4>
        </div>
      ))}
    </div>

  );
}
