import React, { useRef } from 'react';

// Use 'export const' so App.js can find it with { QuizWrapper }
export const QuizWrapper = ({ children, questionId }) => {
    const questionStartTime = useRef(null);
    const clickStartTime = useRef(null);

    const handleQuestionStart = () => {
        questionStartTime.current = Date.now();
    };

    const handleAnswerClick = async (e) => {
        if (!questionStartTime.current) return;
        
        const clickLatency = Date.now() - questionStartTime.current;
        
        try {
            await fetch('http://127.0.0.1:8000/api/log/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: localStorage.getItem('current_user') ? JSON.parse(localStorage.getItem('current_user')).username : 'guest',
                    metric: 'clickLatency',
                    value: clickLatency,
                    id: questionId || 'quiz_' + Date.now(),
                    timestamp: new Date().toISOString()
                })
            });
        } catch (err) {
            console.error("Failed to log quiz data:", err);
        }
        
        questionStartTime.current = null;
    };

    return (
        <div 
            onMouseEnter={handleQuestionStart}
            onClick={handleAnswerClick}
            style={{ cursor: 'pointer' }}
        >
            {children}
        </div>
    );
};