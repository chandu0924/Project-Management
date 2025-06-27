import "./ProjectList.css";

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

const ProjectList = () => {
  return (
    <div className="projectlist-container" >
      {/* <h1 className="heading">Project Dashboard</h1> */}

      {/* Project List */}
      <div className="projectlist-section">
        <h2 className="projectlist-heading">Project List</h2>
        <ul className="projectlist-list">
          {dummyProjects.map((project) => (
            <li key={project.id} className="projectlist-item">
              <strong>{project.name}</strong> — <em>{project.status}</em>
            </li>
          ))}
        </ul>
      </div>

      {/* Chart Placeholders */}
      <div className="projectlist-section">
        <h2 className="projectlist-heading">Overview Charts</h2>
        <div className="projectlist-chart-grid">
          <div className="projectlist-chart">Velocity Chart</div>
          <div className="projectlist-chart">Task Status Chart</div>
          <div className="projectlist-chart">Sprint Burn-down</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
