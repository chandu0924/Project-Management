import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

export const ProjectDataContext = createContext();

const ProjectDataProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [epics, setEpics] = useState([]);
  const [stories, setStories] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  // PROJECTS
  const fetchProjects = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/projects/getAll`);
    console.log("projects data", res.data)
    setProjects(res.data);
  };

  // EPICS
  const fetchEpics = async (projectId) => {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/epics/byproject/${projectId}`);
    setEpics(res.data);
  };

  const addEpic = (epic) => setEpics(prev => [...prev, epic]);
  const updateEpic = (updated) => setEpics(prev => prev.map(e => e.id === updated.id ? updated : e));
  const deleteEpic = (id) => setEpics(prev => prev.filter(e => e.id !== id));

  // STORIES
  const fetchStories = async (epicId) => {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/stories/byepic/${epicId}`);
    setStories(res.data);
  };

  const addStory = (story) => setStories(prev => [...prev, story]);
  const updateStory = (updated) => setStories(prev => prev.map(s => s.id === updated.id ? updated : s));
  const deleteStory = (id) => setStories(prev => prev.filter(s => s.id !== id));

  // TASKS
  const fetchTasks = async (storyId) => {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/bystory/${storyId}`);
    setTasks(res.data);
  };

  const addTask = (task) => setTasks(prev => [...prev, task]);
  const updateTask = (updated) => setTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
  const deleteTask = (id) => setTasks(prev => prev.filter(t => t.id !== id));

  // USERS (optional)
  const fetchUsers = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users`);
    setUsers(res.data);
  };

  return (
    <ProjectDataContext.Provider
      value={{
        // Projects
        projects,
        fetchProjects,

        // Epics
        epics,
        fetchEpics,
        addEpic,
        updateEpic,
        deleteEpic,

        // Stories
        stories,
        fetchStories,
        addStory,
        updateStory,
        deleteStory,

        // Tasks
        tasks,
        fetchTasks,
        addTask,
        updateTask,
        deleteTask,

        // Users
        users,
        fetchUsers
      }}
    >
      {children}
    </ProjectDataContext.Provider>
  );
};

export default ProjectDataProvider;