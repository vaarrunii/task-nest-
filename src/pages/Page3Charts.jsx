import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const assignees = ["Chinmay", "Nitisha", "Vyom"];
const progressStates = ["Done", "In Progress", "Late"];

export default function Page3Charts({ tasks }) {
  // Late means tasks whose endDate is before today and not Done

  const today = new Date();

  const getStatusCount = (assignee, status) => {
    if (status === "Late") {
      return tasks.filter(t => t.assignee === assignee && t.progress !== "Done" && new Date(t.endDate) < today).length;
    }
    if (status === "Done") {
      return tasks.filter(t => t.assignee === assignee && t.progress === "Done").length;
    }
    if (status === "In Progress") {
      return tasks.filter(t => t.assignee === assignee && t.progress === "In Progress").length;
    }
    return 0;
  };

  const colors = {
    "Done": "#4caf50",
    "In Progress": "#2196f3",
    "Late": "#f44336"
  };

  return (
    <div className="charts-page">
      <h2>Task Progress by Assignee</h2>
      <div className="charts-container">
        {assignees.map(assignee => {
          const data = {
            labels: progressStates,
            datasets: [{
              data: progressStates.map(status => getStatusCount(assignee, status)),
              backgroundColor: progressStates.map(status => colors[status]),
              hoverOffset: 10,
            }],
          };
          return (
            <div key={assignee} className="chart-wrapper">
              <h3>{assignee}</h3>
              <Pie data={data} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
