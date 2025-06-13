import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
  const { projectId, epicId } = useParams();
  const navigate = useNavigate();
  const [epicData, setEpicData] = useState(null);

  useEffect(() => {
    setEpicData(dummyBacklog[epicId]);
  }, [epicId]);

  if (!epicData) return <p>Epic not found or loading...</p>;

  return (
    <div className="epic-details-container">
      <div className="epic-header">
        <h2>{epicData.title}</h2>
        <button onClick={() => navigate(`/projects/${projectId}/backlog/epic/${epicId}/userstory/new`)}>Create User Story</button>
      </div>
      {epicData.userStories.map((story) => (
        <div
          key={story.id}
          className="story-card"
          onClick={() =>
            navigate(`/projects/${projectId}/backlog/epic/${epicId}/userstory/${story.id}`)
          }
        >
          <h4>User Story: {story.title}</h4>
        </div>
      ))}
    </div>

  );
}
