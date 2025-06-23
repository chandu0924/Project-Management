import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/projects/getAll`);
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider value={{ projects, setProjects, fetchProjects }}>
      {children}
    </ProjectContext.Provider>
  );
};
