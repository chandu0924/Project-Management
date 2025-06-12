import { useEffect, useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./SprintBoard.css";

const dummySprintData = {
  sprintName: "Sprint 1",
  tasks: [
    { id: "1", title: "Build signup UI", status: "To Do" },
    { id: "2", title: "Validate email", status: "In Progress" },
    { id: "3", title: "Connect to API", status: "Completed" },
    { id: "4", title: "Socket integration", status: "To Do" },
  ],
};

export default function SprintBoard() {
  const [groupedTasks, setGroupedTasks] = useState({});

  useEffect(() => {
    const grouped = {
      "To Do": [],
      "In Progress": [],
      "Completed": [],
    };
    dummySprintData.tasks.forEach((task) => {
      grouped[task.status].push(task);
    });
    setGroupedTasks(grouped);
  }, []);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceTasks = Array.from(groupedTasks[source.droppableId]);
    const [movedTask] = sourceTasks.splice(source.index, 1);

    movedTask.status = destination.droppableId;

    const destTasks = Array.from(groupedTasks[destination.droppableId]);
    destTasks.splice(destination.index, 0, movedTask);

    setGroupedTasks({
      ...groupedTasks,
      [source.droppableId]: sourceTasks,
      [destination.droppableId]: destTasks,
    });
  };

  return (
    <div className="sprint-board">
      <h2>{dummySprintData.sprintName}</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="sprint-columns">
          {["To Do", "In Progress", "Completed"].map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  className="sprint-column"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h3>{status}</h3>
                  {groupedTasks[status]?.map((task, index) => (
                    <Draggable draggableId={task.id} index={index} key={task.id}>
                      {(provided) => (
                        <div
                          className="task-card"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {task.title}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
