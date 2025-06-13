const epicQueries = {
    getAllEpics: "SELECT * FROM clone.epics",
    getEpicById: "SELECT * FROM clone.epics WHERE id = $1",
    createEpic: `
      INSERT INTO clone.epics (name, description)
      VALUES ($1, $2)
      RETURNING *
    `,
    updateEpic: `
      UPDATE clone.epics
      SET name = $1, description = $2
      WHERE id = $3
      RETURNING *
    `,
    deleteEpic: "DELETE FROM clone.epics WHERE id = $1",
}

export default epicQueries