import React, { useState, useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';

const AddTaskForm = ({ onClose }) => {
  const { addTask } = useContext(TaskContext);
  const [newTask, setNewTask] = useState({
    name: '',
    assignee: 'Chinmay',
    startDate: '',
    endDate: '',
    priority: 'Moderate',
    status: 'Not Started'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.name && newTask.startDate && newTask.endDate) {
      addTask(newTask);
      onClose();
    }
  };

  return (
    <div className="add-task-modal">
      <div className="modal-content">
        <h3>Add New Task</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Task Name:</label>
            <input
              type="text"
              value={newTask.name}
              onChange={(e) => setNewTask({...newTask, name: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Assignee:</label>
            <select
              value={newTask.assignee}
              onChange={(e) => setNewTask({...newTask, assignee: e.target.value})}
            >
              <option value="Chinmay">Chinmay</option>
              <option value="Nitisha">Nitisha</option>
              <option value="Vyom">Vyom</option>
            </select>
          </div>

          <div className="form-group">
            <label>Start Date:</label>
            <input
              type="date"
              value={newTask.startDate}
              onChange={(e) => setNewTask({...newTask, startDate: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Due Date:</label>
            <input
              type="date"
              value={newTask.endDate}
              onChange={(e) => setNewTask({...newTask, endDate: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Priority:</label>
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
            >
              <option value="Urgent">Urgent</option>
              <option value="Moderate">Moderate</option>
              <option value="Not Urgent">Not Urgent</option>
            </select>
          </div>

          <div className="form-group">
            <label>Initial Status:</label>
            <select
              value={newTask.status}
              onChange={(e) => setNewTask({...newTask, status: e.target.value})}
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Add Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm;