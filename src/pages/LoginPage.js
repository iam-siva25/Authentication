// Authentication/frontend/src/pages/LoginPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/AuthStyles.css'; // Ensure this path is correct

const LoginPage = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await login(form.email, form.password);
            navigate('/profile'); // Redirect on successful login
        } catch (err) {
            // Display error message from the backend (e.g., 'Invalid credentials')
            setError(err.response?.data?.msg || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="auth-container">
            <div className="welcome-section">
                <h1>✨ Ready to Dive Back In?</h1>
                <p>Welcome back! Please log in to securely access your personalized dashboard and continue your journey.</p>
            </div>

            <div className="form-card">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email"
                            name="email" 
                            placeholder="Enter your email" 
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
                            placeholder="Enter your password" 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    
                    {error && <p className="error-message">{error}</p>}
                    
                    <button type="submit" className="submit-button">Log In</button>
                </form>
                <p className="form-footer">
                    Don't have an account? <a href="/register">Register here</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;