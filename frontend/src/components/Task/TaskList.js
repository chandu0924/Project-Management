import { useNavigate, useParams } from "react-router-dom";
import "./TaskList.css";
import { useEffect, useState } from "react";
import axios from "axios";

// const tasks = [
//     { id: 1, title: 'Task 1', description: 'Description 1', status: 'In Progress', priority: 1 },
//     { id: 2, title: 'Task 2', description: 'Description 2', status: 'To Do', priority: 2 },
//     { id: 3, title: 'Task 3', description: 'Description 3', status: 'Completed', priority: 3 },
// ]

const TaskList = () => {
    const { epicId,storyId, projectId } = useParams();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchUserStoryData = async () => {
            try {
                let res;
                if(storyId){
                    res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/getByStoryId/${storyId}`);
                }else{
                    res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/getByProjectId/${projectId}`);
                }
                setTasks(res.data);
            } catch (err) {
                console.error("Failed to fetch user story data", err);
            }
        }
        fetchUserStoryData();
    }, []);

    return (
        <div className="task-list-container">
            <h2 className="task-list-header">Tasks</h2>
            {tasks.map((task) => (
                <div key={task.id} 
                     className="task-card"
                     onClick={() => navigate(`/projects/${projectId}/epic/${epicId}/userstory/${storyId}/task/${task.id}`)}
                >
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