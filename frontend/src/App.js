import React, { useState } from "react";
import Dashboard from "./Dashboard";
import ChapterSelection from "./ChapterSelection";
import Auth from "./Auth";
import Level2Dashboard from "./level2Dashboard"; 
<<<<<<< HEAD
import Level3Dashboard from "./level3Dashboard"; 
import Level4Dashboard from "./level4Dashboard"; 
import ProfileView from "./ProfileView"; // Added this import
=======
import ProfileView from "./ProfileView";
>>>>>>> d3c2a73 (forced save of frontend fixes)
import { useLevelProgress } from "./LevelProgressContext";
import { lessonsData } from "./lessonsData"; 
import { level2Data } from "./level2Data"; 
import { level3Data } from "./level3Data";
import { level4Data } from "./level4Data";
import { Theme } from "./Theme";
<<<<<<< HEAD
import QuizWrapper from "./QuizTracker";
import LessonWrapper from "./LessonTracker";
import FlashcardsWrapper from "./FlashcardsTracker";


const SuccessScreen = ({ level, onContinue }) => {
  // Level 3 gets a special "Master" look
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
=======

// Fixed Named Imports
import { useTracker } from "./useTracker";
import { QuizWrapper } from "./QuizTracker";
import { LessonWrapper } from "./LessonTracker";
import { FlashcardsWrapper } from "./FlashcardsTracker";

// ... (Keep SuccessScreen and Helper functions as they are) ...
>>>>>>> d3c2a73 (forced save of frontend fixes)

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

<<<<<<< HEAD
  // --- HELPERS ---
// 1. This function is now the "Star Counter" for any level we ask for
const getStarsForLevel = (levelNum) => {
  // Pick the right "book" to count stars from
  let dataToSearch;
  if (levelNum === 1) dataToSearch = lessonsData; // Level 1 Data
  if (levelNum === 2) dataToSearch = level2Data;  // Level 2 Data
  if (levelNum === 3) dataToSearch = level3Data;  // Level 3 Data
  if (levelNum === 4) dataToSearch = level4Data;

  const subjects = ["Science", "Math", "English", "GK"];
  let totalStars = 0;

  subjects.forEach((sub) => {
    if (dataToSearch && dataToSearch[sub]) {
      dataToSearch[sub].forEach((chapter) => {
        // Look at the progress for that specific level's chapters
        const score = (progress[sub] || {})[chapter.id];
        if (score !== null && score >= 7) {
          totalStars++;
        }
      });
    }
  });
  return totalStars;
};

// 2. The Unlock Rules (Only checking the PREVIOUS level)


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
    
    // If they get enough stars (14 or 15), show the trophy screen!
    if (levelStars >= 14 && score >= 7) { 
      if (currentLevel === 1) setPage("level1Success");
      else if (currentLevel === 2) setPage("level2Success");
      else if (currentLevel === 3) setPage("level3Success"); // New Level 3 Trigger
    } else {
      setPage("chapterSelection");
    }
  }
};

  if (!user) return <Auth onLogin={handleLogin} />;
=======
  if (!user) return <Auth onLogin={(userData) => { localStorage.setItem("current_user", JSON.stringify(userData)); setUser(userData); setPage("dashboard"); }} />;
>>>>>>> d3c2a73 (forced save of frontend fixes)

  // This tells the app exactly which book to open based on the level number
const activeDataSource = 
  currentLevel === 4 ? level4Data : 
  currentLevel === 3 ? level3Data : 
  currentLevel === 2 ? level2Data : 
  lessonsData;

  const views = {
<<<<<<< HEAD
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
    level3Success: <SuccessScreen level={3} onContinue={() => { setPage("level3Dashboard"); }} />, // Goes back to dashboard
    
    
    
    chapterSelection: (
  <ChapterSelection 
    subject={subject} 
    currentLevel={currentLevel} 
    chapters={activeDataSource[subject]} 
    onSelectChapter={(ch) => { setChapterData(ch); setPage("lesson"); }} 
    onBack={() => {
      // Go back to the correct dashboard!
      if (currentLevel === 4) setPage("level4Dashboard");
      else if (currentLevel === 3) setPage("level3Dashboard");
      else if (currentLevel === 2) setPage("level2Dashboard");
      else setPage("dashboard");
    }} 
  />
    ),
    /* Inside the 'views' object in App.js */
lesson: chapterData && (
  <LessonWrapper 
    chapter={chapterData} 
    onBack={() => setPage("chapterSelection")} 
    // ADD THESE TWO LINES BELOW:
    onStartQuiz={() => setPage("quiz")} 
    onStartFlashcards={() => setPage("flashcards")}
  />
),
    flashcards: chapterData && <FlashcardsWrapper flashcards={chapterData.flashcards} onBack={() => setPage("lesson")} />,
    quiz: chapterData && <QuizWrapper chapterData={chapterData} onFinish={handleComplete} onBackToLesson={() => setPage("chapterSelection")} />,
=======
    dashboard: <Dashboard user={user} onSelectSubject={(subj) => { setSubject(subj); setPage("chapterSelection"); }} onOpenProfile={() => setPage("profile")} />,
    level2Dashboard: <Level2Dashboard user={user} onSelectSubject={(subj) => { setSubject(subj); setPage("chapterSelection"); }} onBackToLevel1={() => { setCurrentLevel(1); setPage("dashboard"); }} onOpenProfile={() => setPage("profile")} />,
    profile: <ProfileView user={user} progress={progress} onBack={() => setPage(currentLevel === 2 ? "level2Dashboard" : "dashboard")} />,
    chapterSelection: <ChapterSelection subject={subject} currentLevel={currentLevel} chapters={activeDataSource[subject]} onSelectChapter={(ch) => { setChapterData(ch); setPage("lesson"); }} onBack={() => setPage(currentLevel === 2 ? "level2Dashboard" : "dashboard")} />,
    lesson: chapterData && <LessonWrapper><LessonView chapter={chapterData} onBack={() => setPage("chapterSelection")} /></LessonWrapper>,
    flashcards: chapterData && <FlashcardsWrapper><Flashcards flashcards={chapterData.flashcards} onBack={() => setPage("lesson")} /></FlashcardsWrapper>,
    quiz: chapterData && <QuizWrapper><Quiz chapterData={chapterData} onFinish={(score) => { markModuleComplete(subject, chapterData.id, score); setPage("chapterSelection"); }} onBackToLesson={() => setPage("chapterSelection")} /></QuizWrapper>,
>>>>>>> d3c2a73 (forced save of frontend fixes)
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: Theme.background, fontFamily: Theme.fontFamily }}>
      <div style={{ width: "280px", backgroundColor: "#1E293B", color: "white", display: "flex", flexDirection: "column", padding: "30px 20px" }}>
<<<<<<< HEAD
        
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
          {[1, 2, 3, 4, 5].map((lvl) => {
            const isComingSoon = lvl === 5;
            const unlocked = lvl === 1 || 
                  (lvl === 2 && isLevel2Unlocked()) || 
                  (lvl === 3 && isLevel3Unlocked()) ||
                  (lvl === 4 ||lvl <= 3);

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
        backgroundColor: currentLevel === lvl ? "#f1f5f9" : "transparent",
        opacity: unlocked || isComingSoon ? 1 : 0.5, // Fades out locked levels
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
=======
        <h2 style={{ fontSize: "20px", marginBottom: "30px", textAlign: "center", color: Theme.accent }}>MY ACADEMY</h2>
        <nav style={{ flex: 1 }}>
          {[1, 2].map((lvl) => (
            <div key={lvl} onClick={() => { setCurrentLevel(lvl); setPage(lvl === 1 ? "dashboard" : "level2Dashboard"); }} style={{ padding: "18px", marginBottom: "12px", borderRadius: "12px", cursor: "pointer", backgroundColor: currentLevel === lvl ? Theme.accent : "transparent" }}>
              Level {lvl}
            </div>
          ))}
>>>>>>> d3c2a73 (forced save of frontend fixes)
        </nav>
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {views[page] || <div>Loading...</div>}
      </div>
    </div>
  );
} // Fixed closing brace

export default App;