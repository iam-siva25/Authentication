// Authentication/frontend/src/pages/HomePage.js

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/HomeStyles.css'; // New CSS file for home page styles

const HomePage = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <div className="home-container">
            <div className="home-content">
                <h1>🚀 Full-Stack Authentication Demo</h1>
                <p className="tagline">Secure, cookie-based authentication built with React and Node.js/Express.</p>
                
                <div className="nav-links">
                    {isAuthenticated ? (
                        <>
                            <Link to="/profile" className="btn btn-primary">Go to Profile</Link>
                            <button onClick={logout} className="btn btn-secondary">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-primary">Login</Link>
                            <Link to="/register" className="btn btn-secondary">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;