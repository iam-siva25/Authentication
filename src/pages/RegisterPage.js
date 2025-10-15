// Authentication/frontend/src/pages/RegisterPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/AuthStyles.css'; // Assuming you save the CSS below into this file

const RegisterPage = () => {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 

        try {
            await register(form.username, form.email, form.password);
            navigate('/profile'); 
        } catch (err) {
            setError(err.response?.data?.msg || 'Registration failed. Try again.');
        }
    };

    return (
        <div className="auth-container">
            <div className="welcome-section">
                <h1>👋 Welcome to the Auth Demo!</h1>
                <p>Register now to explore secure, cookie-based authentication and access your private profile.</p>
            </div>

            <div className="form-card">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            id="username"
                            name="username" 
                            placeholder="Enter username" 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email"
                            name="email" 
                            placeholder="Enter email" 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password"
                            name="password" 
                            placeholder="Enter password" 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    
                    {error && <p className="error-message">{error}</p>}
                    
                    <button type="submit" className="submit-button">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;