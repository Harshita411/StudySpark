// import React, { useState, useEffect } from 'react';
// import { getQuizHistory } from '../services/quizService.js';
// import QuizView from '../components/QuizView.jsx';

// const QuizHistory = () => {
//     const [history, setHistory] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [expandedId, setExpandedId] = useState(null);

//     useEffect(() => {
//         const fetchHistory = async () => {
//             try {
//                 const data = await getQuizHistory();
//                 setHistory(data);
//             } catch (error) {
//                 console.error("Failed to fetch quiz history:", error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         fetchHistory();
//     }, []);

//     const calculateScore = (questions) => {
//         const correctAnswers = questions.filter(q => q.userAnswerIndex === q.correctAnswerIndex).length;
//         return `${correctAnswers} / ${questions.length}`;
//     };
    
//     const toggleExpand = (id) => {
//         setExpandedId(expandedId === id ? null : id);
//     };

//     if (isLoading) {
//         return <div className="card">Loading quiz history...</div>;
//     }

//     if (history.length === 0) {
//         return <div className="card"><h2>My Quizzes</h2><p>You have no saved quiz attempts.</p></div>;
//     }

//     return (
//         <div>
//             <h2>My Quizzes</h2>
//             {history.map(attempt => (
//                 <div key={attempt.id} className="card history-item">
//                     <div className="history-summary" onClick={() => toggleExpand(attempt.id)}>
//                         <strong>{attempt.quizTitle}</strong>
//                         <span>{new Date(attempt.attemptedAt).toLocaleString()}</span>
//                         <span>Score: {calculateScore(attempt.questions)}</span>
//                     </div>
//                     {expandedId === attempt.id && (
//                         <div className="history-details">
//                             <QuizView 
//                                 questions={attempt.questions}
//                                 quizTitle=""
//                                 isReviewMode={true}
//                                 initialAnswers={Object.fromEntries(
//                                     attempt.questions.map((q, i) => [i, q.userAnswerIndex])
//                                 )}
//                             />
//                         </div>
//                     )}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default QuizHistory;
import React, { useState, useEffect } from 'react';
import { getQuizHistory, deleteQuizAttempt } from '../services/quizService.js';
import QuizView from '../components/QuizView.jsx';

const QuizHistory = () => {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await getQuizHistory();
                setHistory(data);
            } catch (error) {
                console.error("Failed to fetch quiz history:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchHistory();
    }, []);

    const calculateScore = (questions) => {
        const correctAnswers = questions.filter(q => q.userAnswerIndex === q.correctAnswerIndex).length;
        return `${correctAnswers} / ${questions.length}`;
    };
    
    // --- NEW FUNCTION ---
    const handleDelete = async (attemptId) => {
        // Confirm before deleting
        if (window.confirm("Are you sure you want to delete this quiz attempt?")) {
            try {
                await deleteQuizAttempt(attemptId);
                // Update the UI by filtering out the deleted item from the state
                setHistory(history.filter(attempt => attempt.id !== attemptId));
            } catch (error) {
                console.error("Failed to delete quiz attempt:", error);
                alert("Could not delete the quiz. Please try again.");
            }
        }
    };

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    if (isLoading) {
        return <div className="card">Loading quiz history...</div>;
    }

    if (history.length === 0) {
        return <div className="card"><h2>My Quizzes</h2><p>You have no saved quiz attempts.</p></div>;
    }

    return (
        <div>
            <h2>My Quizzes</h2>
            {history.map(attempt => (
                <div key={attempt.id} className="card history-item">
                    <div className="history-summary">
                        <div className="summary-main" onClick={() => toggleExpand(attempt.id)} title="Click to expand/collapse">
                            <strong>{attempt.quizTitle}</strong>
                            <span>{new Date(attempt.attemptedAt).toLocaleString()}</span>
                            <span>Score: {calculateScore(attempt.questions)}</span>
                        </div>
                        {/* --- NEW BUTTON --- */}
                        <button onClick={() => handleDelete(attempt.id)} className="delete-btn" title="Delete this quiz attempt">
                            Delete
                        </button>
                    </div>
                    {expandedId === attempt.id && (
                        <div className="history-details">
                            <QuizView 
                                questions={attempt.questions}
                                quizTitle=""
                                isReviewMode={true}
                                initialAnswers={Object.fromEntries(
                                    attempt.questions.map((q, i) => [i, q.userAnswerIndex])
                                )}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default QuizHistory;
