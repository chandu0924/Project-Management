import React, { useEffect, useContext } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./ProjectList.css";
import { DataContext } from "../../context/DataContext";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// Chart 1: Stories per Epic
const storiesPerEpicData = {
  labels: ["Epic A", "Epic B", "Epic C"],
  datasets: [
    {
      label: "Number of Stories",
      data: [6, 4, 8],
      backgroundColor: "#60a5fa",
      borderRadius: 6,
    },
  ],
};

// Chart 2: Epic Size (Stacked Story Status)
const epicSizeData = {
  labels: ["Epic A", "Epic B", "Epic C"],
  datasets: [
    {
      label: "To Do",
      data: [2, 1, 3],
      backgroundColor: "#facc15",
    },
    {
      label: "In Progress",
      data: [2, 2, 2],
      backgroundColor: "#60a5fa",
    },
    {
      label: "Done",
      data: [2, 1, 3],
      backgroundColor: "#4ade80",
    },
  ],
};

// Chart 3: Epic Progress %
const epicProgressData = {
  labels: ["Epic A", "Epic B", "Epic C"],
  datasets: [
    {
      label: "% Completed",
      data: [60, 50, 80],
      backgroundColor: "#34d399",
      borderRadius: 4,
    },
  ],
};

const EpicList = () => {
  const dataContext = useContext(DataContext);

  useEffect(() => {
    dataContext.fetchEpics();
  }, [dataContext]);

  return (
    <div className="list-container">
      <div className="list-section">
        <h2 className="list-heading">Epic List</h2>
        <div className="epic-card-grid">
          {dataContext.epics.map((epic) => (
            <div key={epic.id} className="epic-card">
              <h3>{epic.title}</h3>
              <p>Status: <span className={`status-badge ${epic.status.toLowerCase()}`}>{epic.status}</span></p>
        
            </div>
          ))}
        </div>
      </div>

      <div className="list-section">
        <h2 className="list-heading">Epic Insights</h2>
        <div className="list-chart-grid">
          {/* Chart 1: Stories per Epic */}
          <div className="list-chart">
            <h4>Stories per Epic</h4>
            <Bar data={storiesPerEpicData} />
          </div>

          {/* Chart 2: Epic Size by Story Status */}
          <div className="list-chart">
            <h4>Epic Size Breakdown</h4>
            <Bar
              data={epicSizeData}
              options={{
                responsive: true,
                plugins: { legend: { position: "top" } },
                scales: {
                  x: { stacked: true },
                  y: { stacked: true },
                },
              }}
            />
          </div>

          {/* Chart 3: Epic Progress % */}
          <div className="list-chart">
            <h4>Epic Progress %</h4>
            <Bar
              data={epicProgressData}
              options={{
                indexAxis: "y",
                scales: {
                  x: {
                    max: 100,
                    ticks: {
                      callback: (val) => `${val}%`,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpicList;
