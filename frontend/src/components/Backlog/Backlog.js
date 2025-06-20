import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Backlog.css"; 

const dummyBacklog = [
  { id: "epic1", title: "Authentication" },
  { id: "epic2", title: "Chat System" },
];

export default function Backlog() {
  const { projectId } = useParams();
  const [epics, setEpics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEpics = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/epics/getAll`);
        setEpics(res.data);
      } catch (err) {
        console.error("Failed to fetch epics", err);
      }
    };
    fetchEpics();
  }, [projectId]);

  return (
    <div className="backlog-container">
      <div className="backlog-header">
        <h2>Epics</h2>
        <button onClick={() => navigate(`/project/${projectId}/epic/new`)}>Create Epic</button>
      </div>
      <div className="epic-list">
        {epics.map((epic) => (
          <div
            key={epic.id}
            className="epic-card"
            onClick={() => navigate(`/project/${projectId}/epic/${epic.id}`)}
          >
            <h3>{epic.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
