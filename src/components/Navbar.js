import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

const NavBar =()=>{
  const {isAuthenticated, logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = async()=>{
    await logout ();
    navigate ('/login'); // redirect to login page after logout
  };

return (
        <nav style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
            <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
            
            {isAuthenticated ? (
                <>
                    <Link to="/profile" style={{ marginRight: '15px' }}>Profile</Link>
                    <button onClick={handleLogout} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'blue' }}>
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <Link to="/login" style={{ marginRight: '15px' }}>Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    );
};

export default NavBar;