// Lesson.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Flashcards from "./Flashcards";

const Lesson = ({ subject, chapter, onBack, user, onComplete }) => {
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [feedback, setFeedback] = useState("");

  // Fetch lesson from backend
  useEffect(() => {
    setLoading(true);
    setLesson(null);
    setShowFlashcards(false);
    setShowQuiz(false);
    setFeedback("");

    axios
      .get(`http://127.0.0.1:8000/api/lessons/?subject=${subject}`)
      .then((res) => {
        console.log("Fetched lessons:", res.data.lessons);
        const current = res.data.lessons?.find((l) => l.chapter === chapter);
        if (current) setLesson(current);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching lesson:", err);
        setLesson(null);
        setLoading(false);
      });
  }, [subject, chapter]);

  // Handle quiz answer
  const handleAnswer = (option) => {
    if (option === lesson.answer) {
      setFeedback("✅ Correct! Well done!");
      if (!user.completedChapters.includes(chapter)) {
        const updatedChapters = [...user.completedChapters, chapter];
        const newProgress = Math.min(
          Math.round((updatedChapters.length / 10) * 100),
          100
        );
        onComplete(newProgress, updatedChapters);
      }
    } else {
      setFeedback("❌ Almost there! Try again 🌱");
    }
  };

  // Read lesson aloud
  const speakText = () => {
    if (!lesson?.text) return;
    const textToRead = Array.isArray(lesson.text) ? lesson.text.join(". ") : lesson.text;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.85;
    utterance.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  // --- Loading state ---
  if (loading) return <h2>Loading lesson 🌱</h2>;

  // --- No lesson found ---
  if (!lesson) {
    return (
      <div className="lesson-container">
        <h2>Lesson coming soon 🚧</h2>
        <button onClick={onBack} className="secondary-btn">
          ⬅ Back to Chapters
        </button>
      </div>
    );
  }

  // --- Flashcards page ---
  if (showFlashcards) {
    return (
      <Flashcards
        flashcards={lesson.flashcards}
        onBack={() => setShowFlashcards(false)}
      />
    );
  }

  // --- Main lesson UI ---
  return (
    <div className="lesson-container">
      <div className="card">
        <div className="lesson-header">
          <span className="subject-badge">{subject}</span>
          <h1>{chapter}</h1>
        </div>

        {!showQuiz ? (
          <>
            <div className="lesson-text">
              {lesson.text.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>

            <div className="lesson-actions">
              <button className="secondary-btn" onClick={speakText}>
                🔊 Read Aloud
              </button>

              <button
                className="secondary-btn"
                onClick={() => setShowFlashcards(true)}
              >
                🃏 Open Flashcards
              </button>

              <button
                className="primary-btn"
                onClick={() => setShowQuiz(true)}
              >
                🎯 Take Quiz
              </button>
            </div>
          </>
        ) : (
          <div className="quiz-section">
            <h2>{lesson.question}</h2>
            {lesson.options.map((option, idx) => (
              <button
                key={idx}
                className="quiz-btn"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
            <p className="feedback">{feedback}</p>
          </div>
        )}

        <button className="secondary-btn back-btn" onClick={onBack}>
          ⬅ Back to Chapters
        </button>
      </div>
    </div>
  );
};

export default Lesson;