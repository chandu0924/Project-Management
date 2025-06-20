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

const getUserStoryByEpicId = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(userStoryQueries.getUserStoryByEpicId, [id]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const createUserStory = async (req, res) => {
    try {
        const { epicId, title, description } = req.body;
        const result = await pool.query(userStoryQueries.createUserStory, [title, description, epicId]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

/*
Updates an existing user story by its ID.

Request parameters:
- req.params.id: The ID of the user story to update.
- req.body.name: The new name of the user story.
- req.body.description: The new description of the user story.

Responses:
- 200: A JSON object confirming successful update.
- 500: A JSON object with an error message if a server error occurs.
*/

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

const getUserStoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(userStoryQueries.getUserStoryById, [id]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export default {
    getAllUserStories,
    getUserStoryByEpicId,
    createUserStory,
    getUserStoryById,
    updateUserStory,
    deleteUserStory
};