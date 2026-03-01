// src/App.js
import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import ChapterSelection from "./ChapterSelection";
import Lesson from "./Lesson";
import Auth from "./Auth";

function App() {
  const [user, setUser] = useState(null);
  const [subject, setSubject] = useState(null);
  const [chapter, setChapter] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogin = (userData) => {
    const newUser = {
      ...userData,
      progress: userData.progress || 0,
      completedChapters: userData.completedChapters || [],
    };
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setSubject(null);
    setChapter(null);
  };

  const handleComplete = (newProgress, updatedChapters) => {
    const updatedUser = { ...user, progress: newProgress, completedChapters: updatedChapters };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  // Screens
  if (!user) return <Auth onLogin={handleLogin} />;

  if (!subject)
    return <Dashboard user={user} onSelectSubject={setSubject} onLogout={handleLogout} />;

  if (subject && !chapter)
    return <ChapterSelection subject={subject} onSelectChapter={setChapter} onBack={() => setSubject(null)} />;

  return (
    <Lesson
      subject={subject}
      chapter={chapter}
      user={user}
      onBack={() => setChapter(null)}
      onComplete={handleComplete}
    />
  );
}

export default App;