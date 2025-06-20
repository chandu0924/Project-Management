import epicQueries from "../queries/epicQueries.js";
import pool from "../db/connection.js";

const getAllEpics = async (req, res) => {
    try {
        const result = await pool.query(epicQueries.getAllEpics);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const getEpicById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(epicQueries.getEpicById, [id]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const createEpic = async (req, res) => {
    try {
        const { title, description, projectId } = req.body;
        const result = await pool.query(epicQueries.createEpic, [title, description, projectId]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const updateEpic = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        await pool.query(epicQueries.updateEpic, [name, description, id]);
        res.json({ message: "Epic updated successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const deleteEpic = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query(epicQueries.deleteEpic, [id]);
        res.json({ message: "Epic deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const getEpicByProjectId = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(epicQueries.getEpicByProjectId, [id]);
        // console.log(result.rows)
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export default {
    getAllEpics,
    getEpicById,
    createEpic,
    getEpicByProjectId,
    updateEpic,
    deleteEpic,
};