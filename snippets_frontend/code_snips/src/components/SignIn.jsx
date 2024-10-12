import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Ensure this is correctly imported

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // State for success message
    const navigate = useNavigate();
    const { login } = useAuth(); // Get login function from context

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage(''); // Reset success message

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', { username, password });
            const userData = response.data.user; // Adjust based on your API response
            const token = response.data.token; // Adjust based on your API response

            // Use the login function to set the user and token
            login(userData, token); // Make sure login function accepts both user and token

            setSuccessMessage('Login successful! Redirecting to dashboard...'); // Success message

            // Redirect to the dashboard after a short delay to show success message
            setTimeout(() => {
                navigate('/dashboard');
            }, 1500); // 1.5 seconds delay
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    setErrorMessage('Invalid username or password.');
                } else {
                    setErrorMessage('An error occurred. Please try again.');
                }
            } else {
                setErrorMessage('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.title}>Sign In</h2>
                
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} {/* Display success message */}
                
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                
                <button type="submit" style={styles.button}>Sign In</button>
            </form>
        </div>
    );
};

// Your existing styles remain the same
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f4',
    },
    form: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '300px',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    }
};

export default SignIn;
