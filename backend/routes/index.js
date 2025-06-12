const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET /api/projects
router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM projects");
  res.json(result.rows);
});

// GET /api/projects/:id/backlog
router.get("/:id/backlog", async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(`
    SELECT * FROM backlog_items
    WHERE project_id = $1 AND parent_id IS NULL AND type = 'epic'
  `, [id]);

  const epics = await Promise.all(result.rows.map(async (epic) => {
    const stories = await pool.query(`
      SELECT * FROM backlog_items
      WHERE parent_id = $1 AND type = 'story'
    `, [epic.id]);

    const enrichedStories = await Promise.all(stories.rows.map(async (story) => {
      const tasks = await pool.query(`
        SELECT * FROM backlog_items
        WHERE parent_id = $1 AND type = 'task'
      `, [story.id]);

      return { ...story, tasks: tasks.rows };
    }));

    return { ...epic, userStories: enrichedStories };
  }));

  res.json(epics);
});

module.exports = router;
