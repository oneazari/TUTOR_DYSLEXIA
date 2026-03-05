import React from "react";
import { Theme } from "./Theme";
import { useLevelProgress } from "./LevelProgressContext";

const Level4Dashboard = ({ user, onSelectSubject, onBackToLevel3 }) => {
  const { progress } = useLevelProgress();
  
  // Expert Level Subject Data
  const subjectData = [
    { name: "Science", icon: "🔬", color: "#9b59b6" }, 
    { name: "Math", icon: "📐", color: "#3498db" },    
    { name: "English", icon: "🖋️", color: "#e67e22" },  
    { name: "GK", icon: "🏅", color: "#27ae60" }      
  ];

  // Calculate Stars for Level 4
 // 🕵️ Filter: Only count stars where the Quiz ID starts with "l4"
// 🕵️ Step 1: Count ONLY Level 4 stars
  const totalStars = subjectData.reduce((acc, sub) => {
    const subjectProgress = progress[sub.name] || {};
    
    // 🌟 We filter for IDs starting with 'l4'
    const level4Scores = Object.entries(subjectProgress).filter(([quizId, score]) => 
      quizId.startsWith("l4") && score >= 7
    );
    
    return acc + level4Scores.length;
  }, 0);

  // 🕵️ Step 2: Now 'totalStars' exists, so these lines work!
  const goal = 20; 
  const percent = Math.min(Math.round((totalStars / goal) * 100), 100);
  const isLevel5Unlocked = totalStars >= goal;

  return (
    <div style={{ padding: "40px", backgroundColor: Theme.background, minHeight: "100vh", fontFamily: Theme.fontFamily }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        {/* HEADER */}
        <div style={{ 
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: "30px", backgroundColor: "white", padding: "20px 30px",
          borderRadius: Theme.borderRadius, boxShadow: Theme.cardShadow,
          borderLeft: `10px solid #27ae60` // Green for GK/Level 4
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ 
              fontSize: "60px", backgroundColor: "#f1f5f9", width: "100px", height: "100px",
              display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%"
            }}>
              {user.avatar || "👤"}
            </div>
            <div>
              <h1 style={{ color: Theme.textMain, margin: 0, fontSize: "32px" }}>Master Explorer, {user.username}!</h1>
              <p style={{ color: Theme.textMuted, margin: "5px 0 0 0", fontSize: "20px" }}>Expert · Level 4</p>
            </div>
          </div>
          
          <button 
            onClick={onBackToLevel3} 
            style={{ 
              padding: "12px 24px", borderRadius: "12px", border: `2px solid ${Theme.sidebar}`, 
              background: "white", color: Theme.sidebar, fontWeight: "bold", cursor: "pointer" 
            }}
          >
            ← Level 3
          </button>
        </div>

        {/* PROGRESS BAR */}
        <div style={{ backgroundColor: "white", padding: "25px", borderRadius: Theme.borderRadius, boxShadow: Theme.cardShadow, marginBottom: "40px" }}>
           <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", fontSize: "20px", fontWeight: "bold" }}>
              <span style={{ color: Theme.textMain }}>Level 5 Unlock Progress</span>
              <span style={{ color: "#27ae60" }}>{totalStars} / {goal} Stars</span>
           </div>
           <div style={{ width: "100%", height: "24px", backgroundColor: "#f0f0f0", borderRadius: "12px", overflow: "hidden" }}>
              <div style={{ width: `${percent}%`, height: "100%", backgroundColor: "#27ae60", transition: "width 1s ease-out" }} />
           </div>
        </div>

        {/* SUBJECT GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "25px", marginBottom: "40px" }}>
          {subjectData.map(sub => (
            <button key={sub.name} onClick={() => onSelectSubject(sub.name)} 
              style={{ 
                display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 10px",
                borderRadius: Theme.borderRadius, border: "none", backgroundColor: "white", 
                boxShadow: Theme.cardShadow, borderBottom: `10px solid ${sub.color}`, cursor: "pointer", transition: "0.2s" 
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-10px)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
              <span style={{ fontSize: "70px", marginBottom: "15px" }}>{sub.icon}</span>
              <span style={{ fontSize: "24px", fontWeight: "bold", color: Theme.textMain }}>{sub.name}</span>
            </button>
          ))}
        </div>

        {/* UNLOCK MESSAGE */}
        {isLevel5Unlocked ? (
          <div style={{ 
            textAlign: "center", padding: "35px", backgroundColor: "#fef3c7", 
            borderRadius: Theme.borderRadius, border: `3px solid #f59e0b`, boxShadow: Theme.cardShadow
          }}>
            <h2 style={{ color: "#92400e", margin: 0, fontSize: "30px" }}>💎 Ultimate Master Unlocked!</h2>
            <p style={{ color: "#92400e", marginTop: "12px", fontSize: "19px" }}>
              You have conquered Level 4! You are ready for the final Level 5 challenge.
            </p>
          </div>
        ) : (
          <div style={{ textAlign: "center", color: Theme.textMuted, fontSize: "18px", background: "white", padding: "15px", borderRadius: "12px" }}>
            Collect {goal} stars to reach the final Diamond stage!
          </div>
        )}

      </div>
    </div>
  );
};

export default Level4Dashboard;