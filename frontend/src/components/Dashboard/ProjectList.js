import React, { useEffect, useContext } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import "./ProjectList.css";
import { DataContext } from "../../context/DataContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

// Chart 1: Epics per Project
const epicsPerProjectData = {
  labels: ["Project A", "Project B", "Project C"],
  datasets: [
    {
      label: "Epics",
      data: [5, 8, 3],
      backgroundColor: "#60a5fa",
      borderRadius: 6,
    },
  ],
};

// Chart 2: Contributors per Project
const contributorsData = {
  labels: ["Project A", "Project B", "Project C"],
  datasets: [
    {
      label: "Contributors",
      data: [3, 4, 2],
      backgroundColor: "#facc15",
      borderRadius: 6,
    },
  ],
};

// Chart 3: Project Completion %
const projectCompletionData = {
  labels: ["Project A", "Project B", "Project C"],
  datasets: [
    {
      label: "Completion %",
      data: [70, 45, 90],
      backgroundColor: ["#4ade80", "#60a5fa", "#f87171"],
    },
  ],
};

// Chart 4: Project Creation Trend
const creationTrendData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Projects Created",
      data: [2, 5, 4, 7, 3],
      fill: false,
      borderColor: "#a78bfa",
      tension: 0.3,
    },
  ],
};

const ProjectList = () => {
  const dataContext = useContext(DataContext);

  useEffect(() => {
    dataContext.fetchProjects();
  }, []);

  return (
    <div className="list-container">
      <div className="list-section">
        <h2 className="list-heading">Project List</h2>
        <ul className="list-list">
          {dataContext.projects.map((project) => (
            <li key={project.id} className="list-item">
              <strong>{project.title}</strong> — <em>{project.status}</em>
            </li>
          ))}
        </ul>
      </div>

      <div className="list-section">
        <h2 className="list-heading">Project Analytics</h2>
        <div className="list-chart-grid">
          {/* Chart 1: Epics per Project */}
          <div className="list-chart">
            <h4>Epics per Project</h4>
            <Bar data={epicsPerProjectData} />
          </div>

          {/* Chart 2: Contributors per Project */}
          <div className="list-chart">
            <h4>Contributors per Project</h4>
            <Bar
              data={contributorsData}
              options={{ indexAxis: "y" }}
            />
          </div>

          {/* Chart 3: Project Completion Percentage */}
          <div className="list-chart">
            <h4>Project Completion %</h4>
            <Doughnut data={projectCompletionData} />
          </div>

          {/* Chart 4: Project Creation Trend */}
          <div className="list-chart">
            <h4>Project Creation Trend</h4>
            <Line data={creationTrendData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
