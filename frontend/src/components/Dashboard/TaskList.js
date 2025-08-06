import React, { useEffect, useContext } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import "./ProjectList.css";
import { DataContext } from "../../context/DataContext";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

// Chart 1: Task Status Breakdown
const taskStatusData = {
  labels: ["To Do", "In Progress", "Review", "Done"],
  datasets: [
    {
      label: "Task Status",
      data: [6, 4, 2, 8],
      backgroundColor: ["#facc15", "#60a5fa", "#a78bfa", "#4ade80"],
    },
  ],
};

// Chart 2: Tasks Assigned per User
const tasksPerUserData = {
  labels: ["Alice", "Bob", "Carol", "David"],
  datasets: [
    {
      label: "Tasks Assigned",
      data: [5, 7, 3, 4],
      backgroundColor: "#60a5fa",
      borderRadius: 6,
    },
  ],
};

// Chart 3: Tasks by Priority
const taskPriorityData = {
  labels: ["High", "Medium", "Low"],
  datasets: [
    {
      data: [5, 8, 3],
      backgroundColor: ["#f87171", "#facc15", "#60a5fa"],
    },
  ],
};

// Chart 4: Overdue Tasks per User
const overdueTasksData = {
  labels: ["Alice", "Bob", "Carol"],
  datasets: [
    {
      label: "Overdue Tasks",
      data: [2, 1, 3],
      backgroundColor: "#f87171",
    },
  ],
};

// Chart 5: Average Task Age
const taskAgeData = {
  labels: ["To Do", "In Progress", "Review", "Done"],
  datasets: [
    {
      label: "Avg. Age (days)",
      data: [5, 3, 4, 2],
      backgroundColor: "#a78bfa",
    },
  ],
};

const TaskList = () => {
  const dataContext = useContext(DataContext);

  useEffect(() => {
    dataContext.fetchTasks();
  }, [dataContext]);

  return (
    <div className="list-container">
      <div className="list-section">
        <h2 className="list-heading">Task List</h2>
        <div className="task-card-grid">
          {dataContext.tasks.map((task) => (
            <div key={task.id} className="task-card">
              <h3>{task.title}</h3>
              <p>Status: <span className={`status-badge ${task.status.toLowerCase()}`}>{task.status}</span></p>
            </div>
          ))}
        </div>
      </div>

      <div className="list-section">
        <h2 className="list-heading">Task Insights</h2>
        <div className="list-chart-grid">
          {/* Chart 1 */}
          <div className="list-chart">
            <h4>Task Status Breakdown</h4>
            <Doughnut data={taskStatusData} />
          </div>

          {/* Chart 2 */}
          <div className="list-chart">
            <h4>Tasks Assigned per User</h4>
            <Bar data={tasksPerUserData} />
          </div>

          {/* Chart 3 */}
          <div className="list-chart">
            <h4>Task Priority Distribution</h4>
            <Doughnut data={taskPriorityData} />
          </div>

          {/* Chart 4 */}
          <div className="list-chart">
            <h4>Overdue Tasks per User</h4>
            <Bar data={overdueTasksData} />
          </div>

          {/* Chart 5 */}
          <div className="list-chart">
            <h4>Average Task Age</h4>
            <Bar data={taskAgeData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
