// frontend/src/pages/RegisterPage.jsx


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
// Import icons
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom'; // Import Link for login link


const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser({ username, email, password });
            navigate('/login');
        } catch (err) {
            // Updated error message for clarity
            setError('Registration failed. Username or email might already be taken.');
        }
    };


    return (
        <div className="auth-page">
            <div className="card auth-form">
               
                {/* Header Icon */}
                <div className="form-header-icon">
                    <FiArrowRight />
                </div>
               
                <h2>Create Account</h2>
                <p className="subtitle">Sign up to begin generating powerful AI study aids.</p>


                <form onSubmit={handleSubmit}>
                    {/* Username Input */}
                    <div className="form-group">
                        <label htmlFor="reg-username">Username</label>
                        <div className="input-wrapper">
                            <span className="input-icon"><FiUser /></span>
                            <input
                                type="text"
                                id="reg-username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                                required
                            />
                        </div>
                    </div>
                   
                    {/* Email Input */}
                    <div className="form-group">
                        <label htmlFor="reg-email">Email</label>
                        <div className="input-wrapper">
                            <span className="input-icon"><FiMail /></span>
                            <input
                                type="email"
                                id="reg-email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Address"
                                required
                            />
                        </div>
                    </div>
                   
                    {/* Password Input */}
                    <div className="form-group">
                        <label htmlFor="reg-password">Password</label>
                        <div className="input-wrapper">
                            <span className="input-icon"><FiLock /></span>
                            <input
                                type="password"
                                id="reg-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />
                        </div>
                    </div>
                   
                    {/* Login Link */}
                    <div className="forgot-password">
                        <Link to="/login">Already have an account? Log In</Link>
                    </div>


                    {error && <p className="error-message">{error}</p>}
                   
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};


export default RegisterPage;