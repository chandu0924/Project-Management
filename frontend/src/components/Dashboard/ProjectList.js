import React, { useEffect, useState, useContext } from "react";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";
import "./ProjectList.css";
import { ProjectDataContext } from "../../context/ProjectDataContext";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

const dummyProjects = [
  { id: 1, name: "Project Alpha", status: "Active" },
  { id: 2, name: "Project Beta", status: "Planning" },
  { id: 3, name: "Project Gamma", status: "Completed" },
  { id: 4, name: "Project Delta", status: "On Hold" },
  { id: 5, name: "Project Epsilon", status: "Active" },
  { id: 6, name: "Project Zeta", status: "Completed" },
  { id: 7, name: "Project Eta", status: "Planning" },
  { id: 8, name: "Project Theta", status: "In Review" },
  { id: 9, name: "Project Iota", status: "Active" },
  { id: 10, name: "Project Kappa", status: "Planning" },
];

// Dummy chart data
const taskStatusData = {
  labels: ["Active", "Planning", "Completed", "On Hold", "In Review"],
  datasets: [
    {
      label: "Task Status",
      data: [3, 3, 2, 1, 1],
      backgroundColor: ["#4ade80", "#facc15", "#60a5fa", "#f87171", "#a78bfa"],
      borderWidth: 3,
    },
  ],
};

const velocityData = {
  labels: ["Sprint 1", "Sprint 2", "Sprint 3", "Sprint 4"],
  datasets: [
    {
      label: "Story Points Completed",
      data: [20, 25, 18, 30],
      backgroundColor: "#60a5fa",
    },
  ],
};

const burndownData = {
  labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
  datasets: [
    {
      label: "Ideal",
      data: [50, 40, 30, 20, 10],
      borderColor: "#94a3b8",
      fill: false,
      borderDash: [5, 5],
    },
    {
      label: "Actual",
      data: [50, 42, 34, 25, 15],
      borderColor: "#f87171",
      fill: true,
    },
  ],
};

const ProjectList = () => {
  const projectDataContext = useContext(ProjectDataContext);
  const [projectsListData, setProjectsListData] = useState([]);


  return (
    <div className="projectlist-container">
      <div className="projectlist-section">
        <h2 className="projectlist-heading">Project List</h2>
        <ul className="projectlist-list">
          {projectDataContext.projects.map((project) => (
            <li key={project.id} className="projectlist-item">
              <strong>{project.name}</strong> — <em>{project.status}</em>
            </li>
          ))}
        </ul>
      </div>

      <div className="projectlist-section">
        <h2 className="projectlist-heading">Overview Charts</h2>
        <div className="projectlist-chart-grid">
          <div className="projectlist-chart">
            <h4>Task Status</h4>
            <Doughnut data={taskStatusData} />
          </div>
          <div className="projectlist-chart">
            <h4>Sprint Velocity</h4>
            <Bar data={velocityData} />
          </div>
          {/* <div className="projectlist-chart">
            <h4>Sprint Burn-down</h4>
            <Line data={burndownData} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
