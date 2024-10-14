// src/components/Dashboard.js

import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { authState, logout } = useAuth();
    const navigate = useNavigate();

    // Check if user is authenticated
    if (!authState.user) {
        return <p style={styles.errorMessage}>Please log in to view your dashboard.</p>;
    }

    const handleLogout = () => {
        console.log('Logout button clicked'); // Debugging log
        logout(); // Call the logout function from AuthContext
        navigate('/'); // Redirect to home page after logout
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Welcome to Your Dashboard, {authState.user.username}!</h1>
            <p style={styles.subheading}>Your exclusive features will be displayed here.</p>

            <div style={styles.profileContainer}>
                <h2 style={styles.sectionHeading}>Profile Information</h2>
                <p><strong>Email:</strong> {authState.user.email}</p>
                <p><strong>Username:</strong> {authState.user.username}</p>
            </div>

            <div style={styles.recentActivity}>
                <h2 style={styles.sectionHeading}>Recent Activity</h2>
                <ul>
                    <li>Logged in on {new Date().toLocaleString()}</li>
                    {/* Add more recent activities here */}
                </ul>
            </div>

            <button onClick={handleLogout} style={styles.button}>Logout</button>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#f4f7fa',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        color: '#333',
        marginBottom: '10px',
    },
    subheading: {
        color: '#555',
        marginBottom: '20px',
    },
    profileContainer: {
        margin: '20px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        maxWidth: '400px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    recentActivity: {
        margin: '20px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        maxWidth: '400px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    sectionHeading: {
        color: '#4CAF50',
        marginBottom: '10px',
    },
    button: {
        padding: '10px 20px',
        margin: '20px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#45a049',
    },
    errorMessage: {
        color: 'red',
        fontSize: '18px',
        textAlign: 'center',
    },
};

export default Dashboard;
