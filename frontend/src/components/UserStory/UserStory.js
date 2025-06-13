import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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
    <div>
      <h2>User Story: {userStoryData.title}</h2>
      <ul>
        {userStoryData.tasks.map((task) => (
          <li
            key={task.id}
            onClick={() =>
              navigate(
                `/projects/${projectId}/backlog/epic/${epicId}/userstory/${storyId}/task/${task.id}`
              )
            }
            style={{ cursor: "pointer", color: "blue" }}
          >
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserStory;
