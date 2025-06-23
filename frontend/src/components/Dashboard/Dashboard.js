import React, { useState } from 'react';
import CreateProject from './CreateProject';
import './Dashboard.css';

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <button className="create-project-button" onClick={() => setShowModal(true)}>Create Project</button>
      </div>

      {showModal && (
        <CreateProject onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default Dashboard;
