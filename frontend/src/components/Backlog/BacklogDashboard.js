import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./BacklogDashboard.css";

export default function BacklogDashboard() {
  const [epics, setEpics] = useState([]);
  const [expandedEpicId, setExpandedEpicId] = useState(null);
  const [expandedStoryId, setExpandedStoryId] = useState(null);
  const navigate = useNavigate();
  const { projectId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const parsedData = parseInt(projectId);
        const epicRes = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/epics/getByProjectId/${parsedData}`);
        const epicsData = epicRes.data;

        const allEpicsWithStoriesAndTasks = [];

        for (const epic of epicsData) {
          const storyRes = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/userstories/getByEpicId/${epic.id}`);
          const stories = storyRes.data;

          for (const story of stories) {
            const taskRes = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/getByStoryId/${story.id}`);
            story.tasks = taskRes.data;
          }

          allEpicsWithStoriesAndTasks.push({ ...epic, stories });
        }

        setEpics(allEpicsWithStoriesAndTasks);
      } catch (err) {
        console.error("Error fetching backlog data:", err);
      }
    };

    fetchData();
  }, [projectId]);

  const toggleEpic = (id) => {
    setExpandedEpicId(prev => (prev === id ? null : id));
    setExpandedStoryId(null);
  };

  const toggleStory = (id) => {
    setExpandedStoryId(prev => (prev === id ? null : id));
  };

  return (
    <div className="backlog-dashboard-wrapper">
      <div className="backlog-header">
        <h2 className="backlog-dashboard-header">Project Backlog</h2>
        {/* <h2>Epics</h2> */}
        <button onClick={() => navigate(`/projects/${projectId}/epic/new`)}>Create</button>
      </div>
      {epics.map((epic) => (
        <div key={epic.id} className="epic-card-wrapper">
          <div className="epic-card-header" onClick={() => toggleEpic(epic.id)}>
            <h3>Epic: {epic.title}</h3>
            <button onClick={() => navigate(`/projects/${projectId}/epic/${epic.id}`)}>View Epic</button>
          </div>

          {expandedEpicId === epic.id &&
            epic.stories.map((story) => (
              <div key={story.id} className="story-card-wrapper">
                <div className="story-card-header" onClick={() => toggleStory(story.id)}>
                  <h4>User Story: {story.title}</h4>
                  <button onClick={() => navigate(`/projects/${projectId}/epic/${epic.id}/userstory/${story.id}`)}>
                    View Story
                  </button>
                </div>

                {expandedStoryId === story.id && (
                  <div className="task-card-list">
                    {story.tasks.map((task) => (
                      <div
                        key={task.id}
                        className="task-card-box"
                        onClick={() =>
                          navigate(`/projects/${projectId}/epic/${epic.id}/userstory/${story.id}/task/${task.id}`)
                        }
                      >
                        <p>Task: {task.title}</p>
                        <button onClick={() => navigate(`/projects/${projectId}/epic/${epic.id}/userstory/${story.id}/task/${task.id}`)}>
                          View Task
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
