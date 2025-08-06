import React, { useEffect, useContext } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./ProjectList.css";
import { DataContext } from "../../context/DataContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

// Chart 1: Tasks per User Story
const tasksPerStoryData = {
  labels: ["Story A", "Story B", "Story C"],
  datasets: [
    {
      label: "Tasks",
      data: [5, 3, 7],
      backgroundColor: "#60a5fa",
      borderRadius: 6,
    },
  ],
};

// Chart 2: Story Completion %
const storyCompletionData = {
  labels: ["Story A", "Story B", "Story C"],
  datasets: [
    {
      label: "% Completed",
      data: [80, 50, 100],
      backgroundColor: "#34d399",
      borderRadius: 4,
    },
  ],
};

// Chart 3: Priority Distribution
const priorityDistributionData = {
  labels: ["High", "Medium", "Low"],
  datasets: [
    {
      label: "Priority",
      data: [4, 6, 3],
      backgroundColor: ["#f87171", "#facc15", "#60a5fa"],
      borderWidth: 2,
    },
  ],
};

const UserStoryList = () => {
  const dataContext = useContext(DataContext);

  useEffect(() => {
    dataContext.fetchStories();
  }, [dataContext]);

  return (
    <div className="list-container">
      <div className="list-section">
        <h2 className="list-heading">User Story List</h2>
        <div className="story-card-grid">
          {dataContext.stories.map((story) => (
            <div key={story.id} className="story-card">
              <h3>{story.title}</h3>
              <p>Status: <span className={`status-badge ${story.status.toLowerCase()}`}>{story.status}</span></p>
            </div>
          ))}
        </div>
      </div>

      <div className="list-section">
        <h2 className="list-heading">Story Insights</h2>
        <div className="list-chart-grid">
          {/* Chart 1 */}
          <div className="list-chart">
            <h4>Tasks per Story</h4>
            <Bar data={tasksPerStoryData} />
          </div>

          {/* Chart 2 */}
          <div className="list-chart">
            <h4>Story Completion %</h4>
            <Bar
              data={storyCompletionData}
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

          {/* Chart 3 */}
          <div className="list-chart">
            <h4>Priority Distribution</h4>
            <Doughnut data={priorityDistributionData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStoryList;
