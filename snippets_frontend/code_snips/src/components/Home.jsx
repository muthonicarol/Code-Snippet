// src/components/Home.js

import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { authState, dispatch } = useAuth(); // Get authState and dispatch
  const navigate = useNavigate();

  // Redirect to the dashboard if the user is logged in
  useEffect(() => {
    if (authState.user) {
      navigate('/dashboard'); // Redirect to the dashboard
    }
  }, [authState.user, navigate]);

  const handleLogout = () => {
    // Logic for logging out
    localStorage.removeItem('token'); // Remove the token from local storage
    dispatch({ type: 'LOGOUT' }); // Dispatch logout action
    navigate('/'); // Redirect to the home page
  };

  return (
    <div>
      <h1>Welcome to the Snippet Sharing App</h1>
      {authState.user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <button onClick={() => navigate('/signin')}>Sign In</button>
          <button onClick={() => navigate('/signup')}>Sign Up</button>
        </>
      )}
    </div>
  );
};

export default Home;
