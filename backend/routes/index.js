import express from "express";
const router = express.Router();

// Import all route modules
import userRoutes from "./users.js";
import projectRoutes from "./projects.js";
import epicRoutes from "./epics.js";
import userStoryRoutes from "./userStories.js";
import taskRoutes from "./tasks.js";
import searchRoutes from "./search.js";
// import sprintRoutes from "./sprints.js";
// import sprintTaskRoutes from "./sprint-tasks.js";
// import projectMemberRoutes from "./project-members.js";

// Mount routes
router.use("/users", userRoutes);
router.use("/projects", projectRoutes);
router.use("/epics", epicRoutes);
router.use("/userstories", userStoryRoutes);
router.use("/tasks", taskRoutes);
router.use("/search", searchRoutes);
// router.use("/sprints", sprintRoutes);
// router.use("/sprint-tasks", sprintTaskRoutes);
// router.use("/project-members", projectMemberRoutes);

export default router;