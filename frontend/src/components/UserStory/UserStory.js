import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

const UserStory = () => {
  const { epicId, storyId } = useParams();
  const navigate = useNavigate();
  const [userStoryData, setUserStoryData] = useState(null);

  useEffect(() => {
    const epic = dummyData[epicId];
    if (epic) {
      const story = epic.userStories.find((story) => story.id === storyId);
      setUserStoryData(story);
    }
  }, [epicId, storyId]);

  if (!userStoryData) return <p>Loading...</p>;

  return (
    <div className="user-story-container">
      <h2>User Story: {userStoryData.title}</h2>
      <ul>
        {userStoryData.tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserStory;
