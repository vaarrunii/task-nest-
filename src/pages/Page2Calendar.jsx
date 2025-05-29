import React from "react";

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export default function Page2Calendar({ tasks }) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  // Prepare days in month
  const daysInMonth = getDaysInMonth(year, month);

  // Create a map: date string (yyyy-mm-dd) -> list of tasks for that date
  const tasksByDate = {};
  tasks.forEach(task => {
    // We will list task for all days between startDate and endDate inclusive
    const start = new Date(task.startDate);
    const end = new Date(task.endDate);
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().slice(0, 10);
      if (!tasksByDate[dateStr]) tasksByDate[dateStr] = [];
      tasksByDate[dateStr].push(task);
    }
  });

  // Weekday names
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // First day of month (0=Sun)
  const firstDay = new Date(year, month, 1).getDay();

  // Build calendar grid: show 1 blank cell before first day
  const calendarCells = [];

  for (let i = 0; i < firstDay; i++) {
    calendarCells.push(<div key={"empty"+i} className="calendar-cell empty"></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
    const dayTasks = tasksByDate[dateStr] || [];

    calendarCells.push(
      <div key={dateStr} className="calendar-cell">
        <div className="calendar-date">{day}</div>
        <ul className="calendar-tasks-list">
          {dayTasks.map(t => (
            <li
              key={t.id}
              className={"calendar-task-item " + (t.assignee.toLowerCase())}
              title={`${t.name} (${t.assignee})`}
            >
              {t.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="calendar-page">
      <h2>Calendar - {now.toLocaleString("default", { month: "long" })} {year}</h2>
      <div className="calendar-grid">
        {weekdays.map(day => (
          <div key={day} className="calendar-header-cell">{day}</div>
        ))}
        {calendarCells}
      </div>
    </div>
  );
}
