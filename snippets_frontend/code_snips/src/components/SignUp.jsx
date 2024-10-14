import React, { useState } from 'react';
import axios from 'axios';  // HTTP client library for sending registration data to the backend.
import { useNavigate, Link } from 'react-router-dom';  // Hooks for navigation and linking.

const SignUp = () => {
    // State variables for form inputs and error handling.
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');  // Added for password confirmation.
    const [errorMessage, setErrorMessage] = useState('');  // To show error messages.

    const navigate = useNavigate();  // Hook to navigate after registration.

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation for password matching
        if (password !== password2) {
            setErrorMessage("Passwords do not match");
            return;
        }

        axios
            .post('http://127.0.0.1:8000/api/snippets/users/', { username, email, password }) // Use /users/ endpoint
            .then((response) => {
                alert('Registration Successful! Please Login');
                navigate('/signin');
            })
            .catch((error) => {
                if (error.response) {
                    console.error('Error during signup:', error.response.data);  // Log the backend error message
                    alert('Registration failed: ' + JSON.stringify(error.response.data)); // Show exact error to the user
                } else {
                    alert('Registration failed: ' + error.message); // Handle network errors
                }
            });
    };

    return (
        <div style={styles.container}>
            <nav style={styles.navbar}>
                <Link to="/" style={styles.homeLink}>Home</Link>
            </nav>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.title}>Sign Up</h2>
                {errorMessage && <p style={styles.error}>{errorMessage}</p>}  {/* Display error message if exists */}

                {/* Username input */}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                    required
                />

                {/* Email input */}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                    required
                />

                {/* Password input */}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    required
                />

                {/* Confirm Password input */}
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    style={styles.input}
                    required
                />

                {/* Register button */}
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
        backgroundColor: '#f5f5f5',
    },
    navbar: {
        position: 'absolute',
        top: '10px',
        left: '20px',
    },
    homeLink: {
        textDecoration: 'none',
        fontSize: '16px',
        color: '#007bff',
    },
    form: {
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
    },
    title: {
        marginBottom: '20px',
        fontSize: '24px',
        color: '#333',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        marginBottom: '10px',
    },
};

export default SignUp;
