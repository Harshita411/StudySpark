// // quizService.js
// // import api from './api';

// // export const getQuiz = async (text) => {
// //     try {
// //         const response = await api.post('/quizzes', { text });
// //         return response.data;
// //     } catch (error) {
// //         console.error('Error fetching quiz:', error);
// //         throw error;
// //     }
// // };
// import api from './api';

// // Generates a new quiz from text
// export const getQuiz = async (text) => {
//     const response = await api.post('/quizzes', { text });
//     return response.data;
// };

// // Saves a completed quiz attempt
// export const saveQuizAttempt = async (attemptData) => {
//     const response = await api.post('/quizzes/save', attemptData);
//     return response.data;
// };

// // Fetches all saved quiz attempts for the current user
// export const getQuizHistory = async () => {
//     const response = await api.get('/quizzes/history');
//     return response.data;
// };
import api from './api';

// Generates a new quiz from text
export const getQuiz = async (text) => {
    const response = await api.post('/quizzes', { text });
    return response.data;
};

// Saves a completed quiz attempt
export const saveQuizAttempt = async (attemptData) => {
    const response = await api.post('/quizzes/save', attemptData);
    return response.data;
};

// Fetches all saved quiz attempts for the current user
export const getQuizHistory = async () => {
    const response = await api.get('/quizzes/history');
    return response.data;
};

// --- NEW FUNCTION ---
// Deletes a specific quiz attempt by its ID
export const deleteQuizAttempt = async (attemptId) => {
    const response = await api.delete(`/quizzes/${attemptId}`);
    return response.data;
};
