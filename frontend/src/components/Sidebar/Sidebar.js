// src/components/Layout/Sidebar.jsx
import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
  const [projects, setProjects] = useState([]);
  const [isProjectsExpanded, setIsProjectsExpanded] = useState(false);
  const [expandedProjectId, setExpandedProjectId] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/projects/getAll');
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };
    fetchProjects();
  }, []);

  const toggleProjects = () => {
    setIsProjectsExpanded((prev) => !prev);
    setExpandedProjectId(null); 
  };

  const toggleProjectMenu = (projectId) => {
    setExpandedProjectId((prev) => (prev === projectId ? null : projectId));
  };

  return (
    <div className="sidebar">
      <Link to="/">Dashboard</Link>

      <div className="collapsible-section">
        <div className="collapsible-header" onClick={toggleProjects}>
          {isProjectsExpanded ? '▼' : '▶'}  Projects 
        </div>

        {isProjectsExpanded &&
          projects.map((project) => (
            <div key={project.id} className="nested-section">
              <div
                className="nested-header"
                onClick={() => toggleProjectMenu(project.id)}
              >
                {expandedProjectId === project.id ? '▼' : '▶'} {project.name} 
              </div>

              {expandedProjectId === project.id && (
                <div className="sub-links">
                  <Link to={`/projects/${project.id}`}>Backlog</Link>
                  <Link to={`/projects/${project.id}/sprints`}>Sprints</Link>
                  <Link to={`/projects/${project.id}/tasks`}>Tasks</Link>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
