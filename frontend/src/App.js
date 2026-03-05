import React, { useState } from "react";
import Dashboard from "./Dashboard";
import ChapterSelection from "./ChapterSelection";
import Auth from "./Auth";
import Level2Dashboard from "./level2Dashboard"; 
import Level3Dashboard from "./level3Dashboard"; 
import Level4Dashboard from "./level4Dashboard"; 
import ProfileView from "./ProfileView"; 

import { useLevelProgress } from "./LevelProgressContext";
import { lessonsData } from "./lessonsData"; 
import { level2Data } from "./level2Data"; 
import { level3Data } from "./level3Data";
import { level4Data } from "./level4Data";
import { Theme } from "./Theme";

import QuizWrapper from "./QuizTracker";
import LessonWrapper from "./LessonTracker";
import FlashcardsWrapper from "./FlashcardsTracker";

const SuccessScreen = ({ level, onContinue }) => {
  const isLevel3 = level === 3;
  const mainColor = isLevel3 ? "#8e44ad" : Theme.success;
  const medal = isLevel3 ? "👑" : (level === 2 ? "🎖️" : "🏆");
  const title = isLevel3 ? "Grand Master Accomplished!" : `Level ${level} Mastered!`;

  return (
    <div style={{ 
      display: "flex", justifyContent: "center", alignItems: "center", 
      height: "100vh", backgroundColor: Theme.background, textAlign: "center", padding: "20px" 
    }}>
      <div style={{ 
        backgroundColor: "white", padding: "60px", borderRadius: Theme.borderRadius, 
        boxShadow: Theme.cardShadow, maxWidth: "600px", border: `8px solid ${mainColor}` 
      }}>
        <div style={{ fontSize: "100px", marginBottom: "20px" }}>{medal}</div>
        <h1 style={{ fontSize: "42px", color: Theme.textMain, fontFamily: Theme.fontFamily }}>{title}</h1>
        <p style={{ fontSize: "22px", color: Theme.textMuted, marginBottom: "40px", fontFamily: Theme.fontFamily }}>
          {isLevel3 
            ? "You have completed the highest level of the Academy! You are a true genius." 
            : "Incredible work! You have collected all 15 stars."}
        </p>
        <button 
          onClick={onContinue}
          style={{ 
            backgroundColor: mainColor, color: "white", padding: "20px 50px", 
            borderRadius: "50px", border: "none", fontSize: "24px", fontWeight: "bold", cursor: "pointer"
          }}
        >
          {isLevel3 ? "Back to Dashboard" : "Continue to Next Level →"}
        </button>
      </div>
    </div>
  );
};

function App() {
  const { markModuleComplete, progress, isLevel2Unlocked, isLevel3Unlocked } = useLevelProgress();
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

  const getStarsForLevel = (levelNum) => {
    let dataToSearch;
    if (levelNum === 1) dataToSearch = lessonsData;
    if (levelNum === 2) dataToSearch = level2Data;
    if (levelNum === 3) dataToSearch = level3Data;
    if (levelNum === 4) dataToSearch = level4Data;

    const subjects = ["Science", "Math", "English", "GK"];
    let totalStars = 0;

    subjects.forEach((sub) => {
      if (dataToSearch && dataToSearch[sub]) {
        dataToSearch[sub].forEach((chapter) => {
          const score = (progress[sub] || {})[chapter.id];
          if (score !== null && score >= 7) {
            totalStars++;
          }
        });
      }
    });
    return totalStars;
  };

  const handleLogin = async (userData) => {
    // 🕵️ Step 1: Figure out if userData is a string or an object
    console.log("🕵️ What did the Auth component send me?", userData);

    const nameToSubmit = typeof userData === 'string' ? userData : userData.username;
    
    // 🔍 ADD THIS LOG TOO!
    console.log("📦 What am I putting in the username envelope?", nameToSubmit);
    
    
    const finalUsername = typeof userData === 'object' ? userData.username : userData;

    console.log("📤 Sending to Django:", finalUsername); // Check your browser console for this!

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: nameToSubmit }) 
      });

      const dataFromMongo = await response.json();

      if (response.ok) {
        localStorage.setItem("current_user", JSON.stringify(dataFromMongo));
        setUser(dataFromMongo);
        setPage("dashboard");
      } else {
        console.error("❌ Django rejected the login:", dataFromMongo);
      }
    } catch (error) {
      console.error("❌ Network Error:", error);
      // Even if it fails, we keep you logged in for testing
      setUser({ username: finalUsername, level: "Level 1", stars: 0 });
      setPage("dashboard");
    }
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
        if (currentLevel === 1) setPage("level1Success");
        else if (currentLevel === 2) setPage("level2Success");
        else if (currentLevel === 3) setPage("level3Success");
      } else {
        setPage("chapterSelection");
      }
    }
  };

  if (!user) return <Auth onLogin={handleLogin} />;

  const activeDataSource = 
    currentLevel === 4 ? level4Data : 
    currentLevel === 3 ? level3Data : 
    currentLevel === 2 ? level2Data : 
    lessonsData;

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
    level3Dashboard: (
      <Level3Dashboard 
        user={user} 
        onSelectSubject={(subj) => { setSubject(subj); setPage("chapterSelection"); }} 
        onBackToLevel1={() => { setCurrentLevel(1); setPage("dashboard"); }} 
      />
    ),
    level4Dashboard: (
      <Level4Dashboard 
        user={user} 
        onSelectSubject={(subj) => { setSubject(subj); setPage("chapterSelection"); }} 
        onBackToLevel3={() => { setCurrentLevel(3); setPage("level3Dashboard"); }} 
      />
    ),
    level5ComingSoon: (
      <div style={{ 
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", 
        height: "100vh", backgroundColor: "#1e293b", textAlign: "center", color: "white" 
      }}>
        <div style={{ fontSize: "100px", marginBottom: "20px" }}>🚀</div>
        <h1 style={{ fontSize: "48px", fontFamily: Theme.fontFamily }}>Level 5: The Diamond Frontier</h1>
        <p style={{ fontSize: "24px", color: "#94a3b8", maxWidth: "600px" }}>
          Great job, Master Learner! You have conquered all current levels. 
          Level 5 is currently being built by our scientists. Check back soon!
        </p>
        <button 
          onClick={() => setPage("level4Dashboard")}
          style={{ 
            marginTop: "30px", padding: "15px 40px", borderRadius: "30px", 
            border: "none", backgroundColor: "#38bdf8", color: "white", 
            fontSize: "20px", fontWeight: "bold", cursor: "pointer" 
          }}
        >
          Back to Level 4
        </button>
      </div>
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
    level3Success: <SuccessScreen level={3} onContinue={() => { setPage("level3Dashboard"); }} />,
    chapterSelection: (
      <ChapterSelection 
        subject={subject} 
        currentLevel={currentLevel} 
        chapters={activeDataSource[subject]} 
        onSelectChapter={(ch) => { setChapterData(ch); setPage("lesson"); }} 
        onBack={() => {
          if (currentLevel === 4) setPage("level4Dashboard");
          else if (currentLevel === 3) setPage("level3Dashboard");
          else if (currentLevel === 2) setPage("level2Dashboard");
          else setPage("dashboard");
        }} 
      />
    ),
    lesson: chapterData && (
      <LessonWrapper 
        chapter={chapterData} 
        onBack={() => setPage("chapterSelection")} 
        onStartQuiz={() => setPage("quiz")} 
        onStartFlashcards={() => setPage("flashcards")}
      />
    ),
    flashcards: chapterData && <FlashcardsWrapper flashcards={chapterData.flashcards} onBack={() => setPage("lesson")} />,
    quiz: (chapterData && chapterData.questions) ? (
  <QuizWrapper 
    chapterData={chapterData} 
    onFinish={handleComplete} 
    onBackToLesson={() => setPage("chapterSelection")} 
  />
) : (
  <div style={{ padding: "50px", textAlign: "center" }}>
    <h2>Searching for your questions... 🔍</h2>
    <button onClick={() => setPage("chapterSelection")}>Go Back and Try Again</button>
  </div>
),
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: Theme.background, fontFamily: Theme.fontFamily }}>
      <div style={{ width: "280px", backgroundColor: "#1E293B", color: "white", display: "flex", flexDirection: "column", padding: "30px 20px" }}>
        
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
        
          <button 
  onClick={handleLogout}
  style={{
    marginBottom: "20px",
    padding: "10px",
    backgroundColor: "transparent",
    color: "#ef4444", // Red color for logout
    border: "1px solid #ef4444",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  }}
>
  Logout 🏃💨
</button>



        <nav style={{ flex: 1 }}>
          {[1, 2, 3, 4, 5].map((lvl) => {
            const isComingSoon = lvl === 5;
            const unlocked = lvl === 1 || 
                  (lvl === 2 && isLevel2Unlocked()) || 
                  (lvl === 3 && isLevel3Unlocked()) ||
                  (lvl === 4 || lvl <= 3);

            return (
              <div 
                key={lvl}
                onClick={() => {
                  if (isComingSoon) {
                    setPage("level5ComingSoon");
                  } else if (unlocked) {
                    setCurrentLevel(lvl);
                    if (lvl === 1) setPage("dashboard");
                    else if (lvl === 2) setPage("level2Dashboard");
                    else if (lvl === 3) setPage("level3Dashboard");
                    else if (lvl === 4) setPage("level4Dashboard");
                  }
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px",
                  margin: "8px 0",
                  borderRadius: "8px",
                  cursor: unlocked || isComingSoon ? "pointer" : "not-allowed",
                  backgroundColor: currentLevel === lvl ? "rgba(255,255,255,0.1)" : "transparent",
                  opacity: unlocked || isComingSoon ? 1 : 0.5,
                }}
              >
                <span style={{ fontSize: "20px", marginRight: "10px" }}>
                  {isComingSoon ? "🚀" : (unlocked ? "🔓" : "🔒")}
                </span>
                <span style={{ fontWeight: "bold" }}>
                  Level {lvl} {isComingSoon && "(Soon!)"}
                </span>
              </div>
            );
          })}
        </nav>
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {views[page] || <div>Loading...</div>}
      </div>
    </div>
  );
} 

export default App;