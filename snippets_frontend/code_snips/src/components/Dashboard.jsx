// src/components/Dashboard.js

import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { authState, logout } = useAuth();
    const navigate = useNavigate();

    // Check if user is authenticated
    if (!authState.user) {
        return <p>Please log in to view your dashboard.</p>;
    }

    const handleLogout = () => {
        console.log('Logout button clicked'); // Debugging log
        logout(); // Call the logout function from AuthContext
        navigate('/'); // Redirect to home page after logout
    };

    return (
        <div style={styles.container}>
            <h1>Welcome to Your Dashboard, {authState.user.username}!</h1>
            <p>Your exclusive features will be displayed here.</p>

            <div style={styles.profileContainer}>
                <h2>Profile Information</h2>
                <p><strong>Email:</strong> {authState.user.email}</p>
                <p><strong>Username:</strong> {authState.user.username}</p>
            </div>

            <div style={styles.recentActivity}>
                <h2>Recent Activity</h2>
                <ul>
                    <li>Logged in on {new Date().toLocaleString()}</li>
                    {/* Add more recent activities here */}
                </ul>
            </div>

            <div style={styles.settings}>
                <h2>Settings</h2>
                <button onClick={() => navigate('/settings')} style={styles.button}>Go to Settings</button>
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
    },
    profileContainer: {
        margin: '20px 0',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    recentActivity: {
        margin: '20px 0',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    settings: {
        margin: '20px 0',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    button: {
        padding: '10px 20px',
        margin: '5px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default Dashboard;
