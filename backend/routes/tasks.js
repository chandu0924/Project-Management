import express from "express";
const router = express.Router();

import taskService from "../services/taskService.js";

// Get all tasks
router.get("/getAll", taskService.getAllTasks);

// Get task by ID
router.get("/getById/:id", taskService.getTaskById);

// Create a new task
router.post("/create", taskService.createTask);

// Get tasks by user story ID
router.get("/getByStoryId/:id", taskService.getTaskByStoryId);

// Update task
router.put("/update/:id", taskService.updateTask);

// Delete task
router.delete("/delete/:id", taskService.deleteTask);

export default router;