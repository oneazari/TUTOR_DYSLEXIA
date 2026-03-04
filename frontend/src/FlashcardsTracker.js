<<<<<<< HEAD
import React from "react";
import Flashcards from "./Flashcards";
import useTracker from "./useTracker";

const FlashcardsWrapper = ({ flashcards, onBack }) => {
  // This helps the computer remember which flashcards the student looked at
  const metrics = useTracker("flashcards_session");

  return (
    <Flashcards 
      flashcards={flashcards} 
      onBack={onBack} 
      trackingMetrics={metrics} 
    />
  );
};

export default FlashcardsWrapper;
=======
import React, { useRef, useState } from 'react';

export const FlashcardsWrapper = ({ children, cardId }) => {
    const startTime = useRef(null);

    const handleCardInteraction = (action) => {
        try {
            const duration = startTime.current ? Date.now() - startTime.current : 0;
            
            fetch('http://127.0.0.1:8000/api/log/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    metric: action === 'flip' ? 'cardFlipTime' : 'cardViewTime',
                    value: duration,
                    id: cardId || 'flashcard_' + Date.now(),
                    username: localStorage.getItem('current_user') ? JSON.parse(localStorage.getItem('current_user')).username : 'guest',
                    timestamp: new Date().toISOString()
                })
            }).catch(err => console.error('Failed to log flashcard interaction:', err));
            
            startTime.current = Date.now();
        } catch (err) {
            console.error('Error in flashcard tracking:', err);
        }
    };

    return <div 
        onMouseEnter={() => { startTime.current = Date.now(); }}
        onMouseLeave={() => handleCardInteraction('view')}
        onClick={() => handleCardInteraction('flip')}
        style={{ cursor: 'pointer' }}
    >
        {children}
    </div>;
};
>>>>>>> d3c2a73 (forced save of frontend fixes)
