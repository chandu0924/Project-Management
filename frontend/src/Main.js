// src/App.js
import React from 'react';
// import "./App.css";
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';

import Dashboard from './components/Dashboard/Dashboard';
import Projects from './components/Project/Project';
import Backlog from './components/Backlog/Backlog';
import Sprints from './components/Sprint/SprintBoard';
import Task from "./components/Task/Tasks";

import Epic from './components/Epic/Epic';
import UserStory from './components/UserStory/UserStory';

function Main() {
  return (
    <div className="main">
      <Navbar />
      <Sidebar />
      <div className="main-content" style={{ marginLeft: '200px', paddingTop: '60px', paddingBottom: '40px', padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/projects" element={<Projects />} />
          <Route path="/backlog" element={<Backlog />} />
          <Route path="/sprints" element={<Sprints />} />

          <Route path="/projects/:projectId/backlog" element={<Backlog />} />
          <Route path="/projects/:projectId/backlog/epic/:epicId" element={<Epic />} />
          <Route
            path="/projects/:projectId/backlog/epic/:epicId/userstory/:storyId"
            element={<UserStory />}
          />
          <Route
            path="/projects/:projectId/backlog/epic/:epicId/userstory/:storyId/task/:taskId"
            element={<Task />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default Main;
