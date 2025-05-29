import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const categories = ["Home", "Work", "Hobby"];

export default function Page4Categories({ tasks, updateTask }) {
  // We will maintain tasks grouped by category here locally
  // On drag end, update task.category and call updateTask

  // Initialize categorizedTasks from tasks
  const [categorizedTasks, setCategorizedTasks] = useState({
    Home: [],
    Work: [],
    Hobby: [],
  });

  // On tasks change, regroup them by category (default to 'Home' if none)
  useEffect(() => {
    const newCats = { Home: [], Work: [], Hobby: [] };
    tasks.forEach(task => {
      const cat = task.category && categories.includes(task.category) ? task.category : "Home";
      newCats[cat].push(task);
    });
    setCategorizedTasks(newCats);
  }, [tasks]);

  function onDragEnd(result) {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    // If dropped in same place, do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // Find the task being moved
    const movedTask = categorizedTasks[source.droppableId].find(
      (t) => t.id.toString() === draggableId
    );

    if (!movedTask) return;

    // Remove from source array
    const sourceTasks = Array.from(categorizedTasks[source.droppableId]);
    sourceTasks.splice(source.index, 1);

    // Insert into destination array
    const destTasks = Array.from(categorizedTasks[destination.droppableId]);
    destTasks.splice(destination.index, 0, movedTask);

    // Update state
    setCategorizedTasks({
      ...categorizedTasks,
      [source.droppableId]: sourceTasks,
      [destination.droppableId]: destTasks,
    });

    // Update task.category and call updateTask
    updateTask({ ...movedTask, category: destination.droppableId });
  }

  return (
    <div className="categories-page">
      <h2>Drag & Drop Task Categories</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="categories-container">
          {categories.map(cat => (
            <Droppable droppableId={cat} key={cat}>
              {(provided) => (
                <div
                  className="category-column"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h3>{cat}</h3>
                  {categorizedTasks[cat].map((task, index) => (
                    <Draggable
                      draggableId={task.id.toString()}
                      index={index}
                      key={task.id}
                    >
                      {(provided, snapshot) => (
                        <div
                          className={`category-task ${snapshot.isDragging ? "dragging" : ""}`}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          title={`Assignee: ${task.assignee}\nProgress: ${task.progress}\nPriority: ${task.priority}`}
                        >
                          {task.name}
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
