// import React, { useState } from 'react';
// import FileUpload from '../components/FileUpload.jsx';
// import SummaryView from '../components/SummaryView.jsx';
// import QuizView from '../components/QuizView.jsx';
// import FlashcardView from '../components/FlashcardView.jsx';
// import { getSummary } from '../services/summaryService.js';
// import { getQuiz } from '../services/quizService.js';
// import { getFlashcards } from '../services/flashcardService.js';

// const Notes = () => {
//     const [summary, setSummary] = useState('');
//     const [questions, setQuestions] = useState([]);
//     const [flashcards, setFlashcards] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState('');

//     const handleUploadSuccess = async (content) => {
//         setIsLoading(true);
//         setError('');
//         // Reset previous results
//         setSummary('');
//         setQuestions([]);
//         setFlashcards([]);
        
//         try {
//             // Fetch all study aids in parallel for efficiency
//             const [summaryRes, quizRes, flashcardsRes] = await Promise.all([
//                 getSummary(content),
//                 getQuiz(content),
//                 getFlashcards(content)
//             ]);
            
//             setSummary(summaryRes.summary);
//             setQuestions(quizRes);
//             setFlashcards(flashcardsRes);

//         } catch (err) {
//             console.error("Failed to generate study aids:", err);
//             setError('There was an error generating the study materials. Please try again.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div>
//             <FileUpload onUploadSuccess={handleUploadSuccess} />
            
//             {isLoading && <div className="card">Generating your study aids...</div>}
//             {error && <p className="error-message">{error}</p>}
            
//             <div className="results-container">
//                 <SummaryView summary={summary} />
//                 <QuizView questions={questions} quizTitle="Generated Quiz" />
                
//                 {/* This is the only modified line. */}
//                 {/* The 'isGenerated' prop tells the component to show the "Save Deck" button. */}
//                 <FlashcardView flashcards={flashcards} isGenerated={true} />
//             </div>
//         </div>
//     );
// };

// export default Notes;
import React, { useState } from 'react';
import FileUpload from '../components/FileUpload.jsx';
import SummaryView from '../components/SummaryView.jsx';
import QuizView from '../components/QuizView.jsx';
import FlashcardView from '../components/FlashcardView.jsx';
import { getSummary } from '../services/summaryService.js';
import { getQuiz } from '../services/quizService.js';
import { getFlashcards } from '../services/flashcardService.js';

const Notes = () => {
    const [summary, setSummary] = useState('');
    const [questions, setQuestions] = useState([]);
    const [flashcards, setFlashcards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleUploadSuccess = async (content) => {
        setIsLoading(true);
        setError('');
        setSummary('');
        setQuestions([]);
        setFlashcards([]);
        
        try {
            const [summaryRes, quizRes, flashcardsRes] = await Promise.all([
                getSummary(content),
                getQuiz(content),
                getFlashcards(content)
            ]);
            setSummary(summaryRes.summary);
            setQuestions(quizRes);
            setFlashcards(flashcardsRes);
        } catch (err) {
            console.error("Failed to generate study aids:", err);
            setError('There was an error generating the study materials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <FileUpload onUploadSuccess={handleUploadSuccess} />
            {isLoading && <div className="card">Generating your study aids...</div>}
            {error && <p className="error-message">{error}</p>}
            <div className="results-container">
                <SummaryView summary={summary} />
                <QuizView questions={questions} quizTitle="Generated Quiz" />
                <FlashcardView flashcards={flashcards} isGenerated={true} />
            </div>
        </div>
    );
};

export default Notes;
