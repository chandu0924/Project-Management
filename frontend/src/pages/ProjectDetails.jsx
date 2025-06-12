import { useParams } from "react-router-dom";
import Backlog from "../components/Backlog/Backlog";
import SprintBoard from "../components/Sprint/SprintBoard";

export default function ProjectDetails() {
  const { projectId } = useParams();

  return (
    <div>
      <h2>Project #{projectId}</h2>
      <Backlog projectId={projectId} />
      <SprintBoard projectId={projectId} />
    </div>
  );
}
