import React, { useState } from "react";
import CreateProject from "./CreateProject";
import "./Dashboard.css";

import ProjectList from "./ProjectList";
import EpicList from "./EpicList";
import UserStoriesList from "./UserStoriesList";
import TaskList from "./TaskList";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Projects");

  const renderContent = () => {
    switch (activeTab) {
      case "Projects":
        return <ProjectList />;
      case "Epics":
        return <EpicList />;
      case "User Stories":
        return <UserStoriesList />;
      case "Tasks":
        return <TaskList />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        { activeTab === "Projects" && <button
          className="create-project-button"
          onClick={() => setShowModal(true)}
        >
          Create Project
        </button>}
      </div>

      <div className="tab-buttons-container">
        {["Projects", "Epics", "User Stories", "Tasks"].map((tab) => (
          <button
            key={tab}
            className={`tab-button-${tab} tab-button ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* <hr className="tab-separator" /> */}

      <div className="dashboard-content">
        {renderContent()}
      </div>  

      {showModal && <CreateProject onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Dashboard;
