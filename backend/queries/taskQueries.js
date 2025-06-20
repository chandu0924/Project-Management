const taskQueries = {
    getAllTasks: "SELECT * FROM clone.tasks",
    getTaskById: "SELECT * FROM clone.tasks WHERE id = $1",
    createTask: "INSERT INTO clone.tasks (user_story_id,title, description, status, priority,assigned_to, project_id, epic_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
    updateTask: "UPDATE clone.tasks SET title = $1, description = $2 WHERE id = $3",
    deleteTask: "DELETE clone.FROM tasks WHERE id = $1",
    getTaskByStoryId: "SELECT * FROM clone.tasks WHERE user_story_id = $1",
    getTaskByProjectId: "SELECT * FROM clone.tasks WHERE project_id = $1;"
}

export default taskQueries