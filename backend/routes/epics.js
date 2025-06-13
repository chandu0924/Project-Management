import express from "express";
const router = express.Router();

import epicService from "../services/epicService.js";

// Get all epics
router.get("/getAll", epicService.getAllEpics);

// Get epic by ID
router.get("/getById/:id", epicService.getEpicById);

// Create a new epic
router.post("/create", epicService.createEpic);

// Update epic
router.put("/update/:id", epicService.updateEpic);

// Delete epic
router.delete("/delete/:id", epicService.deleteEpic);

export default router;