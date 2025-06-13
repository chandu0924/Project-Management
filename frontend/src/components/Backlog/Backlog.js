import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Backlog.css"; 

const dummyBacklog = [
  { id: "epic1", title: "Authentication" },
  { id: "epic2", title: "Chat System" },
];

export default function Backlog() {
  const { id: projectId } = useParams();
  const [epics, setEpics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setEpics(dummyBacklog);
  }, [projectId]);

  return (
    <div className="backlog-container">
      <div className="backlog-header">
        <h2>Epics</h2>
        <button onClick={() => navigate(`/projects/${projectId}/backlog/epic/new`)}>Create Epic</button>
      </div>
      <div className="epic-list">
        {epics.map((epic) => (
          <div
            key={epic.id}
            className="epic-card"
            onClick={() => navigate(`/projects/${projectId}/backlog/epic/${epic.id}`)}
          >
            <h3>{epic.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
