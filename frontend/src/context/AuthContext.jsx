import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // You will need to install this: npm install jwt-decode

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            try {
                const decodedUser = jwtDecode(storedToken);
                setUser({ username: decodedUser.sub });
                setToken(storedToken);
            } catch (error) {
                // Invalid token
                localStorage.removeItem('token');
                setUser(null);
                setToken(null);
            }
        }
    }, []);

    const login = (newToken) => {
        localStorage.setItem('token', newToken);
        const decodedUser = jwtDecode(newToken);
        setUser({ username: decodedUser.sub });
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};