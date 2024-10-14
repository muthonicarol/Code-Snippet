import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext'; // Import your AuthContext

const UserProfile = () => {
    const { currentUser } = useAuth(); // Get the current user from context
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/profile/', {
                    headers: {
                        'Authorization': `Bearer ${currentUser.token}`, // Add your token here
                    },
                });
                setProfile(response.data);
            } catch (error) {
                console.error("Error fetching profile:", error.response ? error.response.data : error.message);
                setError(error.response?.data?.message || "Failed to fetch profile.");
            }
        };

        if (currentUser) { // Check if user is authenticated
            fetchProfile();
        } else {
            setError("User not authenticated.");
        }
    }, [currentUser]);

    if (error) {
        return <div>{error}</div>; // Display error message
    }

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{profile.username}</h1>
            <p>Email: {profile.email}</p>
            {/* Render other profile information here */}
        </div>
    );
};

export default UserProfile;
