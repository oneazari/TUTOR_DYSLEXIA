// src/Dashboard.js
import React from "react";
import "./Dashboard.css";

const Dashboard = ({ user, onSelectSubject, onLogout }) => {
  const subjects = ["Science", "Maths", "English"];

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user.name}!</h1>
      <p>Progress: {user.progress}%</p>

      <h2>Select a Subject</h2>
      <div className="subjects">
        {subjects.map((subj, idx) => (
          <button key={idx} className="primary-btn" onClick={() => onSelectSubject(subj)}>
            {subj}
          </button>
        ))}
      </div>

      <button className="secondary-btn logout-btn" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;