import express from "express";
const router = express.Router();
import pool from "../db/connection.js"; 

router.get("/", async (req, res) => {
  const query = req.query.q;
  if (!query || query.length < 2) {
    return res.status(400).json({ message: "Query too short" });
  }

  try {
    const searchTerm = `%${query}%`;

    const [projects, epics, stories, tasks, users] = await Promise.all([
      pool.query("SELECT id, name FROM clone.projects WHERE name ILIKE $1 LIMIT 5;", [searchTerm]),
      pool.query("SELECT id, title FROM clone.epics WHERE title ILIKE $1 LIMIT 5;", [searchTerm]),
      pool.query("SELECT id, title FROM clone.user_stories WHERE title ILIKE $1 LIMIT 5;", [searchTerm]),
      pool.query("SELECT id, title FROM clone.tasks WHERE title ILIKE $1 LIMIT 5;", [searchTerm]),
    //   pool.query("SELECT id, name FROM users WHERE name ILIKE $1 LIMIT 5", [searchTerm]),
    ]);

    res.json({
      projects: projects.rows || [],
      epics: epics.rows || [],
      stories: stories.rows || [],
      tasks: tasks.rows || [],
    //   users: users.rows || [],
    });
  } catch (err) {
    console.error("Search error:", err.message, err.stack);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
