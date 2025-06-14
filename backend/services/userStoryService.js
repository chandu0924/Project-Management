import userStoryQueries from "../queries/userStoryQueries.js";
import pool from "../db/connection.js";

const getAllUserStories = async (req, res) => {
    try {
        const result = await pool.query(userStoryQueries.getAllUserStories);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const getUserStoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(userStoryQueries.getUserStoryById, [id]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const createUserStory = async (req, res) => {
    try {
        const { name, description } = req.body;
        await pool.query(userStoryQueries.createUserStory, [name, description]);
        res.status(201).json({ message: "User story created successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const updateUserStory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        await pool.query(userStoryQueries.updateUserStory, [name, description, id]);
        res.json({ message: "User story updated successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const deleteUserStory = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query(userStoryQueries.deleteUserStory, [id]);
        res.json({ message: "User story deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};  

export default {
    getAllUserStories,
    getUserStoryById,
    createUserStory,
    updateUserStory,
    deleteUserStory
};