import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { getUserProfile, updateUserProfile } from '../services/userService.js';
import { FaUser, FaEnvelope, FaSave } from 'react-icons/fa'; // Assuming react-icons


const Profile = () => {
    const { user: authUser, login } = useContext(AuthContext);


    const [profile, setProfile] = useState(null);
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getUserProfile();
                setProfile(data);
                setEmail(data.email);
            } catch (error) {
                console.error("Failed to fetch profile:", error);
                setMessage('Failed to load profile. Please check your connection.');
            } finally {
                setIsLoading(false);
            }
        };


        fetchProfile();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsSaving(true);
        try {
            const updatedUser = await updateUserProfile({ email });
            setProfile(updatedUser);
            // This message explicitly mentions the email change possibility
            setMessage('Profile updated successfully! You can change your email address here.');
        } catch (error) {
            setMessage('Failed to update profile. Please ensure the email is valid and unique.');
            console.error("Update error:", error);
        } finally {
            setIsSaving(false);
        }
    };


    if (isLoading) {
        // Use a simple loading card
        return <div className="profile-container"><div className="card loading-card">Loading profile...</div></div>;
    }


    if (!profile) {
        return <div className="profile-container"><div className="card loading-card"><p className="error-message">Could not load profile. Please try again.</p></div></div>;
    }


    return (
        // The container centers the card (defined in the CSS below)
        <div className="profile-container">
            {/* The standard rectangular card style */}
            <div className="card profile-card">
                <h2>User Profile Settings</h2>
               
                {/* Email change instruction */}
                <p className="subtle-instruction">
                    You can change your email address here. Please note, this requires validation on next login.
                </p>


                <form onSubmit={handleSubmit}>
                   
                    {/* Username Field (Read-only) */}
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <div className="input-wrapper disabled-input"> {/* Added disabled-input class for styling */}
                            <span className="input-icon"><FaUser /></span>
                            <input
                                id="username"
                                type="text"
                                value={profile.username}
                                disabled
                                readOnly
                            />
                        </div>
                    </div>


                    {/* Email Field (Editable) */}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <div className="input-wrapper">
                            <span className="input-icon"><FaEnvelope /></span>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Update Email Address"
                            />
                        </div>
                    </div>


                    {message &&
                        <p className={message.includes('success') ? 'success-message' : 'error-message'}>
                            {message}
                        </p>
                    }


                    <button type="submit" disabled={isSaving}>
                        {isSaving ? (
                            <>
                                <FaSave className="icon-spin" /> Saving...
                            </>
                        ) : (
                            'Save Changes'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};


export default Profile;
