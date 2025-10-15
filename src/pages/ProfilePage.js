// Authentication/frontend/src/pages/ProfilePage.js

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProfileStyles.css'; // New CSS file for profile-specific styles

const API_URL = 'http://localhost:5000/api'; 

const ProfilePage = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // If not authenticated, redirect to login immediately
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        // Fetch protected user data (requires the HTTP-only cookie)
        const fetchProfileData = async () => {
            try {
                // Hitting a protected backend route (e.g., uses authMiddleware)
                const response = await axios.get(`${API_URL}/data/profile`); 
                setUserData(response.data); 
            } catch (error) {
                console.error('Failed to fetch profile data:', error);
                // If the fetch fails (e.g., 401), the cookie is bad.
                logout(); 
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [isAuthenticated, navigate, logout]); // Depend on isAuthenticated and other functions

    if (loading) {
        return <div className="loading-spinner">Loading Profile...</div>;
    }

    if (!userData) {
        // If authentication failed during the fetch, we redirect via useEffect
        return null; 
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h1>👤 Welcome, {userData.username || 'User'}!</h1>
                <p className="welcome-detail">This is your secure, protected profile page. Your JWT cookie was successfully validated by the server.</p>
                
                <div className="user-details">
                    <p><strong>User ID:</strong> {userData._id}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Joined:</strong> {new Date(userData.date).toLocaleDateString()}</p>
                </div>

                <button onClick={logout} className="logout-button">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;