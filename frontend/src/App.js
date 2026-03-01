import React, { useState } from "react";
import Dashboard from "./Dashboard";
import ChapterSelection from "./ChapterSelection";
import LessonView from "./LessonView"; 
import Flashcards from "./Flashcards";
import Quiz from "./Quiz"; 
import Auth from "./Auth";
import Level2Dashboard from "./level2Dashboard"; 
import ProfileView from "./ProfileView"; // Added this import
import { useLevelProgress } from "./LevelProgressContext";
import { lessonsData } from "./lessonsData"; 
import { level2Data } from "./level2Data"; 
import { Theme } from "./Theme";

const SuccessScreen = ({ level, onContinue }) => (
  <div style={{ 
    display: "flex", justifyContent: "center", alignItems: "center", 
    height: "100vh", backgroundColor: Theme.background, textAlign: "center", padding: "20px" 
  }}>
    <div style={{ 
      backgroundColor: "white", padding: "60px", borderRadius: Theme.borderRadius, 
      boxShadow: Theme.cardShadow, maxWidth: "600px", border: `8px solid ${Theme.success}` 
    }}>
      <div style={{ fontSize: "80px", marginBottom: "20px" }}>{level === 2 ? "🎖️" : "🏆"}</div>
      <h1 style={{ fontSize: "42px", color: Theme.textMain, fontFamily: Theme.fontFamily }}>Level {level} Mastered!</h1>
      <p style={{ fontSize: "22px", color: Theme.textMuted, marginBottom: "40px", fontFamily: Theme.fontFamily }}>
        Incredible work! You have collected all 15 stars.
      </p>
      <button 
        onClick={onContinue}
        style={{ 
          backgroundColor: Theme.success, color: "white", padding: "20px 50px", 
          borderRadius: "50px", border: "none", fontSize: "24px", fontWeight: "bold", cursor: "pointer"
        }}
      >
        Continue to Next Level →
      </button>
    </div>
  </div>
);

function App() {
  const { markModuleComplete, progress, isLevel2Unlocked } = useLevelProgress();
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("current_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [page, setPage] = useState(() => localStorage.getItem("current_page") || "dashboard");
  const [subject, setSubject] = useState(() => localStorage.getItem("current_subject") || null);
  const [currentLevel, setCurrentLevel] = useState(() => parseInt(localStorage.getItem("current_level")) || 1);
  const [chapterData, setChapterData] = useState(() => {
    const saved = localStorage.getItem("current_chapter_data");
    return saved ? JSON.parse(saved) : null;
  });

  // --- HELPERS ---
  const getStarsForLevel = (levelNum) => {
    const data = levelNum === 2 ? level2Data : lessonsData; 
    const subjects = ["Science", "Math", "English"];
    let count = 0;
    subjects.forEach((sub) => {
      if (data[sub]) {
        data[sub].forEach((chapter) => {
          const score = (progress[sub] || {})[chapter.id];
          if (score !== null && score >= 7) count++;
        });
      }
    });
    return count;
  };

  const isLevel3Unlocked = () => getStarsForLevel(2) >= 15;

  const handleLogin = (userData) => {
    localStorage.setItem("current_user", JSON.stringify(userData));
    setUser(userData);
    setPage("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("current_user");
    setUser(null);
    setPage("dashboard");
  };

  const handleComplete = (score) => {
    if (subject && chapterData) {
      markModuleComplete(subject, chapterData.id, score);
      const levelStars = getStarsForLevel(currentLevel);
      if (levelStars >= 14 && score >= 7) { 
        setPage(currentLevel === 1 ? "level1Success" : "level2Success");
      } else {
        setPage("chapterSelection");
      }
    }
  };

  if (!user) return <Auth onLogin={handleLogin} />;

  const activeDataSource = currentLevel === 2 ? level2Data : lessonsData;

  const views = {
    dashboard: (
      <Dashboard 
        user={user} 
        onSelectSubject={(subj) => { setSubject(subj); setPage("chapterSelection"); }} 
        onOpenProfile={() => setPage("profile")} 
      />
    ),
    level2Dashboard: (
      <Level2Dashboard 
        user={user} 
        onSelectSubject={(subj) => { setSubject(subj); setPage("chapterSelection"); }} 
        onBackToLevel1={() => { setCurrentLevel(1); setPage("dashboard"); }} 
        onOpenProfile={() => setPage("profile")} 
      />
    ),
    profile: (
      <ProfileView 
        user={user} 
        progress={progress} 
        onBack={() => setPage(currentLevel === 2 ? "level2Dashboard" : "dashboard")} 
      />
    ),
    level1Success: <SuccessScreen level={1} onContinue={() => { setCurrentLevel(2); setPage("level2Dashboard"); }} />,
    level2Success: <SuccessScreen level={2} onContinue={() => { setCurrentLevel(3); setPage("level2Dashboard"); }} />,
    chapterSelection: <ChapterSelection subject={subject} currentLevel={currentLevel} chapters={activeDataSource[subject]} onSelectChapter={(ch) => { setChapterData(ch); setPage("lesson"); }} onBack={() => setPage(currentLevel === 2 ? "level2Dashboard" : "dashboard")} />,
    lesson: chapterData && <LessonView chapter={chapterData} onBack={() => setPage("chapterSelection")} onStartFlashcards={() => setPage("flashcards")} onStartQuiz={() => setPage("quiz")} />,
    flashcards: chapterData && <Flashcards flashcards={chapterData.flashcards} onBack={() => setPage("lesson")} />,
    quiz: chapterData && <Quiz questions={chapterData.test} onFinish={handleComplete} onBackToLesson={() => setPage("chapterSelection")} />
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: Theme.background, fontFamily: Theme.fontFamily }}>
      
      {/* SIDEBAR */}
      <div style={{ width: "280px", backgroundColor: "#1E293B", color: "white", display: "flex", flexDirection: "column", padding: "30px 20px" }}>
        
        {/* SIDEBAR PROFILE SECTION */}
        <div 
          onClick={() => setPage("profile")}
          style={{ 
            display: "flex", alignItems: "center", gap: "15px", padding: "15px", 
            backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "15px", 
            marginBottom: "30px", border: "1px solid rgba(255,255,255,0.1)",
            cursor: "pointer"
          }}
        >
          <div style={{ 
            fontSize: "35px", backgroundColor: "white", width: "55px", height: "55px", 
            display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%" 
          }}>
            {user.avatar || "👤"}
          </div>
          <div style={{ textAlign: "left", overflow: "hidden" }}>
            <div style={{ fontSize: "16px", fontWeight: "bold", color: "#F8FAFC", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {user.username}
            </div>
            <div style={{ fontSize: "12px", color: Theme.accent, fontWeight: "600" }}>
              View Profile
            </div>
          </div>
        </div>

        <h2 style={{ fontSize: "20px", marginBottom: "30px", textAlign: "center", color: Theme.accent, letterSpacing: "1px" }}>MY ACADEMY</h2>
        
        <nav style={{ flex: 1 }}>
          {[1, 2, 3].map((lvl) => {
            let unlocked = lvl === 1 || (lvl === 2 && isLevel2Unlocked()) || (lvl === 3 && isLevel3Unlocked());
            const active = currentLevel === lvl;

            return (
              <div 
                key={lvl}
                onClick={() => { if (unlocked) { setCurrentLevel(lvl); setPage(lvl === 1 ? "dashboard" : "level2Dashboard"); }}}
                style={{
                  padding: "18px", marginBottom: "12px", borderRadius: "12px",
                  cursor: unlocked ? "pointer" : "not-allowed",
                  backgroundColor: active ? Theme.accent : "transparent",
                  opacity: unlocked ? 1 : 0.4,
                  border: active ? "none" : "1px solid #334155",
                  transition: "all 0.2s ease"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "18px", fontWeight: "bold" }}>Level {lvl}</span>
                  <span>{unlocked ? "🔓" : "🔒"}</span>
                </div>
              </div>
            );
          })}
        </nav>

        <button onClick={handleLogout} style={{ padding: "12px", background: "none", color: "#F87171", border: "2px solid #F87171", borderRadius: "12px", cursor: "pointer", fontWeight: "bold" }}>
          Sign Out
        </button>
      </div>

      {/* MAIN CONTENT AREA */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {views[page] || <div style={{ padding: "50px", textAlign: "center" }}>Loading adventure...</div>}
      </div>
    </div>
  );
}

export default App;