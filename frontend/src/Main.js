// src/App.js
import React from 'react';
import "./App.css";
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';

import Dashboard from './components/Dashboard/Dashboard';
import Projects from './components/Project/Project';
import Backlog from './components/Backlog/Backlog';
import Sprints from './components/Sprint/SprintBoard';
import TaskCreation from "./components/UserStory/TaskCreation";

import Epic from './components/Epic/Epic';
import UserStory from './components/UserStory/UserStory';
import EpicCreation from './components/Backlog/EpicCreation';
import UserStoryCreation from './components/Epic/UserStoryCreation';
import TaskList from './components/Task/TaskList';
import Task from './components/Task/Task';
import BacklogDashboard from './components/Backlog/BacklogDashboard';
import PrevNextContainer from './components/Navigation/PrevNextContainer';

function Main() {
  return (
    <div className="main">
      <Navbar />
      <div className='mainjs-container'>
        <Sidebar />
        <div className="main-content-container">
          <PrevNextContainer />
          <div className="main-content" >
            <Routes>
              <Route path="/" element={<Dashboard />} />

              <Route path="/projects" element={<Projects />} />
              <Route path="/backlog" element={<Backlog />} />
              <Route path="/sprints" element={<Sprints />} />
              <Route path="/projects/:projectId/tasks" element={<TaskList />} />

              <Route path="/backlog" element={<Backlog />} />
              <Route path="/projects/:projectId/epic/:epicId" element={<Epic />} />
              <Route path="/projects/:projectId/epic/new" element={<EpicCreation />} />
              
              <Route path="/projects/:projectId" element={<BacklogDashboard />} />
              
              <Route
                path="/projects/:projectId/epic/:epicId/userstory/:storyId"
                element={<UserStory />}
              />
              <Route 
                path="/projects/:projectId/epic/:epicId/userstory/new"
                element={<UserStoryCreation />}
              />
              <Route
                path="/projects/:projectId/epic/:epicId/userstory/:storyId/task/:taskId"
                element={<Task />}
              />
              <Route
                path="/projects/:projectId/epic/:epicId/userstory/:storyId/task/new"
                element={<TaskCreation />}
              />
            </Routes>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Main;
