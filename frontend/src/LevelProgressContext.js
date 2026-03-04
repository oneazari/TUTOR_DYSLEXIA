import React, { createContext, useContext, useState } from "react";
// 1. Make sure you import your data files here!
import { lessonsData } from "./lessonsData";
import { level2Data } from "./level2Data";
import { level3Data } from "./level3Data";

const LevelProgressContext = createContext();

export const LevelProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(() => {
    const currentUser = JSON.parse(localStorage.getItem("current_user"));
    if (currentUser) {
      const allUsers = JSON.parse(localStorage.getItem("tutor_users") || "{}");
      return allUsers[currentUser.username]?.progress || { Science: {}, Math: {}, English: {} };
    }
    return { Science: {}, Math: {}, English: {} };
  });

  // 2. The "Star Counter" that knows how to check specific levels
  const getStarsForLevel = (levelNum) => {
    let dataToSearch;
    if (levelNum === 1) dataToSearch = lessonsData;
    if (levelNum === 2) dataToSearch = level2Data;
    if (levelNum === 3) dataToSearch = level3Data;

    const subjects = ["Science", "Math", "English"];
    let count = 0;

    subjects.forEach((sub) => {
      if (dataToSearch && dataToSearch[sub]) {
        dataToSearch[sub].forEach((chapter) => {
          const score = (progress[sub] || {})[chapter.id];
          if (score !== null && score >= 7) count++;
        });
      }
    });
    return count;
  };

  const markModuleComplete = (subject, moduleId, score) => {
    const currentUser = JSON.parse(localStorage.getItem("current_user"));
    if (!currentUser) return;

    setProgress((prev) => {
      const newProgress = {
        ...prev,
        [subject]: { ...prev[subject], [moduleId]: score },
      };

      const allUsers = JSON.parse(localStorage.getItem("tutor_users") || "{}");
      if (allUsers[currentUser.username]) {
        allUsers[currentUser.username].progress = newProgress;
        localStorage.setItem("tutor_users", JSON.stringify(allUsers));
      }
      return newProgress;
    });
  };

  // 3. The Rules: Level 2 needs Level 1 stars, Level 3 needs Level 2 stars
  //const isLevel2Unlocked = () => getStarsForLevel(1) >= 15;
 // const isLevel3Unlocked = () => getStarsForLevel(2) >= 15;
const isLevel2Unlocked = () => true;
  const isLevel3Unlocked = () => true;
  return (
    <LevelProgressContext.Provider 
      value={{ 
        progress, 
        markModuleComplete, 
        isLevel2Unlocked, 
        isLevel3Unlocked ,
        getStarsForLevel
      }}
    >
      {children}
    </LevelProgressContext.Provider>
  );
};

export const useLevelProgress = () => useContext(LevelProgressContext);