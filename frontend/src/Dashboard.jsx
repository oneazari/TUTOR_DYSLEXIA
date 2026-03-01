// Dashboard.jsx
import React from "react";
import "./app.css"; // or login.css
import { FaBrain, FaBook, FaCalculator, FaGlobe, FaLanguage } from "react-icons/fa";

// Dummy skills data
const skills = [
  { name: "Logic", icon: <FaBrain />, progress: 70 },
  { name: "Math", icon: <FaCalculator />, progress: 55 },
  { name: "English", icon: <FaLanguage />, progress: 80 },
  { name: "Science", icon: <FaBook />, progress: 40 },
  { name: "GK", icon: <FaGlobe />, progress: 60 },
];

// Bottom navigation buttons
const bottomNav = [
  { name: "Listen", icon: "🎧" },
  { name: "Achievements", icon: "🏆" },
  { name: "Assignments", icon: "📝" },
  { name: "Resources", icon: "📚" },
  { name: "Settings", icon: "⚙️" },
];

// Dummy user data
const userData = {
  avatar: "/default-avatar.png",
  username: "Navami",
  level: 5,
  xpPercent: 65, // XP bar %
  points: 1200,
  completedLessons: 18,
};

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* ---------------- User Card ---------------- */}
      <div className="user-card">
        <img
          src={userData.avatar}
          alt="avatar"
          className="avatar"
        />
        <div className="user-info">
          <h2>{userData.username}</h2>
          <div className="level-xp">
            <span>Level {userData.level}</span>
            <div className="xp-bar">
              <div
                className="xp-progress"
                style={{ width: `${userData.xpPercent}%` }}
              ></div>
            </div>
          </div>
          <p>Points: {userData.points}</p>
          <p>Completed Lessons: {userData.completedLessons}</p>
          <button className="continue-btn">Continue Next Lesson</button>
        </div>
      </div>

      {/* ---------------- Skills Grid ---------------- */}
      <div className="skills-grid">
        {skills.map((skill) => (
          <div className="skill-card" key={skill.name}>
            <div className="skill-header">
              <span className="skill-icon" style={{ fontSize: "28px" }}>
                {skill.icon}
              </span>
              <h3>{skill.name}</h3>
            </div>
            <div className="skill-progress">
              <div
                className="skill-progress-bar"
                style={{ width: `${skill.progress}%` }}
              ></div>
            </div>
            <button className="continue-btn-small">Continue</button>
          </div>
        ))}
      </div>

      {/* ---------------- Bottom Navigation ---------------- */}
      <div className="bottom-nav">
        {bottomNav.map((nav) => (
          <button key={nav.name}>
            <span className="nav-icon">{nav.icon}</span>
            <span className="nav-text">{nav.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
