const epicQueries = {
    getAllEpics: "SELECT * FROM clone.epics",
    getEpicById: "SELECT * FROM clone.epics WHERE id = $1",
    createEpic: `
      INSERT INTO clone.epics (title , description, project_id)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
    updateEpic: `
      UPDATE clone.epics
      SET name = $1, description = $2
      WHERE id = $3
      RETURNING *
    `,
    deleteEpic: "DELETE FROM clone.epics WHERE id = $1",
    getEpicByProjectId: "SELECT * FROM clone.epics WHERE project_id = $1;"
}

export default epicQueries