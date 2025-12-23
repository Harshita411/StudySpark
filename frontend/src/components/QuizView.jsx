import React, { useState } from 'react';
import { saveQuizAttempt } from '../services/quizService.js';

const QuizView = ({ questions, quizTitle = "Generated Quiz", isReviewMode = false, initialAnswers = {} }) => {
    const [selectedAnswers, setSelectedAnswers] = useState(initialAnswers);
    const [isSubmitted, setIsSubmitted] = useState(isReviewMode);
    const [saveStatus, setSaveStatus] = useState('');

    if (!questions || questions.length === 0) return null;

    const handleSelectAnswer = (qIndex, oIndex) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [qIndex]: oIndex
        });
    };

    const handleSubmit = () => setIsSubmitted(true);

    const handleSave = async () => {
        setSaveStatus('Saving...');
        const attemptData = {
            quizTitle,
            questions: questions.map((q, qIndex) => ({
                ...q,
                userAnswerIndex: selectedAnswers[qIndex] ?? -1
            }))
        };
        try {
            await saveQuizAttempt(attemptData);
            setSaveStatus('Saved successfully!');
        } catch (error) {
            setSaveStatus('Failed to save.');
            console.error("Failed to save quiz:", error);
        }
    };

    // --- THIS IS THE KEY CHANGE ---
    // This function now correctly determines the class for each option.
    const getOptionClass = (qIndex, oIndex) => {
        if (!isSubmitted) return ''; // No styling before submission.

        const isCorrect = questions[qIndex].correctAnswerIndex === oIndex;
        const isSelected = selectedAnswers[qIndex] === oIndex;

        // Always highlight the correct answer in green.
        if (isCorrect) {
            return 'correct-answer';
        }
        // If this option was selected by the user AND it was wrong, highlight it in red.
        if (isSelected && !isCorrect) {
            return 'incorrect-answer';
        }
        
        return ''; // No special style for other options.
    };

    return (
        <div className="card">
            <h3>{quizTitle}</h3>
            {questions.map((q, qIndex) => (
                <div key={qIndex} className="quiz-question">
                    <p><strong>{qIndex + 1}. {q.question}</strong></p>
                    <ul>
                        {q.options.map((option, oIndex) => (
                            <li
                                key={oIndex}
                                className={`quiz-option ${getOptionClass(qIndex, oIndex)}`}
                                onClick={() => !isSubmitted && handleSelectAnswer(qIndex, oIndex)}
                            >
                                <input
                                    type="radio"
                                    name={`q${qIndex}`}
                                    checked={selectedAnswers[qIndex] === oIndex}
                                    disabled={isSubmitted}
                                    readOnly
                                />
                                {option}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            {!isReviewMode && (
                <div className="quiz-actions">
                    {!isSubmitted && Object.keys(selectedAnswers).length === questions.length && (
                        <button onClick={handleSubmit}>Submit Quiz</button>
                    )}
                    {isSubmitted && <button onClick={handleSave} disabled={!!saveStatus}>{saveStatus || 'Save Quiz Attempt'}</button>}
                </div>
            )}
        </div>
    );
};

export default QuizView;