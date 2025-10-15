// Authentication/frontend/src/context/AuthContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// IMPORTANT: This tells Axios to send the HTTP-Only cookie with every request
axios.defaults.withCredentials = true;

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext); 

// Base URL for the backend API
const API_URL = 'https://auth-backend-2l3b.onrender.com/api'; 


export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true);

    // Function to check cookie validity with the backend
    const checkAuthStatus = async () => {
        try {
            // Note: This hits the /api/data/profile route which is usually protected by middleware
            await axios.get(`${API_URL}/data/profile`); 
            setIsAuthenticated(true);
        } catch (error) {
            // A 401/403 (unauthorized) means the cookie is invalid or missing.
            setIsAuthenticated(false); 
        } finally {
            setIsLoading(false); 
        }
    };

    useEffect (() => {
        checkAuthStatus();
    }, []);

    const register = async (username, email, password) => {
        try {
            await axios.post(`${API_URL}/auth/register`, {username, email, password});
            // On success (200 OK), the cookie is set by the backend.
            setIsAuthenticated(true);
        } catch(err) {
            // Re-throw the error so the RegisterPage can catch and display the message.
            throw err; 
        }
    };

    const login = async (email, password) => {
        try {
            await axios.post(`${API_URL}/auth/login`, {email, password});
            // On success (200 OK), the cookie is set by the backend.
            setIsAuthenticated(true);
        } catch(err) {
            // Re-throw the error so the LoginPage can catch and display the message.
            throw err; 
        }
    };

    const logout = async () => {
        try {
            await axios.get(`${API_URL}/auth/logout`);
            setIsAuthenticated(false);
        } catch(error) {
            console.error('Logout failed:', error);
            // It's generally safe to set state to false even if logout failed on server
            setIsAuthenticated(false); 
        }
    };

    if (isLoading) {
        return <div>Loading Authentication Status....</div>
    }

    return (
        <AuthContext.Provider value ={{isAuthenticated, isLoading, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}