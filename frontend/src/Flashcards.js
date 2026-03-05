import React, { useState } from "react";
import { Theme } from "./Theme"; 
import { speak } from "./speech";

const Flashcards = ({ flashcards, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const speakCurrentSide = (e) => {
    e.stopPropagation();
    const text = isFlipped ? flashcards[currentIndex].word : "Look at the picture and guess!";
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
    if (newFlippedState) {
      speak(flashcards[currentIndex].word);
    }
  };

  return (
    <div style={{ 
      padding: "20px", 
      backgroundColor: Theme.background, 
      minHeight: "100vh",
      fontFamily: Theme.fontFamily,
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <div style={{ width: "100%", maxWidth: "600px" }}>
        
        <button onClick={onBack} style={{ color: Theme.accent, background: "none", border: "none", cursor: "pointer", fontWeight: "bold", marginBottom: "20px", fontSize: "16px" }}>
          ← Back to Lesson
        </button>

        <div style={{ textAlign: "center", marginBottom: "15px", color: Theme.textMuted, fontWeight: "bold" }}>
          Card {currentIndex + 1} of {flashcards.length}
        </div>

        <div 
          onClick={toggleFlip}
          style={{ 
            width: "100%",
            height: "400px",
            backgroundColor: "white",
            borderRadius: Theme.borderRadius || "20px",
            boxShadow: Theme.cardShadow || "0 10px 20px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            textAlign: "center",
            padding: "30px",
            borderTop: `12px solid ${isFlipped ? "#9b59b6" : Theme.accent}`,
            position: "relative"
          }}
        >
          <button 
            onClick={speakCurrentSide}
            style={{ position: "absolute", top: "15px", right: "15px", fontSize: "32px", background: "none", border: "none", cursor: "pointer" }}
          >
            🔊
          </button>

          <div style={{ width: "100%" }}>
            {isFlipped ? (
              <h1 style={{ fontSize: "42px", color: Theme.textMain, margin: 0 }}>
                {flashcards[currentIndex].word}
              </h1>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <img 
                  src={flashcards[currentIndex].img} 
                  alt="flashcard" 
                  style={{ maxHeight: "250px", maxWidth: "100%", borderRadius: "15px", objectFit: "contain" }} 
                />
                <p style={{ marginTop: "20px", color: Theme.textMuted, fontSize: "18px" }}>
                  What is this?
                </p>
              </div>
            )}
          </div>
          
          <div style={{ position: "absolute", bottom: "20px", color: "#ccc", fontSize: "12px" }}>
            TAP TO FLIP 🔄
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px", gap: "15px" }}>
          <button onClick={handlePrev} style={{ flex: 1, padding: "15px", borderRadius: "15px", border: `2px solid ${Theme.accent}`, backgroundColor: "white", color: Theme.accent, fontWeight: "bold", cursor: "pointer" }}>
            ← Previous
          </button>
          <button onClick={handleNext} style={{ flex: 1, padding: "15px", borderRadius: "15px", border: "none", backgroundColor: Theme.accent, color: "white", fontWeight: "bold", cursor: "pointer" }}>
            Next Card →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Flashcards;