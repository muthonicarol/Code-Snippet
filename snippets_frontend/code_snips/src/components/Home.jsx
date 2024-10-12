import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const { authState } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (authState.user) {
            navigate('/dashboard'); // Redirect to dashboard if user is logged in
        }
    }, [authState.user, navigate]);

    return (
        <div style={styles.container}>
            <div style={styles.section}>
                <h1 style={styles.title}>Welcome to SnippetHub!</h1>
                <p style={styles.introText}>
                    Discover, share, and collaborate on code snippets with developers from around the world.
                </p>

                {!authState.user ? (
                    <div>
                        <Link to="/signin" style={styles.btn}>
                            Sign In
                        </Link>
                        <Link to="/signup" style={styles.btn}>
                            Sign Up
                        </Link>
                    </div>
                ) : (
                    <p>You are logged in!</p> // You can replace this with a dashboard link or welcome message
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        padding: '50px 20px',
        backgroundColor: '#f4f7fa',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        width: '100%',
        maxWidth: '700px',
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    },
    title: {
        fontSize: '2.8rem',
        color: '#333',
        marginBottom: '30px',
        fontFamily: '"Roboto", sans-serif',
        fontWeight: '700',
    },
    introText: {
        fontSize: '1.2rem',
        marginBottom: '40px',
        color: '#555',
        fontFamily: '"Open Sans", sans-serif',
        lineHeight: '1.5',
    },
    btn: {
        padding: '12px 24px',
        borderRadius: '8px',
        textDecoration: 'none',
        color: 'white',
        fontSize: '1.1rem',
        backgroundColor: '#3498db',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        marginRight: '10px',
    },
};

export default Home;
