import "./TaskList.css";

const tasks = [
    { id: 1, title: 'Task 1', description: 'Description 1', status: 'In Progress', priority: 1 },
    { id: 2, title: 'Task 2', description: 'Description 2', status: 'To Do', priority: 2 },
    { id: 3, title: 'Task 3', description: 'Description 3', status: 'Completed', priority: 3 },
]

const TaskList = ({  }) => {
    return (
        <div className="task-list-container">
            <h2 className="task-list-header">Tasks</h2>
            {tasks.map((task) => (
                <div key={task.id} className="task-card">
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>Status: {task.status}</p>
                    <p>Priority: {task.priority}</p>
                </div>
            ))}
        </div>
    );
}

export default TaskList;