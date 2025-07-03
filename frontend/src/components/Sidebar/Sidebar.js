// src/components/Layout/Sidebar.jsx
import React, { useEffect,  useContext, useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight, faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";
import {DataContext} from '../../context/DataContext';

const Sidebar = () => {
  // const [projects, setProjects] = useState([]);
  const [isProjectsExpanded, setIsProjectsExpanded] = useState(true);
  const [expandedProjectId, setExpandedProjectId] = useState(null);
  const dataContext = useContext(DataContext);

  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     try {
  //       const res = await axios.get('http://localhost:5000/api/projects/getAll');
  //       setProjects(res.data);
  //     } catch (err) {
  //       console.error("Error fetching projects:", err);
  //     }
  //   };
  //   fetchProjects();
  // }, []);

  useEffect(() => {
    console.log("project context", dataContext)
    dataContext.fetchProjects();
    console.log("projects fetched", dataContext.projects)
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
        {/* <div className="collapsible-header" onClick={toggleProjects}> */}
        <div className="collapsible-header">
          {/* {isProjectsExpanded ? '▼' : '▶'}  Projects  */}
          Projects
        </div>

        {isProjectsExpanded &&
          dataContext.projects.map((project) => (
            <div key={project.id} className="nested-section">
              <div
                className="nested-header"
                onClick={() => toggleProjectMenu(project.id)}
              >
                {/* {expandedProjectId === project.id ? '\uf13a' : '\uf138'} {project.title}  */}
                {/* <FontAwesomeIcon icon={expandedProjectId === project.id ? "fa-chevron-circle-right" : "fa-chevron-circle-down"} /> */}
                <FontAwesomeIcon
                  icon={expandedProjectId === project.id ? faChevronCircleDown : faChevronCircleRight}
                  style={{ marginRight: "8px" }}
                  />
                  {project.title}

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
