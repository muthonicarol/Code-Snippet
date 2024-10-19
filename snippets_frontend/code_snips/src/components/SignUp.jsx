import React, { useState } from 'react';
import axios from 'axios'; // HTTP client library for sending registration data to the backend.
import { useNavigate } from 'react-router-dom'; // Hooks for navigation.

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate(); // Hook to navigate after registration.

    const handleSubmit = (e) => {
        e.preventDefault();

        // Password matching
        if (password !== password2) {
            setErrorMessage("Passwords do not match");
            return;
        }

        axios
            .post('http://127.0.0.1:8000/api/snippets/users/', { username, email, password })
            .then((response) => {
                alert('Registration Successful! Please Login');
                navigate('/signin');
            })
            .catch((error) => {
                if (error.response) {
                    console.error('Error during signup:', error.response.data);
                    alert('Registration failed: ' + JSON.stringify(error.response.data)); // Show error to the user
                } else {
                    alert('Registration failed: ' + error.message); // Handle network errors
                }
            });
    };

    return (
        <div style={styles.container}>
            <div style={styles.overlay}></div>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.title}>Sign Up</h2>
                
                {errorMessage && <p style={styles.error}>{errorMessage}</p>}

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    required
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    style={styles.input}
                    required
                />

                <button type="submit" style={styles.button}>Register</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundImage: 'url("https://cdn.pixabay.com/photo/2015/06/01/09/05/laptop-793046_1280.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for better text visibility
        zIndex: 1,
    },
    form: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
        zIndex: 2,
    },
    title: {
        marginBottom: '20px',
        fontSize: '28px',
        color: '#7B5B29', // Dark brown color for the title
        fontWeight: '600',
    },
    input: {
        width: '100%',
        padding: '12px',
        marginBottom: '15px',
        borderRadius: '5px',
        border: '1px solid #A16A29', // Lighter brown for input border
        fontSize: '16px',
        transition: 'border 0.3s',
    },
    button: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#D1A25A', // Light yellow for button
        color: '#7B5B29', // Dark brown for button text
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#B18C3B', // Darker yellow on hover
    },
    error: {
        color: 'red',
        marginBottom: '10px',
        fontSize: '14px',
    },
};

export default SignUp;
