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
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to the Snippet Sharing App</h1>
      <p style={styles.subtitle}>Share, store, and discover code snippets with ease!</p>
      {authState.user ? (
        <button onClick={handleLogout} style={styles.button}>Logout</button>
      ) : (
        <>
          <button onClick={() => navigate('/signin')} style={styles.button}>Sign In</button>
          <button onClick={() => navigate('/signup')} style={styles.button}>Sign Up</button>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f4f8',
    textAlign: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '2.5rem',
    color: '#333',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    margin: '10px',
    fontSize: '1rem',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default Home;
