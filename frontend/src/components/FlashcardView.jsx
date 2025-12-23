

// // FlashcardView.jsx
// import React, { useState } from 'react';


// const Flashcard = ({ card }) => {
//     const [isFlipped, setIsFlipped] = useState(false);
//     return (
//         <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
//             <div className="flashcard-inner">
//                 <div className="flashcard-front">
//                     <p>{card.term}</p>
//                 </div>
//                 <div className="flashcard-back">
//                     <p>{card.definition}</p>
//                 </div>
//             </div>
//         </div>
//     );
// }


// const FlashcardView = ({ flashcards }) => {
//     if (!flashcards || flashcards.length === 0) return null;


//     return (
//         <div className="card">
//             <h3>Flashcards</h3>
//             <p className="subtle-text">Click a card to flip it.</p>
//             <div className="flashcard-grid">
//                 {flashcards.map((card, index) => (
//                     <Flashcard key={index} card={card} />
//                 ))}
//             </div>
//         </div>
//     );
// };


// export default FlashcardView;







import React, { useState } from 'react';
import { saveFlashcardDeck } from '../services/flashcardService.js';

// Individual Flashcard Component
const Flashcard = ({ card, onDelete, isSavedDeck }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    
    return (
        <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
            <div className="flashcard-inner">
                <div className="flashcard-front">
                    <p>{card.term}</p>
                </div>
                <div className="flashcard-back">
                    <p>{card.definition}</p>
                </div>
            </div>
            {/* Show delete button only on saved decks */}
            {isSavedDeck && (
                <button className="card-delete-btn" onClick={(e) => {
                    e.stopPropagation(); // Prevent the card from flipping when deleting
                    onDelete(card.term);
                }}>
                    &times;
                </button>
            )}
        </div>
    );
};
// Main View Component for a deck of flashcards
const FlashcardView = ({ flashcards, isGenerated = false, deckId, onCardDelete }) => {
    const [saveStatus, setSaveStatus] = useState('');

    if (!flashcards || flashcards.length === 0) return null;

    const handleSave = async () => {
        const title = window.prompt("Enter a title for this flashcard deck:", "My New Deck");
        if (title) {
            setSaveStatus('Saving...');
            try {
                await saveFlashcardDeck({ title, cards: flashcards });
                setSaveStatus('Deck saved successfully!');
            } catch (error) {
                setSaveStatus('Failed to save deck.');
                console.error("Failed to save deck:", error);
            }
        }
    };

    return (
        <div className="card">
            {isGenerated && <h3>Generated Flashcards</h3>}
            <p className="subtle-text">Click a card to flip it.</p>
            <div className="flashcard-grid">
                {flashcards.map((card, index) => (
                    <Flashcard
                        key={index}
                        card={card}
                        onDelete={(term) => onCardDelete(deckId, term)}
                        isSavedDeck={!isGenerated}
                    />
                ))}
            </div>
            {isGenerated && (
                <div className="deck-actions">
                    <button onClick={handleSave} disabled={!!saveStatus && saveStatus !== 'Failed to save deck.'}>
                        {saveStatus || 'Save Deck'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default FlashcardView;

