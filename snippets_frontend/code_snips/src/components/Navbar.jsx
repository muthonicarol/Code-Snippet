// Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { authState, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate('/'); // Redirect to home after logging out
  };

  return (
    <nav>
      <Link to="/">Home</Link>

      {!authState.user ? (
        <>
          <Link to="/signin">Sign In</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </nav>
  );
};

export default Navbar;
