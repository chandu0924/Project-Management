import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./BacklogDashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Popup from "../Popup/Popup";

export default function BacklogDashboard() {
  const [epics, setEpics] = useState([]);
  const [expandedEpicId, setExpandedEpicId] = useState(null);
  const [expandedStoryId, setExpandedStoryId] = useState(null);
  const [popupData, setPopupData] = useState({
    visible: false,
    message: "",
    type: "warning",
    onConfirm: null,
  });
  const navigate = useNavigate();
  const { projectId } = useParams();

  const showPopup = ({ message, onConfirm, type = "warning" }) => {
    setPopupData({
      visible: true,
      message,
      type,
      onConfirm,
    });
  };

  const handleCancelPopup = () => {
    setPopupData({ ...popupData, visible: false });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const parsedData = parseInt(projectId);
        const epicRes = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/epics/getByProjectId/${parsedData}`
        );
        const epicsData = epicRes.data;

        const allEpicsWithStoriesAndTasks = [];

        for (const epic of epicsData) {
          const storyRes = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/userstories/getByEpicId/${epic.id}`
          );
          const stories = storyRes.data;

          for (const story of stories) {
            const taskRes = await axios.get(
              `${process.env.REACT_APP_BACKEND_URL}/api/tasks/getByStoryId/${story.id}`
            );
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
    setExpandedEpicId((prev) => (prev === id ? null : id));
    setExpandedStoryId(null);
  };

  const handleDeleteEpic = (epicId) => {
    showPopup({
      message: "Are you sure you want to delete this epic?",
      type: "warning",
      onConfirm: async () => {
        try {
          await axios.delete(
            `${process.env.REACT_APP_BACKEND_URL}/api/epics/delete/${epicId}`
          );
          setEpics((prev) => prev.filter((epic) => epic.id !== epicId));
        } catch (err) {
          console.error("Failed to delete epic:", err);
        } finally {
          handleCancelPopup();
        }
      },
    });
  };

  const handleDeleteStory = (storyId) => {
    showPopup({
      message: "Are you sure you want to delete this user story?",
      type: "warning",
      onConfirm: async () => {
        try {
          const updated = epics.map((epic) => ({
            ...epic,
            stories: epic.stories.filter((story) => story.id !== storyId),
          }));

          await axios.delete(
            `${process.env.REACT_APP_BACKEND_URL}/api/userstories/delete/${storyId}`
          );
          setEpics(updated);
        } catch (err) {
          console.error("Failed to delete story:", err);
        } finally {
          handleCancelPopup();
        }
      },
    });
  };

  const handleDeleteTask = (taskId) => {
    showPopup({
      message: "Are you sure you want to delete this task?",
      type: "warning",
      onConfirm: async () => {
        try {
          const updated = epics.map((epic) => ({
            ...epic,
            stories: epic.stories.map((story) => ({
              ...story,
              tasks: story.tasks.filter((task) => task.id !== taskId),
            })),
          }));

          await axios.delete(
            `${process.env.REACT_APP_BACKEND_URL}/api/tasks/delete/${taskId}`
          );
          setEpics(updated);
        } catch (err) {
          console.error("Failed to delete task:", err);
        } finally {
          handleCancelPopup();
        }
      },
    });
  };

  const toggleStory = (id) => {
    setExpandedStoryId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="backlog-dashboard-wrapper">
      <div className="backlog-header">
        <h2 className="backlog-dashboard-header">Project Backlog</h2>
        {/* <h2>Epics</h2> */}
        <button onClick={() => navigate(`/projects/${projectId}/epic/new`)}>
          Create
        </button>
      </div>
      {epics.map((epic) => (
        <div key={epic.id} className="epic-card-wrapper">
          <div className="epic-card-header" onClick={() => toggleEpic(epic.id)}>
            <h3>Epic: {epic.title}</h3>
            {/* <button onClick={() => navigate(`/projects/${projectId}/epic/${epic.id}`)}>View Epic</button> */}
            <div className="action-icons">
              <FontAwesomeIcon
                icon={faEye}
                title="View"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/projects/${projectId}/epic/${epic.id}`)
                  }
                }
              />
              <FontAwesomeIcon
                icon={faEdit}
                title="Edit"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/projects/${projectId}/epic/${epic.id}/edit`)
                  } 
                }
              />
              <FontAwesomeIcon
                icon={faTrash}
                title="Delete"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteEpic(epic.id)}
                }
              />
            </div>
          </div>

          {expandedEpicId === epic.id &&
            epic.stories.map((story) => (
              <div key={story.id} className="story-card-wrapper">
                <div
                  className="story-card-header"
                  onClick={() => toggleStory(story.id)}
                >
                  <h4>User Story: {story.title}</h4>
                  {/* <button onClick={() => navigate(`/projects/${projectId}/epic/${epic.id}/userstory/${story.id}`)}>
                    View Story
                  </button> */}
                  <div className="action-icons">
                    <FontAwesomeIcon
                      icon={faEye}
                      title="View"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/projects/${projectId}/epic/${epic.id}/userstory/${story.id}`)
                        }
                      }
                    />
                    <FontAwesomeIcon
                      icon={faEdit}
                      title="Edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/projects/${projectId}/epic/${epic.id}/userstory/${story.id}/edit`)
                        }
                      }
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      title="Delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteStory(story.id)}
                      }
                    />
                  </div>
                </div>

                {expandedStoryId === story.id && (
                  <div className="task-card-list">
                    {story.tasks.map((task) => (
                      <div
                        key={task.id}
                        className="task-card-box"
                        onClick={(e) =>{
                          e.stopPropagation();
                          navigate(`/projects/${projectId}/epic/${epic.id}/userstory/${story.id}/task/${task.id}`)
                          }
                        }
                      >
                        <p>Task: {task.title}</p>
                        {/* <button onClick={() => navigate(`/projects/${projectId}/epic/${epic.id}/userstory/${story.id}/task/${task.id}`)}>
                          View Task
                        </button> */}
                        <div className="action-icons">
                          <FontAwesomeIcon
                            icon={faEye}
                            title="View"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/projects/${projectId}/epic/${epic.id}/userstory/${story.id}/task/${task.id}`)
                              }
                            }
                          />
                          <FontAwesomeIcon
                            icon={faEdit}
                            title="Edit"
                            onClick={(e) =>{
                              e.stopPropagation();
                              navigate(`/projects/${projectId}/epic/${epic.id}/userstory/${story.id}/task/${task.id}/edit`)
                              }
                            }
                          />
                          <FontAwesomeIcon
                            icon={faTrash}
                            title="Delete"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteTask(task.id)}
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      ))}
      {popupData.visible && (
        <Popup
          type={popupData.type}
          message={popupData.message}
          onOk={popupData.onConfirm}
          onCancel={handleCancelPopup}
        />
      )}
    </div>
  );
}
