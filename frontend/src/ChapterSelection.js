// src/ChapterSelection.js
import React from "react";
import "./ChapterSelection.css";

const ChapterSelection = ({ subject, onSelectChapter, onBack }) => {
  const chapterData = {
    Science: ["Living and Non-Living Things", "Human Body", "Plants Around Us", "Solar System", "States of Matter"],
    Maths: ["Numbers and Counting", "Addition and Subtraction", "Multiplication Basics", "Fractions", "Shapes and Geometry"],
    English: ["Alphabet A", "Nouns and Pronouns", "Verbs and Tenses", "Sentence Formation", "Reading Comprehension"],
  };

  const chapters = chapterData[subject] || [];

  return (
    <div className="chapter-container">
      <div className="card">
        <h1>{subject} – Choose a Chapter</h1>
        {chapters.map((ch, idx) => (
          <button key={idx} className="primary-btn chapter-btn" onClick={() => onSelectChapter(ch)}>
            📘 Chapter {idx + 1}: {ch}
          </button>
        ))}
        <button className="secondary-btn back-btn" onClick={onBack}>
          ⬅ Back to Subjects
        </button>
      </div>
    </div>
  );
};

export default ChapterSelection;