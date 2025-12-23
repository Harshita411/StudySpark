import api from './api';

// Function to get the user's profile data from the backend
export const getUserProfile = async () => {
    const response = await api.get('/users/profile');
    return response.data;
};

// Function to send updated profile data to the backend
export const updateUserProfile = async (profileData) => {
    const response = await api.put('/users/profile', profileData);
    return response.data;
};
