import { useParams } from "react-router-dom";

const Task = () => {
  const { projectId, epicId, storyId, taskId } = useParams();

  return (
    <div>
      <h2>Task Detail</h2>
      <p>Project: {projectId}</p>
      <p>Epic: {epicId}</p>
      <p>User Story: {storyId}</p>
      <p>Task: {taskId}</p>
    </div>
  );
};

export default Task;
