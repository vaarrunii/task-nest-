import React, { useState } from "react";

const assignees = ["Chinmay", "Nitisha", "Vyom"];
const priorities = ["Urgent", "Moderate", "Not Urgent"];
const progressOptions = ["Not Started", "In Progress", "Done"];

export default function Page1TaskManager({ tasks, addTask, updateTask, deleteTask }) {
  const [form, setForm] = useState({
    id: null,
    name: "",
    assignee: "Chinmay",
    startDate: "",
    endDate: "",
    progress: "Not Started",
    priority: "Moderate",
  });

  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return alert("Task name required");
    if (!form.startDate || !form.endDate) return alert("Start and End dates required");
    if (new Date(form.startDate) > new Date(form.endDate)) return alert("Start date cannot be after End date");

    if (editing) {
      updateTask(form);
    } else {
      addTask({...form, id: Date.now()});
    }
    setForm({
      id: null,
      name: "",
      assignee: "Chinmay",
      startDate: "",
      endDate: "",
      progress: "Not Started",
      priority: "Moderate",
    });
    setEditing(false);
  };

  const startEdit = (task) => {
    setForm(task);
    setEditing(true);
  };

  return (
    <div className="task-manager">
      <h2>Task Manager</h2>

      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          name="name"
          placeholder="Task name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <select name="assignee" value={form.assignee} onChange={handleChange}>
          {assignees.map(a => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>

        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          required
        />

        <select name="progress" value={form.progress} onChange={handleChange}>
          {progressOptions.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        <select name="priority" value={form.priority} onChange={handleChange}>
          {priorities.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        <button type="submit">{editing ? "Update" : "Add"} Task</button>
        {editing && <button type="button" onClick={() => {
          setForm({
            id: null,
            name: "",
            assignee: "Chinmay",
            startDate: "",
            endDate: "",
            progress: "Not Started",
            priority: "Moderate",
          });
          setEditing(false);
        }}>Cancel</button>}
      </form>

      <table className="tasks-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Assignee</th>
            <th>Start</th>
            <th>End</th>
            <th>Progress</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 && (
            <tr><td colSpan="7" style={{textAlign: "center"}}>No tasks yet.</td></tr>
          )}
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td>{task.assignee}</td>
              <td>{task.startDate}</td>
              <td>{task.endDate}</td>
              <td>{task.progress}</td>
              <td>{task.priority}</td>
              <td>
                <button onClick={() => startEdit(task)}>Edit</button>
                <button onClick={() => {
                  if(window.confirm("Delete this task?")) deleteTask(task.id);
                }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
