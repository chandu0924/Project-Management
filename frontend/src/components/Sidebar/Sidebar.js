// src/components/Layout/Sidebar.jsx
import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">Dashboard</Link>
      <Link to="/projects">Projects</Link>
      <Link to="/backlog">Backlog</Link>
      <Link to="/sprints">Sprints</Link>
      <Link to="/tasklist">Tasks</Link>
    </div>
  );
};

export default Sidebar;
