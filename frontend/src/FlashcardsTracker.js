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