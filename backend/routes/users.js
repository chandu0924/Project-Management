import express from "express";
const router = express.Router();

import userService from "../services/userService.js";

// Register a new user
router.post("/register", userService.registerUser);

// Login
router.post("/login", userService.loginUser);

// Get all users
router.get("/getAll", userService.getAllUsers);

// Get user by ID
router.get("/getById/:id", userService.getUserById);

// Update user
router.put("/update/:id", userService.updateUser);

// Delete user
router.delete("/delete/:id", userService.deleteUser);

export default router;