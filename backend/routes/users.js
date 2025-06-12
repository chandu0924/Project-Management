const express = require("express");
const router = express.Router();
const userService = require("../services/userService");

// Register a new user
router.post("/register", userService.registerUser);

// Login
router.post("/login", userService.loginUser);

// Get all users
router.get("/", userService.getAllUsers);

// Get user by ID
router.get("/:id", userService.getUserById);

// Update user
router.put("/:id", userService.updateUser);

// Delete user
router.delete("/:id", userService.deleteUser);

module.exports = router;
