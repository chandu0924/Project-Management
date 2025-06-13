const projectQueries = {
    getAllProjects: "SELECT * FROM clone.projects",

    getProjectById: "SELECT * FROM clone.projects WHERE id = $1",

    createProject: `
      INSERT INTO clone.projects (name, description)
      VALUES ($1, $2)
      RETURNING *
    `,

    updateProject: `
      UPDATE clone.projects
      SET name = $1, description = $2
      WHERE id = $3
      RETURNING *
    `,

    deleteProject: "DELETE FROM clone.projects WHERE id = $1",
};


export default projectQueries;