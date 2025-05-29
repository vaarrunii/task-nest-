import React from "react";

const PlannerSelect = ({ selectedPlanner, setSelectedPlanner, planners }) => {
  return (
    <div className="planner-select-container">
      <label className="text-sm font-medium text-gray-600 mr-2">🗂️ Planner:</label>
      <select
        value={selectedPlanner}
        onChange={(e) => setSelectedPlanner(e.target.value)}
        className="rounded px-3 py-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800 bg-white"
      >
        {planners.map((planner, index) => (
          <option key={index} value={planner}>
            {planner}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PlannerSelect;
