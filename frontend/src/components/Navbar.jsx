

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();


    const handleLogout = () => {
        logout();
        navigate('/login');
    };


    return (
        <nav className="navbar">
            <Link to="/" className="nav-brand">
                StudySpark
            </Link>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                {user ? (
                    <>
                        {/* 1. Generate Aids (previously /notes) */}
                        <li><Link to="/notes">Generate Aids</Link></li>
                       
                        {/* 2. My Quizzes (Restored) */}
                        <li><Link to="/quiz">My Quizzes</Link></li>
                       
                        {/* 3. My Flashcards (Restored) */}
                        <li><Link to="/flashcards">My Flashcards</Link></li>
                       
                        {/* 4. Profile and Logout (Authentication Links) */}
                        <li><Link to="/profile">Profile</Link></li>
                        <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
                    </>
                ) : (
                    <>
                        {/* Links for Logged Out Users */}
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};


export default Navbar;

