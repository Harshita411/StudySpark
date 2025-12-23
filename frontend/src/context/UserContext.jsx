// UserContext.jsx
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // In a real app, this would be integrated with an auth system
    const [user, setUser] = useState({
        isLoggedIn: false,
        name: 'Guest'
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};