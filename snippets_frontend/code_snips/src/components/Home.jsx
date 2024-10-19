import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext'; 
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { authState, dispatch } = useAuth(); 
  const navigate = useNavigate();

  // If the user is logged in, redirect to the dashboard
  useEffect(() => {
    if (authState.user) {
      navigate('/dashboard'); 
    }
  }, [authState.user, navigate]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    dispatch({ type: 'LOGOUT' }); 
    navigate('/'); 
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Hello Techie, Welcome to SnippetHive!</h1>
      <p style={styles.subtitle}>Share, store, and discover code snippets with ease!</p>
      
      <div style={styles.aboutSection}>
        <h2 style={styles.aboutTitle}>About SnippetHive</h2>
        <p style={styles.aboutText}>
          SnippetHive is a platform designed for developers to share, store, and discover code snippets from various programming languages and frameworks. 
          Whether you're looking for a quick reference, storing your frequently used snippets, or exploring code shared by others, SnippetHive makes it easy.
        </p>
      </div>

      {authState.user ? (
        <button onClick={handleLogout} style={styles.button}>Logout</button>
      ) : (
        <div>
          <button onClick={() => navigate('/signin')} style={styles.button}>Sign In</button>
          <button onClick={() => navigate('/signup')} style={styles.button}>Sign Up</button>
        </div>
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
    backgroundImage: `url('https://images.unsplash.com/photo-1518770660439-4636190af475')`, 
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    textAlign: 'center',
    padding: '20px',
    fontFamily: "'Roboto', sans-serif", 
  },
  title: {
    fontSize: '2.5rem',
    color: '#FFD700', // Yellow color for better contrast
    marginBottom: '20px',
    fontWeight: '700', 
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#fff',
    marginBottom: '20px',
    fontWeight: '400', 
  },
  aboutSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly more opaque
    borderRadius: '10px',
    padding: '20px',
    width: '80%',
    maxWidth: '600px', // Limit max width for better readability
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    marginBottom: '30px',
  },
  aboutTitle: {
    fontSize: '1.8rem',
    color: '#4CAF50',
    marginBottom: '10px',
    fontWeight: '700', 
  },
  aboutText: {
    fontSize: '1rem',
    color: '#333',
    lineHeight: '1.6',
    marginBottom: '15px',
    fontWeight: '400', 
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
    fontFamily: "'Roboto', sans-serif", 
  },
};

// Adding hover effect to buttons
styles.buttonHover = {
  backgroundColor: '#45a049',
};

export default Home;
