import React, { useState, useEffect } from "react";
import { Theme } from "./Theme";
import { speak } from "./speech";

const QuizView = ({ questions, onFinish }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  
  // Highlighting States
  const [highlightIdx, setHighlightIdx] = useState(-1);
  const [isReading, setIsReading] = useState(false);

  const q = questions[currentIdx];
  // Split the question into an array of words for highlighting
  const questionWords = q.question.split(" ");

  // Cleanup speech if component unmounts
  useEffect(() => {
    return () => window.speechSynthesis.cancel();
  }, []);

  const startReading = () => {
    window.speechSynthesis.cancel();
    setIsReading(true);
    setHighlightIdx(-1);

    const utterance = new SpeechSynthesisUtterance(q.question);
    utterance.rate = 0.85; // Slower pace for easier tracking

    // Sync highlight with speech
    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const textUpToBoundary = q.question.substring(0, event.charIndex);
        // Count spaces to find current word index
        const wordIndex = textUpToBoundary.trim().split(/\s+/).length - (textUpToBoundary.trim() === "" ? 1 : 0);
        setHighlightIdx(wordIndex);
      }
    };

    utterance.onend = () => {
      setHighlightIdx(-1);
      setIsReading(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleAnswer = (selectedOption) => {
    window.speechSynthesis.cancel(); // Stop reading if they answer
    const currentQuestion = questions[currentIdx];
    const isCorrect = selectedOption === currentQuestion.answer || 
                      selectedOption === currentQuestion.options[currentQuestion.correct];

    if (isCorrect) setScore(prev => prev + 1);

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
      setHighlightIdx(-1);
      setIsReading(false);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    const passed = score >= 7;
    return (
      <div style={{ textAlign: "center", padding: "60px", fontFamily: Theme.fontFamily }}>
        <h1 style={{ fontSize: "60px" }}>{passed ? "🌟" : "📚"}</h1>
        <h1 style={{ fontSize: "48px", color: passed ? Theme.success : Theme.textMain }}>
          {passed ? "Amazing!" : "Good Effort!"}
        </h1>
        <p style={{ fontSize: "24px", margin: "20px 0", color: Theme.textMuted }}>
          You scored {score} out of {questions.length}
        </p>
        <button 
          onClick={() => onFinish(score)}
          style={{
            padding: "20px 50px", fontSize: "22px", backgroundColor: Theme.accent,
            color: "white", border: "none", borderRadius: "50px", cursor: "pointer", fontWeight: "bold",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
          }}
        >
          {passed ? "Get My Star! →" : "Try Lesson Again"}
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px", fontFamily: Theme.fontFamily }}>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", alignItems: "center" }}>
        <div style={{ fontSize: "18px", color: Theme.textMuted, fontWeight: "bold", letterSpacing: "1px" }}>
          QUESTION {currentIdx + 1} OF {questions.length}
        </div>
        <button 
          onClick={startReading}
          style={{ 
            backgroundColor: isReading ? "#e74c3c" : Theme.accent, 
            color: "white", border: "none", padding: "10px 20px", 
            borderRadius: "12px", cursor: "pointer", fontWeight: "bold",
            display: "flex", alignItems: "center", gap: "8px"
          }}
        >
          {isReading ? "⏹ Stop" : "🔊 Read Question"}
        </button>
      </div>

      {/* QUESTION BOX WITH HIGHLIGHTING */}
      <div style={{ 
        backgroundColor: "#1E293B", color: "white", padding: "45px", 
        borderRadius: "24px", marginBottom: "35px", fontSize: "30px", lineHeight: "1.6",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)", textAlign: "center"
      }}>
        {questionWords.map((word, i) => (
          <span 
            key={i} 
            style={{ 
              backgroundColor: highlightIdx === i ? "#FACC15" : "transparent", // Bright Yellow Highlight
              color: highlightIdx === i ? "#000" : "inherit",
              borderRadius: "6px",
              padding: "2px 4px",
              margin: "0 2px",
              transition: "all 0.1s ease"
            }}
          >
            {word}
          </span>
        ))}
      </div>

      {/* OPTIONS LIST */}
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        {q.options.map((opt, i) => (
          <div key={i} style={{ display: "flex", gap: "12px", alignItems: "stretch" }}>
            <button
              onClick={() => handleAnswer(opt)}
              style={{
                flex: 1, padding: "25px 30px", fontSize: "22px", textAlign: "left",
                backgroundColor: "white", border: "3px solid #E2E8F0",
                borderRadius: "18px", cursor: "pointer", color: Theme.textMain,
                display: "flex", alignItems: "center", transition: "transform 0.1s"
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = Theme.accent}
              onMouseOut={(e) => e.currentTarget.style.borderColor = "#E2E8F0"}
            >
              <span style={{ marginRight: "20px", color: Theme.accent, fontWeight: "900" }}>
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
            </button>
            
            {/* OPTION TTS BUTTON */}
            <button 
              onClick={() => speak(opt)}
              style={{ 
                backgroundColor: "#F1F5F9", border: "none", borderRadius: "18px", 
                width: "70px", cursor: "pointer", fontSize: "24px" 
              }}
              title="Hear Option"
            >
              🗣️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizView;