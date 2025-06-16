import taskQueries from "../queries/taskQueries.js";
import pool from "../db/connection.js";

const getAllTasks = async (req, res) => {
    try {
        const result = await pool.query(taskQueries.getAllTasks);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(taskQueries.getTaskById, [id]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const createTask = async (req, res) => {
    try {
        const { storyId, status, priority, assigned_to, title, description } = req.body;
        await pool.query(taskQueries.createTask, 
        [        
            storyId,
            title,
            description,
            status,
            priority,
            assigned_to
        ]);
        res.status(201).json({ message: "Task created successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const getTaskByStoryId = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(taskQueries.getTaskByStoryId, [id]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        await pool.query(taskQueries.updateTask, [title, description, id]);
        res.json({ message: "Task updated successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query(taskQueries.deleteTask, [id]);
        res.json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export default {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    getTaskByStoryId,
    deleteTask,
};