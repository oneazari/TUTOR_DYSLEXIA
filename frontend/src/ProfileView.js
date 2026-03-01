import React from "react";
import { Theme } from "./Theme";
import { lessonsData } from "./lessonsData";
import { level2Data } from "./level2Data";

const ProfileView = ({ user, progress, onBack }) => {
  
  const getDetailedStats = () => {
    let totalStars = 0;
    const subjects = ["Science", "Math", "English"];
    const subjectStats = { Science: 0, Math: 0, English: 0 };
    const completedChapters = [];
    const allLevelData = [lessonsData, level2Data];

    subjects.forEach(sub => {
      allLevelData.forEach((levelSource, index) => {
        if (levelSource[sub]) {
          levelSource[sub].forEach(chapter => {
            const score = (progress[sub] || {})[chapter.id];
            if (score !== null && score >= 7) {
              totalStars++;
              subjectStats[sub]++;
              completedChapters.push({
                name: chapter.title,
                subject: sub,
                level: index + 1,
                date: new Date().toLocaleDateString(), // Placeholder for real date logic
                icon: sub === "Science" ? "🔬" : sub === "Math" ? "📐" : "📚"
              });
            }
          });
        }
      });
    });

    return { totalStars, completedChapters, subjectStats };
  };

  const { totalStars, completedChapters, subjectStats } = getDetailedStats();

  // Achievement Logic
  const badges = [
    { id: 'first_star', name: "First Step", icon: "🌱", earned: totalStars >= 1, hint: "Earn 1 star" },
    { id: 'science_whiz', name: "Science Whiz", icon: "🧬", earned: subjectStats.Science >= 5, hint: "5 Science stars" },
    { id: 'math_king', name: "Math King", icon: "👑", earned: subjectStats.Math >= 5, hint: "5 Math stars" },
    { id: 'word_master', name: "Word Master", icon: "✍️", earned: subjectStats.English >= 5, hint: "5 English stars" },
    { id: 'level_up', name: "Level 2 Hero", icon: "🚀", earned: totalStars >= 15, hint: "Unlock Level 2" },
  ];

  return (
    <div style={{ padding: "40px", backgroundColor: "#F1F5F9", minHeight: "100vh", fontFamily: Theme.fontFamily }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <button onClick={onBack} style={{ padding: "12px 25px", borderRadius: "12px", border: "none", backgroundColor: Theme.accent, color: "white", cursor: "pointer", fontWeight: "bold", fontSize: "18px", boxShadow: "0 4px 0 #2980b9" }}>
            ← Back to Lessons
          </button>
          <div style={{ fontSize: "20px", fontWeight: "bold", color: Theme.textMuted }}>Student ID: #{user.username.toUpperCase()}2024</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "30px" }}>
          
          {/* LEFT COLUMN: IDENTITY CARD */}
          <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "25px", boxShadow: Theme.cardShadow, height: "fit-content", textAlign: "center" }}>
            <div style={{ fontSize: "90px", background: "#EBF4FF", width: "140px", height: "140px", margin: "0 auto 20px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: `4px solid ${Theme.accent}` }}>
              {user.avatar}
            </div>
            <h2 style={{ fontSize: "32px", margin: "0", color: Theme.textMain }}>{user.username}</h2>
            <p style={{ color: Theme.accent, fontWeight: "bold", marginBottom: "20px" }}>Rank: Expert Scholar</p>
            
            <div style={{ borderTop: "2px solid #F1F5F9", paddingTop: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span>Total Stars:</span>
                <span style={{ fontWeight: "bold" }}>⭐ {totalStars}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>IQ Points:</span>
                <span style={{ fontWeight: "bold", color: "#10B981" }}>{totalStars * 120}</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: DETAILED STATS */}
          <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            
            {/* SUBJECT MASTERY PROGRESS */}
            <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "25px", boxShadow: Theme.cardShadow }}>
              <h3 style={{ marginTop: 0, fontSize: "24px" }}>Subject Mastery</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {Object.keys(subjectStats).map(sub => (
                  <div key={sub}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontWeight: "bold" }}>
                      <span>{sub}</span>
                      <span>{subjectStats[sub]} Stars</span>
                    </div>
                    <div style={{ height: "12px", backgroundColor: "#F1F5F9", borderRadius: "6px", overflow: "hidden" }}>
                      <div style={{ width: `${(subjectStats[sub] / 10) * 100}%`, height: "100%", backgroundColor: sub === "Science" ? "#9b59b6" : sub === "Math" ? "#3498db" : "#e67e22", transition: "width 1s ease" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ACHIEVEMENT BADGES */}
            <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "25px", boxShadow: Theme.cardShadow }}>
              <h3 style={{ marginTop: 0, fontSize: "24px" }}>Badges & Awards</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {badges.map(badge => (
                  <div key={badge.id} style={{ textAlign: "center", width: "100px", opacity: badge.earned ? 1 : 0.3, filter: badge.earned ? "none" : "grayscale(100%)" }}>
                    <div style={{ fontSize: "40px", background: badge.earned ? "#FFFBEB" : "#F1F5F9", padding: "15px", borderRadius: "20px", marginBottom: "8px" }}>
                      {badge.icon}
                    </div>
                    <div style={{ fontSize: "14px", fontWeight: "bold" }}>{badge.name}</div>
                    {!badge.earned && <div style={{ fontSize: "10px", color: "#94A3B8" }}>{badge.hint}</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* RECENT LESSONS LOG */}
            <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "25px", boxShadow: Theme.cardShadow }}>
              <h3 style={{ marginTop: 0, fontSize: "24px" }}>Study Log</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {completedChapters.slice(-4).reverse().map((ch, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "15px", padding: "15px", backgroundColor: "#F8FAFC", borderRadius: "15px", border: "1px solid #E2E8F0" }}>
                    <span style={{ fontSize: "24px" }}>{ch.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: "bold" }}>{ch.name}</div>
                      <div style={{ fontSize: "12px", color: Theme.textMuted }}>Level {ch.level} · Mastered on {ch.date}</div>
                    </div>
                    <div style={{ color: "#10B981", fontWeight: "bold" }}>+100 XP</div>
                  </div>
                ))}
                {completedChapters.length === 0 && <p>No lessons completed yet.</p>}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;