import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./BacklogDashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faTrash,
  faChevronRight,
  faChevronDown,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import Popup from "../Popup/Popup";
import EpicEditPopup from "../Popup/EpicEditPopup";
import StoryEditPopup from "../Popup/StoryEditPopup";
import TaskEditPopup from "../Popup/TaskEditPopup";

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

  const [epicActionId, setEpicActionId] = useState(null);
  const [storyActionId, setStoryActionId] = useState(null);
  const [taskActionId, setTaskActionId] = useState(null);

  const [editingEpic, setEditingEpic] = useState(null);
  const [editingStory, setEditingStory] = useState(null);
  const [editingTask, setEditingTask] = useState(null);


  const navigate = useNavigate();
  const { projectId } = useParams();

  useEffect(() => {
    const handleClickOutside = () => {
      setEpicActionId(null);
      setStoryActionId(null);
      setTaskActionId(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

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

      const epicPromises = epicsData.map(async (epic) => {
        const storyRes = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/userstories/getByEpicId/${epic.id}`
        );
        const stories = storyRes.data;

        const storyPromises = stories.map(async (story) => {
          const taskRes = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/tasks/getByStoryId/${story.id}`
          );
          return { ...story, tasks: taskRes.data };
        });

        const storiesWithTasks = await Promise.all(storyPromises);
        return { ...epic, stories: storiesWithTasks };
      });

      const allEpicsWithStoriesAndTasks = await Promise.all(epicPromises);
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

  const toggleStory = (id) => {
    setExpandedStoryId((prev) => (prev === id ? null : id));
  };

  const handleDeleteEpic = (epicId) => {
    showPopup({
      message: "Are you sure you want to delete this epic?",
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

  return (
    <div className="backlog-dashboard-wrapper">
      <div className="backlog-header">
        <h2 className="backlog-dashboard-header">Project Backlog</h2>
        <button onClick={() => navigate(`/projects/${projectId}/epic/new`)}>
          Create
        </button>
      </div>

      {epics.map((epic) => (
        <div key={epic.id} className="epic-card-wrapper">
          <div className="epic-card-header">
            <div
              className="epic-title"
              onClick={() => toggleEpic(epic.id)}
              style={epic.stories.length === 0 ? { marginLeft: "30px" } : {}}
            >
              {epic.stories.length > 0 && (
                <FontAwesomeIcon
                  icon={
                    expandedEpicId === epic.id ? faChevronDown : faChevronRight
                  }
                />
              )}
              <h3>Epic: {epic.title}</h3>
            </div>

            <div className="action-icons" onClick={(e) => e.stopPropagation()}>
              {epicActionId === epic.id ? (
                <>
                  <FontAwesomeIcon
                    icon={faEye}
                    title="View"
                    onClick={() => {
                      navigate(`/projects/${projectId}/epic/${epic.id}`);
                      setEpicActionId(null);
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faEdit}
                    title="Edit"
                    onClick={() => {
                      // navigate(`/projects/${projectId}/epic/${epic.id}/edit`);
                      setEditingEpic(epic);
                      setEpicActionId(null);
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    title="Delete"
                    onClick={() => {
                      handleDeleteEpic(epic.id);
                      setEpicActionId(null);
                    }}
                  />
                </>
              ) : (
                <FontAwesomeIcon
                  icon={faEllipsisV}
                  style={{ cursor: "pointer", width: "20px" }}
                  title="Options"
                  onClick={() => {
                    setEpicActionId(epic.id);
                    setStoryActionId(null);
                    setTaskActionId(null);
                  }}
                />
              )}
            </div>
          </div>

          {expandedEpicId === epic.id && epic.stories.length > 0 &&
            epic.stories.map((story) => (
              <div key={story.id} className="story-card-wrapper">
                <div className="story-card-header">
                  <div
                    className="story-title"
                    onClick={() => toggleStory(story.id)}
                    style={story.tasks.length === 0 ? { marginLeft: "30px" } : {}}
                  >
                    {story.tasks.length > 0 && (
                      <FontAwesomeIcon
                        icon={
                          expandedStoryId === story.id
                            ? faChevronDown
                            : faChevronRight
                        }
                      />
                    )}
                    <h4>User Story: {story.title}</h4>
                  </div>

                  <div className="action-icons" onClick={(e) => e.stopPropagation()}>
                    {storyActionId === story.id ? (
                      <>
                        <FontAwesomeIcon
                          icon={faEye}
                          title="View"
                          onClick={() => {
                            navigate(
                              `/projects/${projectId}/epic/${epic.id}/userstory/${story.id}`
                            );
                            setStoryActionId(null);
                          }}
                        />
                        <FontAwesomeIcon
                          icon={faEdit}
                          title="Edit"
                          onClick={() => {
                            // navigate(
                            //   `/projects/${projectId}/epic/${epic.id}/userstory/${story.id}/edit`
                            // );
                            setEditingStory(story);
                            setStoryActionId(null);
                          }}
                        />
                        <FontAwesomeIcon
                          icon={faTrash}
                          title="Delete"
                          onClick={() => {
                            handleDeleteStory(story.id);
                            setStoryActionId(null);
                          }}
                        />
                      </>
                    ) : (
                      <FontAwesomeIcon
                        icon={faEllipsisV}
                        title="Options"
                        style={{ cursor: "pointer", width: "20px" }}
                        onClick={() => {
                          setStoryActionId(story.id);
                          setEpicActionId(null);
                          setTaskActionId(null);
                        }}
                      />
                    )}
                  </div>
                </div>

                {expandedStoryId === story.id && story.tasks.length > 0 && (
                  <div className="task-card-list">
                    {story.tasks.map((task) => (
                      <div
                        key={task.id}
                        className="task-card-box"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(
                            `/projects/${projectId}/epic/${epic.id}/userstory/${story.id}/task/${task.id}`
                          );
                        }}
                      >
                        <p>Task: {task.title}</p>
                        <div className="action-icons" onClick={(e) => e.stopPropagation()}>
                          {taskActionId === task.id ? (
                            <>
                              <FontAwesomeIcon
                                icon={faEye}
                                title="View"
                                onClick={() => {
                                  navigate(
                                    `/projects/${projectId}/epic/${epic.id}/userstory/${story.id}/task/${task.id}`
                                  );
                                  setTaskActionId(null);
                                }}
                              />
                              <FontAwesomeIcon
                                icon={faEdit}
                                title="Edit"
                                onClick={() => {
                                  // navigate(
                                  //   `/projects/${projectId}/epic/${epic.id}/userstory/${story.id}/task/${task.id}/edit`
                                  // );
                                  setEditingTask(task);
                                  setTaskActionId(null);
                                }}
                              />
                              <FontAwesomeIcon
                                icon={faTrash}
                                title="Delete"
                                onClick={() => {
                                  handleDeleteTask(task.id);
                                  setTaskActionId(null);
                                }}
                              />
                            </>
                          ) : (
                            <FontAwesomeIcon
                              icon={faEllipsisV}
                              style={{ cursor: "pointer", width: "20px" }}
                              title="Options"
                              onClick={() => {
                                setTaskActionId(task.id);
                                setEpicActionId(null);
                                setStoryActionId(null);
                              }}
                            />
                          )}
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

      {editingEpic && (
  <EpicEditPopup
    initialData={editingEpic}
    onClose={() => setEditingEpic(null)}
    onUpdate={async (updated) => {
      try {
        const updatedData = {
          title: updated.title,
          description: updated.description,
        };

        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/api/epics/update/${updated.id}`,
          updatedData
        );

        setEpics((prev) =>
          prev.map((epic) =>
            epic.id === updated.id ? { ...epic, ...updatedData, id: updated.id } : epic
          )
        );

        setEditingEpic(null);
      } catch (err) {
        console.error("Failed to update epic:", err);
      }
    }}
  />
)}

{editingStory && (
  <StoryEditPopup
    initialData={editingStory}
    onClose={() => setEditingStory(null)}
    onUpdate={async (updated) => {
      try {

        const updatedData = {
          title: updated.title,
          description: updated.description,
        };

        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/userstories/update/${updated.id}`, updatedData);

        setEpics((prev) =>
          prev.map((epic) => ({
            ...epic,
            stories: epic.stories.map((story) =>
              story.id === updated.id ? { ...story, ...updatedData, id: updated.id } : story
            ),
          }))
        );
        setEditingStory(null);
      } catch (err) {
        console.error("Failed to update story:", err);
      }
    }}
  />
)}

{editingTask && (
  <TaskEditPopup
    initialData={editingTask}
    onClose={() => setEditingTask(null)}
    onUpdate={async (updated) => {
      try {

        const updatedData = {
          title: updated.title,
          description: updated.description,
          // priority: updated.priority,
          status: updated.status
        }

        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/update/${updated.id}`, updatedData);
        setEpics((prev) =>
          prev.map((epic) => ({
            ...epic,
            stories: epic.stories.map((story) => ({
              ...story,
              tasks: story.tasks.map((task) =>
                task.id === updated.id ? { ...task, ...updatedData, id: updated.id } : task
              ),
            })),
          }))
        );
        setEditingTask(null);
      } catch (err) {
        console.error("Failed to update task:", err);
      }
    }}
  />
)}

    </div>
  );
}
