import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const UserProfile = () => {
    const { authState } = useAuth();
    const [profile, setProfile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                if (!authState.user) return; // Check if user is logged in
                const response = await axios.get(`http://127.0.0.1:8000/api/users/profile/`);
                setProfile(response.data.profile || {}); // Handle missing profile data
            } catch (error) {
                setErrorMessage('Failed to fetch profile data.');
            }
        };

        fetchProfile();
    }, [authState.user]);

    if (!profile) {
        return <p>Loading profile...</p>; // Loading state
    }

    return (
        <div>
            <h2>User Profile: {profile.username}</h2>
            <p>Email: {profile.email}</p>
            <p>Joined: {new Date(profile.joined).toLocaleDateString()}</p> {/* Display join date */}
            <button onClick={() => alert('Edit feature coming soon!')}>Edit Profile</button>
        </div>
    );
};

export default UserProfile;
