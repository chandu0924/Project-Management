import { useParams } from "react-router-dom";

const Tasks = () => {
  const { epicId, storyId } = useParams();

  return (
    <div>
      <h2>Tasks for Story {storyId} in Epic {epicId}</h2>
      {/* Load tasks here using useEffect if needed */}
    </div>
  );
};

export default Tasks;
