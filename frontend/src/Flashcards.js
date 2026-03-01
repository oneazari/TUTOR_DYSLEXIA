import React, { useState } from 'react';
import './Flashcards.css';

const Flashcards = ({ onBack, flashcards }) => {
  const [index, setIndex] = useState(0);

  const flashcardData = flashcards && flashcards.length > 0
    ? flashcards
    : [
        { word: "Apple", emoji: "🍎", phonetic: "ap-puhl" },
        { word: "Cat", emoji: "🐱", phonetic: "kat" },
        { word: "Sun", emoji: "☀️", phonetic: "suhn" },
        { word: "Tree", emoji: "🌳", phonetic: "tree" }
      ];

  const playSound = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const nextCard = () => setIndex(i => (i < flashcardData.length - 1 ? i + 1 : 0));
  const prevCard = () => setIndex(i => (i > 0 ? i - 1 : flashcardData.length - 1));

  const current = flashcardData[index];

  return (
    <div className="flashcard-container">
      <button className="back-btn" onClick={onBack}>⬅ Back to Lesson</button>
      
      <div className="flashcard-box">
        <p className="card-counter">Card {index + 1} of {flashcardData.length}</p>
        <div className="card-emoji">{current.emoji}</div>
        <h2 className="card-word">{current.word}</h2>
        <p className="card-phonetic">[{current.phonetic}]</p>

        <button className="action-btn" onClick={() => playSound(current.word)}>🔊 Listen</button>

        <div className="card-nav">
          <button className="prev-btn" onClick={prevCard}>⬅ Previous</button>
          <button className="next-btn" onClick={nextCard}>Next ➡</button>
        </div>
      </div>
    </div>
  );
};

export default Flashcards;