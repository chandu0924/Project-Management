const express = require("express");
const router = express.Router();

// Import all route modules
const userRoutes = require("./users");
const projectRoutes = require("./projects");
const epicRoutes = require("./epics");
const userStoryRoutes = require("./userStories");
const taskRoutes = require("./tasks");
const sprintRoutes = require("./sprints");
const sprintTaskRoutes = require("./sprintTasks");
const projectMemberRoutes = require("./projectMembers");

// Mount routes
router.use("/users", userRoutes);
router.use("/projects", projectRoutes);
router.use("/epics", epicRoutes);
router.use("/userstories", userStoryRoutes);
router.use("/tasks", taskRoutes);
router.use("/sprints", sprintRoutes);
router.use("/sprint-tasks", sprintTaskRoutes);
router.use("/project-members", projectMemberRoutes);

module.exports = router;
