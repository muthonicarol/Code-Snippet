import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditSnippet = () => {
    const { id } = useParams();  // Get the snippet ID from the URL parameters
    const navigate = useNavigate();  // For redirecting after successful submission

    // State variables to hold the snippet data and handle loading/error states
    const [title, setTitle] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the snippet details on component mount
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

    // Handle form submission to update the snippet
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const updatedSnippet = {
            title,
            code,
        };

        try {
            await axios.put(`/api/snippets/${id}/`, updatedSnippet);  // Update snippet via API
            navigate(`/snippets/${id}`);  // Redirect to the snippet detail page
        } catch (err) {
            setError('Error updating snippet.');
        }
    };

    if (loading) return <p>Loading snippet details...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="edit-snippet-form max-w-lg mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Edit Snippet</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700">Code</label>
                    <textarea
                        id="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
                        rows="10"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditSnippet;
