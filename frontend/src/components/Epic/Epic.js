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
  const { epicId } = useParams();
  const navigate = useNavigate();
  const [epicData, setEpicData] = useState(null);

  useEffect(() => {
    setEpicData(dummyBacklog[epicId]);
  }, [epicId]);

  if (!epicData) return <p>Epic not found or loading...</p>;

  return (
    <div className="epic-details-container">
      <h2>Epic: {epicData.title}</h2>
      {epicData.userStories.map((story) => (
        <div key={story.id} className="story-card"
        onClick={() => navigate(`/epic/${epicId}/userstory/${story.id}/tasks`)}
>
          <h4>User Story: {story.title}</h4>
          <ul>
            {story.tasks.map((task) => (
              <li
                key={task.id}
                className="task-item"
                onClick={() =>
                  navigate(`/epic/${epicId}/userstory/${story.id}`)
                }
              >
                {task.title}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
