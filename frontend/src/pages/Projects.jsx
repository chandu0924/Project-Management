import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("/projects").then((res) => setProjects(res.data));
  }, []);

  return (
    <div>
      <h1>All Projects</h1>
      <ul>
        {projects.map((proj) => (
          <li key={proj.id}>
            <Link to={`/projects/${proj.id}`}>{proj.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
