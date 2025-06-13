import projectQueries from "../queries/projectQueries.js";
import pool from "../db/connection.js";

const getAllProjects = async (req, res) => {
    try {
        const result = await pool.query(projectQueries.getAllProjects);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(projectQueries.getProjectById, [id]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

/*
paylaod
{
  "name": "Project Name",
  "description": "Project Description"
}
*/
const createProject = async (req, res) => {
    try {
        const { name, description } = req.body;
        await pool.query(projectQueries.createProject, [name, description]);
        res.status(201).json({ message: "Project created successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        await pool.query(projectQueries.updateProject, [name, description, id]);
        res.json({ message: "Project updated successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query(projectQueries.deleteProject, [id]);
        res.json({ message: "Project deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export default { getAllProjects, getProjectById, createProject, updateProject, deleteProject };