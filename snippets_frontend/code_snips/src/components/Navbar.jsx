import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { authState } = useAuth(); // Get authState

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Link to="/" style={styles.logoLink}>Snippet Sharing App</Link>
      </div>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        {authState.user ? (
          <>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <Link to="/profile" style={styles.link}>Profile</Link>
            <Link to="/snippets" style={styles.link}>My Snippets</Link>
            <Link to="/favorites" style={styles.link}>Favorites</Link>
            <Link to="/create-snippet" style={styles.link}>Create Snippet</Link> {/* Added Create Snippet link */}
          </>
        ) : (
          <>
            <Link to="/signin" style={styles.link}>Sign In</Link>
            <Link to="/signup" style={styles.link}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    fontSize: '1.5rem',
  },
  logoLink: {
    textDecoration: 'none',
    color: '#fff',
  },
  links: {
    display: 'flex',
    gap: '15px',
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
    padding: '8px 12px',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  },
};

export default Navbar;
