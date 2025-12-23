

// // flashcardService.js
// import api from './api';


// export const getFlashcards = async (text) => {
//     try {
//         const response = await api.post('/flashcards', { text });
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching flashcards:', error);
//         throw error;
//     }
// };
import api from './api';

// Generates new flashcards
export const getFlashcards = async (text) => {
    const response = await api.post('/flashcards', { text });
    return response.data;
};

// Saves a new flashcard deck
export const saveFlashcardDeck = async (deckData) => {
    const response = await api.post('/flashcards/decks', deckData);
    return response.data;
};

// Gets all saved decks for the current user
export const getFlashcardHistory = async () => {
    const response = await api.get('/flashcards/decks');
    return response.data;
};

// Deletes an entire deck by its ID
export const deleteFlashcardDeck = async (deckId) => {
    const response = await api.delete(`/flashcards/decks/${deckId}`);
    return response.data;
};

// Deletes a single card from a deck
export const deleteCard = async (deckId, term) => {
    // We send the term as a URL query parameter
    const response = await api.delete(`/flashcards/decks/${deckId}/cards?term=${encodeURIComponent(term)}`);
    return response.data;
};
