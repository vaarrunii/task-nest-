
import Page1TaskManager from './pages/Page1TaskManager';
import Page2Calendar from './pages/Page2Calendar';
import Page3Charts from './pages/Page3Charts';
import Page4Categories from './pages/Page4Categories';
import "./styles.css";
import React, { useState } from 'react';  // Add { useState } here

export default function App() {
  // Tasks state shared across pages
  const [tasks, setTasks] = useState([]);

  // Current page state
  const [page, setPage] = useState(1);

  // Helper to update task in tasks list
  const updateTask = (updatedTask) => {
    setTasks(tasks.map(t => (t.id === updatedTask.id ? updatedTask : t)));
  };

  // Helper to add task
  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  // Helper to delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="app-container">
      <nav className="nav-bar">
        <button onClick={() => setPage(1)} className={page === 1 ? "active" : ""}>Tasks</button>
        <button onClick={() => setPage(2)} className={page === 2 ? "active" : ""}>Calendar</button>
        <button onClick={() => setPage(3)} className={page === 3 ? "active" : ""}>Charts</button>
        <button onClick={() => setPage(4)} className={page === 4 ? "active" : ""}>Categories</button>
      </nav>

      <main className="page-content">
        {page === 1 && (
          <Page1TaskManager
            tasks={tasks}
            addTask={addTask}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        )}
        {page === 2 && <Page2Calendar tasks={tasks} />}
        {page === 3 && <Page3Charts tasks={tasks} />}
        {page === 4 && <Page4Categories tasks={tasks} updateTask={updateTask} />}
      </main>
    </div>
  );
}
