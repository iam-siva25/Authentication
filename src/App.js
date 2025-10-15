// Authentication/frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import NavBar from './components/Navbar';

// Import all page components
import HomePage from './pages/HomePage'; 
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="App" style={{ fontFamily: 'Arial, sans-serif' }}>
          <NavBar />
          <div style={{ padding: '20px' }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* 🔑 Private/Protected Routes 🔑 */}
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
              
              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;