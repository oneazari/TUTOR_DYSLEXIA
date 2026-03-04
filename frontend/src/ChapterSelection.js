import React from "react";
import { Theme } from "./Theme";
import { useLevelProgress } from "./LevelProgressContext";

const ChapterSelection = ({ subject, chapters, onSelectChapter, onBack, currentLevel }) => {
  const { progress } = useLevelProgress();
  
  // 1. We added "GK" to the list so it can count stars for Level 4!
  const subjects = ["Science", "Math", "English", "GK"];
  
  const totalStars = subjects.reduce((acc, sub) => {
    const scores = Object.values(progress[sub] || {});
    return acc + scores.filter(s => s >= 7).length;
  }, 0);

  // 2. Level 4 has 20 stars total (5 per subject x 4 subjects)
  const goal = currentLevel === 4 ? 20 : 15;
  const percent = Math.min(Math.round((totalStars / goal) * 100), 100);

  // 3. THE SAFETY NET: If chapters are missing, show this instead of crashing!
  if (!chapters) {
    return (
      <div style={{ padding: "40px", textAlign: "center", fontFamily: Theme.fontFamily }}>
        <h2 style={{ color: Theme.textMain }}>Oops! Chapters not found.</h2>
        <p style={{ color: Theme.textMuted }}>Check if the subject name matches in level4Data.js</p>
        <button onClick={onBack} style={{ padding: "10px 20px", cursor: "pointer", borderRadius: "8px" }}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", backgroundColor: Theme.background, minHeight: "100vh", fontFamily: Theme.fontFamily }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        
        <button onClick={onBack} style={{ color: Theme.accent, background: "none", border: "none", cursor: "pointer", fontWeight: "bold", marginBottom: "20px", fontSize: "18px" }}>
          ← Back to Dashboard
        </button>

        {/* PROGRESS BAR */}
        <div style={{ marginBottom: "40px", backgroundColor: "white", padding: "20px", borderRadius: Theme.borderRadius, boxShadow: Theme.cardShadow }}>
           <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ color: Theme.textMuted, fontWeight: "bold" }}>Level {currentLevel} Overall Progress</span>
            <span style={{ fontWeight: "bold", color: "#2ecc71" }}>{totalStars} / {goal} Stars</span>
          </div>
          <div style={{ width: "100%", height: "16px", backgroundColor: "#f0f0f0", borderRadius: "10px", overflow: "hidden" }}>
            <div style={{ width: `${percent}%`, height: "100%", backgroundColor: "#2ecc71", transition: "width 0.8s ease-in-out" }} />
          </div>
        </div>

        <h2 style={{ color: Theme.textMain, marginBottom: "30px", fontSize: "32px" }}>
          Select a <span style={{ color: Theme.accent }}>{subject}</span> Chapter
        </h2>

        <div style={{ display: "flex", gap: "25px", flexWrap: "wrap" }}>
          {chapters.map((ch) => {
            // Check if this specific chapter is finished
            const isDone = (progress[subject] || {})[ch.id] >= 7;
            
            return (
              <button 
                key={ch.id} 
                onClick={() => onSelectChapter(ch)} 
                style={{ 
                  width: "260px", 
                  height: "150px", 
                  borderRadius: Theme.borderRadius, 
                  backgroundColor: isDone ? "#f0fff4" : "white", 
                  border: isDone ? "2px solid #2ecc71" : "none", 
                  boxShadow: Theme.cardShadow, 
                  borderTop: `8px solid ${isDone ? "#2ecc71" : Theme.accent}`, 
                  cursor: "pointer", 
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  padding: "15px"
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                <span style={{ fontSize: "20px", fontWeight: "bold", color: Theme.textMain, textAlign: "center" }}>
                  {ch.title}
                </span>
                
                {isDone && (
                  <div style={{ 
                    position: "absolute", top: "-12px", right: "-12px", 
                    backgroundColor: "#2ecc71", color: "white", borderRadius: "50%", 
                    width: "35px", height: "35px", display: "flex", alignItems: "center", 
                    justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    fontSize: "20px"
                  }}>
                    ⭐
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChapterSelection;