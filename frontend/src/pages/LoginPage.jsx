// frontend/src/pages/LoginPage.jsx


import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { loginUser } from '../services/authService';
// Import icons
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom'; // Import Link for register link


const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser({ username, password });
            login(data.token);
            navigate('/notes');
        } catch (err) {
            // Updated error message for better user clarity
            setError('Login failed. Please check your username and password.');
        }
    };


    return (
        <div className="auth-page">
            <div className="card auth-form">
               
                {/* Header Icon */}
                <div className="form-header-icon">
                    <FiArrowRight />
                </div>
               
                <h2>Welcome Back</h2>
                <p className="subtitle">Unlock powerful AI study tools to ace your exams.</p>


                <form onSubmit={handleSubmit}>
                    {/* Username/Email Input */}
                    <div className="form-group">
                        <label htmlFor="username">Username/Email</label>
                        <div className="input-wrapper">
                            <span className="input-icon"><FiMail /></span>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username or Email"
                                required
                            />
                        </div>
                    </div>
                   
                    {/* Password Input */}
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrapper">
                            <span className="input-icon"><FiLock /></span>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />
                        </div>
                    </div>
                   
                    {/* Forgot Password Link (Optional but standard for good UI) */}
                    <div className="forgot-password">
                        <Link to="/register">Don't have an account? Register</Link>
                    </div>


                    {error && <p className="error-message">{error}</p>}
                   
                    <button type="submit">Log In</button>
                </form>
            </div>
        </div>
    );
};


export default LoginPage;
// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { loginUser } from '../services/authService';


// const LoginPage = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const { login } = useContext(AuthContext);
//     const navigate = useNavigate();


//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const data = await loginUser({ username, password });
//             login(data.token);
//             navigate('/notes');
//         } catch (err) {
//             setError('Invalid username or password');
//         }
//     };


//     return (
//         // Apply the centering wrapper class
//         <div className="auth-page">
//             <div className="card auth-form">
//                 <h2>Login</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="form-group">
//                         <label>Username</label>
//                         <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
//                     </div>
//                     <div className="form-group">
//                         <label>Password</label>
//                         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                     </div>
//                     {error && <p className="error-message">{error}</p>}
//                     <button type="submit">Login</button>
//                 </form>
//             </div>
//         </div>
//     );
// };


// export default LoginPage;

