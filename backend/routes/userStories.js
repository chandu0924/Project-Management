import express from "express";
const router = express.Router();

import userStoryService from "../services/userStoryService.js";

// Get all user stories
router.get("/getAll", userStoryService.getAllUserStories);

// Get user story by ID
router.get("/getById/:id", userStoryService.getUserStoryById);

// Get user story by epic ID
router.get("/getByEpicId/:id", userStoryService.getUserStoryByEpicId);

// Create a new user story
router.post("/create", userStoryService.createUserStory);    

// Update user story
router.put("/update/:id", userStoryService.updateUserStory);

// Delete user story
router.delete("/delete/:id", userStoryService.deleteUserStory);

export default router;