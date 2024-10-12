import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const Favorites = () => {
    const { authState } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                if (!authState.user) return; // Check if the user is logged in
                const response = await axios.get('http://127.0.0.1:8000/api/users/favorites/');
                setFavorites(response.data.favorites || []); // Handle missing favorites
            } catch (error) {
                setErrorMessage('Failed to fetch favorites. Please try again later.');
            }
        };

        fetchFavorites();
    }, [authState.user]);

    return (
        <div>
            <h2>Your Favorite Snippets</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <ul>
                {favorites.length > 0 ? (
                    favorites.map((snippet) => (
                        <li key={snippet.id}>
                            {snippet.title} {/* Display the title of each favorite snippet */}
                        </li>
                    ))
                ) : (
                    <p>No favorite snippets found.</p>
                )}
            </ul>
        </div>
    );
};

export default Favorites;
