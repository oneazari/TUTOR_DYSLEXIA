<<<<<<< HEAD
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
=======
import React, { useRef, useState, useEffect } from 'react';

export const LessonWrapper = ({ children }) => {
    const startTime = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    const startTracking = (wordId) => {
        startTime.current = { time: Date.now(), wordId };
    };

    const stopTracking = () => {
        if (startTime.current) {
            const dwellTime = Date.now() - startTime.current.time;
            
            // Send to Backend with error handling
            fetch('http://127.0.0.1:8000/api/log/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    metric: 'cursorDwellTime',
                    value: dwellTime,
                    id: startTime.current.wordId,
                    username: localStorage.getItem('current_user') ? JSON.parse(localStorage.getItem('current_user')).username : 'guest',
                    timestamp: new Date().toISOString()
                })
            }).catch(err => console.error('Failed to log lesson dwell time:', err));
            startTime.current = null;
        }
    };

    // Wrap children and track word-level interactions
    return <div 
        onMouseEnter={() => startTracking('lesson_word')} 
        onMouseLeave={stopTracking}
        style={{ cursor: 'pointer' }}
    >
        {children}
    </div>;
};
>>>>>>> d3c2a73 (forced save of frontend fixes)
