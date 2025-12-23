// import React from 'react';


// const Flashcards = () => {
//   return (
//     <div>
//       <h1>My Flashcard Decks</h1>
//       <p>This page will display all the flashcard decks you have generated and saved.</p>
//     </div>
//   );
// };


// export default Flashcards;



import React, { useState, useEffect } from 'react';
import { getFlashcardHistory, deleteFlashcardDeck, deleteCard } from '../services/flashcardService.js';
import FlashcardView from '../components/FlashcardView.jsx';

const FlashcardsHistory = () => {
    const [decks, setDecks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            setIsLoading(true);
            try {
                const data = await getFlashcardHistory();
                setDecks(data);
            } catch (error) {
                console.error("Failed to fetch flashcard history:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchHistory();
    }, []);
    
    const handleDeleteDeck = async (deckId) => {
        if (window.confirm("Are you sure you want to permanently delete this entire deck?")) {
            try {
                await deleteFlashcardDeck(deckId);
                setDecks(decks.filter(deck => deck.id !== deckId));
            } catch (error) {
                alert("Could not delete the deck. Please try again.");
            }
        }
    };

    const handleDeleteCard = async (deckId, term) => {
        if (window.confirm(`Are you sure you want to delete the card "${term}"?`)) {
            try {
                await deleteCard(deckId, term);
                // Update the state to reflect the change in the UI
                const updatedDecks = decks.map(deck => {
                    if (deck.id === deckId) {
                        const updatedCards = deck.cards.filter(card => card.term !== term);
                        return { ...deck, cards: updatedCards };
                    }
                    return deck;
                });
                setDecks(updatedDecks);
            } catch (error) {
                alert("Could not delete the card. Please try again.");
            }
        }
    };

    const toggleExpand = (id) => setExpandedId(expandedId === id ? null : id);

    if (isLoading) {
        return <div className="card">Loading flashcard decks...</div>;
    }

    if (decks.length === 0) {
        return <div className="card"><h2>My Flashcards</h2><p>You have no saved flashcard decks. Go to "Generate Aids" to create and save your first deck!</p></div>;
    }

    return (
        <div>
            <h2>My Flashcards</h2>
            {decks.map(deck => (
                <div key={deck.id} className="card history-item">
                    <div className="history-summary">
                        <div onClick={() => toggleExpand(deck.id)} className="summary-main" title="Click to expand/collapse">
                            <strong>{deck.title}</strong>
                            <span>{deck.cards.length} cards</span>
                            <span>Created: {new Date(deck.createdAt).toLocaleDateString()}</span>
                        </div>
                        <button onClick={() => handleDeleteDeck(deck.id)} className="delete-btn" title="Delete entire deck">
                            Delete Deck
                        </button>
                    </div>
                    {expandedId === deck.id && (
                        <div className="history-details">
                            <FlashcardView 
                                flashcards={deck.cards}
                                deckId={deck.id}
                                onCardDelete={handleDeleteCard}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FlashcardsHistory;
