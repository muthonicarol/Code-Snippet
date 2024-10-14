import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SingleSnippet = () => {
    const { id } = useParams(); // Assuming the route is defined with :id
    const [snippet, setSnippet] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSnippet = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/snippets/${id}/`); // Use the correct URL format
                setSnippet(response.data);
            } catch (error) {
                console.error("Error fetching snippet:", error.response ? error.response.data : error.message);
                setError(error.response?.data?.message || "Failed to fetch snippet details.");
            }
        };

        fetchSnippet();
    }, [id]);

    if (error) {
        return <div>{error}</div>; // Display error message
    }

    if (!snippet) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{snippet.title}</h1>
            <pre>{snippet.code}</pre>
            <p>{snippet.description}</p>
        </div>
    );
};

export default SingleSnippet;
