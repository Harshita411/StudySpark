// summaryService.js
import api from './api';

export const getSummary = async (text) => {
    try {
        const response = await api.post('/summaries', { text });
        return response.data;
    } catch (error) {
        console.error('Error fetching summary:', error);
        throw error;
    }
};