import React, { useState } from "react";
import { Theme } from "./Theme";
import { speak } from "./speech";

const Flashcards = ({ flashcards, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Helper to speak current side
  const speakCurrentSide = (e) => {
    e.stopPropagation(); // Prevents the card from flipping when clicking the speaker
    const text = isFlipped ? flashcards[currentIndex].back : flashcards[currentIndex].front;
    speak(text);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const toggleFlip = () => {
    const newFlippedState = !isFlipped;
    setIsFlipped(newFlippedState);
    
    // AUTO-SPEAK: Read the answer (back) automatically when flipped open
    if (newFlippedState) {
      speak(flashcards[currentIndex].back);
    }
  };

  return (
    <div style={{ 
      padding: "40px", 
      backgroundColor: Theme.background, 
      minHeight: "100vh",
      fontFamily: Theme.fontFamily,
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <div style={{ width: "100%", maxWidth: "800px" }}>
        <button onClick={onBack} style={{ color: Theme.accent, background: "none", border: "none", cursor: "pointer", fontWeight: "bold", marginBottom: "30px" }}>
          ← Back to Lesson
        </button>

        <div style={{ textAlign: "center", marginBottom: "20px", color: Theme.textMuted, fontWeight: "bold" }}>
          Card {currentIndex + 1} of {flashcards.length}
        </div>

        {/* THE MAIN FLASHCARD */}
        <div 
          onClick={toggleFlip}
          style={{ 
            width: "100%",
            height: "350px",
            backgroundColor: "white",
            borderRadius: Theme.borderRadius,
            boxShadow: Theme.cardShadow,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            textAlign: "center",
            padding: "40px",
            borderTop: `10px solid ${isFlipped ? "#9b59b6" : Theme.accent}`,
            position: "relative"
          }}
        >
          {/* TTS BUTTON - Top Right */}
          <button 
            onClick={speakCurrentSide}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              fontSize: "30px",
              background: "none",
              border: "none",
              cursor: "pointer"
            }}
            title="Listen"
          >
            🔊
          </button>

          <div style={{ fontSize: "32px", color: Theme.textMain, fontWeight: "bold", lineHeight: "1.4" }}>
            {isFlipped ? flashcards[currentIndex].back : flashcards[currentIndex].front}
          </div>
          
          <div style={{ position: "absolute", bottom: "20px", color: Theme.textMuted, fontSize: "14px" }}>
            Click to flip 🔄
          </div>
        </div>

        {/* CONTROLS */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "40px", gap: "20px" }}>
          <button onClick={handlePrev} style={{ flex: 1, padding: "15px", borderRadius: "12px", border: `2px solid ${Theme.accent}`, backgroundColor: "white", color: Theme.accent, fontWeight: "bold", cursor: "pointer" }}>
            Previous
          </button>
          <button onClick={handleNext} style={{ flex: 1, padding: "15px", borderRadius: "12px", border: "none", backgroundColor: Theme.accent, color: "white", fontWeight: "bold", cursor: "pointer" }}>
            Next Card →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Flashcards;