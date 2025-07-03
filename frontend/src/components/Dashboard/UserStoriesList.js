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
import { DataContext } from "../../context/DataContext";

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
  { id: 1, title: "Project Alpha", status: "Active" },
  { id: 2, title: "Project Beta", status: "Planning" },
  { id: 3, title: "Project Gamma", status: "Completed" },
  { id: 4, title: "Project Delta", status: "On Hold" },
  { id: 5, title: "Project Epsilon", status: "Active" },
  { id: 6, title: "Project Zeta", status: "Completed" },
  { id: 7, title: "Project Eta", status: "Planning" },
  { id: 8, title: "Project Theta", status: "In Review" },
  { id: 9, title: "Project Iota", status: "Active" },
  { id: 10, title: "Project Kappa", status: "Planning" },
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

const UserStoryList = () => {
  const dataContext = useContext(DataContext);
  const [projectsListData, setProjectsListData] = useState([]);

  useEffect(() => {
    dataContext.fetchStories();
  }, [dataContext.stories]);

  return (
    <div className="list-container">
      <div className="list-section">
        <h2 className="list-heading">UserStory List</h2>
        <ul className="list-list">
          {dataContext.stories.map((story) => (
            <li key={story.id} className="list-item">
              <strong>{story.title}</strong> — <em>{story.status}</em>
            </li>
          ))}
        </ul>
      </div>

      <div className="list-section">
        <h2 className="list-heading">Overview Charts</h2>
        <div className="list-chart-grid">
          <div className="list-chart">
            <h4>Task Status</h4>
            <Doughnut data={taskStatusData} />
          </div>
          <div className="list-chart">
            <h4>Sprint Velocity</h4>
            <Bar data={velocityData} />
          </div>
          {/* <div className="list-chart">
            <h4>Sprint Burn-down</h4>
            <Line data={burndownData} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default UserStoryList;
