import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Change useHistory to useNavigate
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import CommentSection from './CommentSection';

const SnippetDetail = () => {
    const { id } = useParams(); // Get snippet ID from the URL
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    const { authState } = useAuth(); // Get the auth state to access the token
    const { token } = authState || {};
    const [snippet, setSnippet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedSnippet, setEditedSnippet] = useState({ title: '', code: '', description: '' });

    useEffect(() => {
        const fetchSnippet = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                };
                const response = await axios.get(`http://127.0.0.1:8000/api/snippets/snippets/${id}/`, config);
                setSnippet(response.data);
                setEditedSnippet({
                    title: response.data.title,
                    code: response.data.code,
                    description: response.data.description,
                });
                setLoading(false);
            } catch (err) {
                setError('Failed to load snippet details.');
                setLoading(false);
            }
        };

        fetchSnippet();
    }, [id, token]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this snippet?');
        if (!confirmDelete) return;

        try {
            const config = {
                headers: {
                    Authorization: `Token ${token}`,
                },
            };
            await axios.delete(`http://127.0.0.1:8000/api/snippets/snippets/${id}/`, config);
            navigate('/snippets'); // Use navigate to redirect after deletion
        } catch (err) {
            setError('Failed to delete snippet.');
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();

        try {
            const config = {
                headers: {
                    Authorization: `Token ${token}`,
                },
            };
            const response = await axios.put(`http://127.0.0.1:8000/api/snippets/snippets/${id}/`, editedSnippet, config);
            setSnippet(response.data);
            setIsEditing(false); // Exit edit mode
        } catch (err) {
            setError('Failed to update snippet.');
        }
    };

    if (loading) {
        return <p>Loading snippet details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>Snippet Details</h2>
            {snippet ? (
                <div>
                    {isEditing ? (
                        <form onSubmit={handleEdit}>
                            <div>
                                <label>Title:</label>
                                <input
                                    type="text"
                                    value={editedSnippet.title}
                                    onChange={(e) => setEditedSnippet({ ...editedSnippet, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label>Code:</label>
                                <textarea
                                    value={editedSnippet.code}
                                    onChange={(e) => setEditedSnippet({ ...editedSnippet, code: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label>Description:</label>
                                <textarea
                                    value={editedSnippet.description}
                                    onChange={(e) => setEditedSnippet({ ...editedSnippet, description: e.target.value })}
                                    required
                                />
                            </div>
                            <button type="submit">Save Changes</button>
                            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                        </form>
                    ) : (
                        <div>
                            <h3>{snippet.title}</h3>
                            <pre>{snippet.code}</pre>
                            <p>{snippet.description}</p>
                            <p>Language: {snippet.language}</p>
                            {snippet.author === authState.user.username && ( // Check if the user is the author
                                <div>
                                    <button onClick={() => setIsEditing(true)}>Edit Snippet</button>
                                    <button onClick={handleDelete}>Delete Snippet</button>
                                </div>
                            )}
                            <CommentSection snippetId={id} />
                        </div>
                    )}
                </div>
            ) : (
                <p>No snippet found.</p>
            )}
        </div>
    );
};

export default SnippetDetail;
