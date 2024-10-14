import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const { authState } = useAuth();
    const [profile, setProfile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            if (!authState.token) {
                // Redirect to sign-in if not authenticated
                navigate('/signin');
                return;
            }
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/snippets/profile/', {
                    headers: {
                        Authorization: `Bearer ${authState.token}`, // Correct syntax for adding token
                    },
                });
                setProfile(response.data.profile || {}); // Handle missing profile data
            } catch (error) {
                setErrorMessage('Failed to fetch profile data.');
            }
        };

        fetchProfile();
    }, [authState.token, navigate]);

    if (!profile) {
        return <p>Loading profile...</p>; // Loading state
    }

    return (
        <div>
            <h2>User Profile: {profile.username}</h2>
            <p>Email: {profile.email}</p>
            <p>Joined: {new Date(profile.joined).toLocaleDateString()}</p> {/* Display join date */}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button onClick={() => alert('Edit feature coming soon!')}>Edit Profile</button>
        </div>
    );
};

export default UserProfile;
