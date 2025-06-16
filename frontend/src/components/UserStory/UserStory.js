import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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
  const { epicId, storyId, projectId } = useParams();
  const navigate = useNavigate();
  const [userStoryData, setUserStoryData] = useState(null);

  useEffect(() => {
    const epic = dummyData[epicId];
    if (epic) {
      const story = epic.userStories.find((s) => s.id === storyId);
      setUserStoryData(story);
    }
  }, [epicId, storyId]);

  if (!userStoryData) return <p>Loading... Content Not Found</p>;

  return (
    <div className="user-story-container">
      <div className="user-story-header">
        <h2 className="user-story-header">{userStoryData.title}</h2>
        <button onClick={() => navigate(`/projects/${projectId}/backlog/epic/${epicId}/userstory/${storyId}/task/new`)}>Create Task</button>
      </div>
      <ul>
        {userStoryData.tasks.map((task) => (
          <div
            key={task.id}
            className="task-card"
            onClick={() =>
              navigate(
                `/projects/${projectId}/backlog/epic/${epicId}/userstory/${storyId}/task/${task.id}`
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
