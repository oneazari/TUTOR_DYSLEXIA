import React from "react";
import LessonView from "./LessonView";
import useTracker from "./useTracker";

/* Inside LessonTracker.js */
const LessonWrapper = ({ chapter, onBack, onStartQuiz, onStartFlashcards }) => {
  const metrics = useTracker(chapter.id);

  return (
    <LessonView 
      chapter={chapter} 
      onBack={onBack} 
      onStartQuiz={onStartQuiz} 
      onStartFlashcards={onStartFlashcards}
      // ADD THIS LINE BELOW TO USE THE METRICS:
      trackingMetrics={metrics} 
    />
  );
};

export default LessonWrapper;