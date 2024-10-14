import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditSnippet = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSnippet = async () => {
            try {
                const response = await axios.get(`/api/snippets/${id}/`);
                setTitle(response.data.title);
                setCode(response.data.code);
                setLoading(false);
            } catch (err) {
                setError('Error fetching snippet details.');
                setLoading(false);
            }
        };
        fetchSnippet();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedSnippet = { title, code };

        try {
            await axios.put(`/api/snippets/${id}/`, updatedSnippet);
            navigate(`/snippets/${id}`); // Redirect to the snippet detail page
        } catch (err) {
            setError('Error updating snippet.');
        }
    };

    if (loading) return <p>Loading snippet details...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Edit Snippet</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea value={code} onChange={(e) => setCode(e.target.value)} required />
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditSnippet;
