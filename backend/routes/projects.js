import express from "express";
const router = express.Router();

import projectService from "../services/projectService.js";

// Get all projects
router.get("/getAll", projectService.getAllProjects);

// Get project by ID
router.get("/getById/:id", projectService.getProjectById);

// Create a new project
router.post("/create", projectService.createProject);

// Update project
router.put("/update/:id", projectService.updateProject);

// Delete project
router.delete("/delete/:id", projectService.deleteProject);

export default router;