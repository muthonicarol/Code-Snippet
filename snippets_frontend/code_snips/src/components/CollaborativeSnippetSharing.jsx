import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const CollaborativeSnippetSharing = () => {
    const { authState } = useAuth();
    const [snippetId, setSnippetId] = useState('');
    const [comment, setComment] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!authState.user) {
            setFeedbackMessage('You must be logged in to comment.');
            return;
        }

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/snippets/${snippetId}/comments/`, { comment });
            setFeedbackMessage('Comment submitted successfully!'); // Feedback to user
            setComment(''); // Reset comment after submission
        } catch (error) {
            setFeedbackMessage('Failed to submit comment. Please try again later.');
        }
    };

    return (
        <div>
            <h2>Share Your Thoughts on Snippet {snippetId}</h2>
            <form onSubmit={handleCommentSubmit}>
                <input
                    type="text"
                    value={snippetId}
                    onChange={(e) => setSnippetId(e.target.value)}
                    placeholder="Snippet ID"
                    required
                />
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Your Comment"
                    required
                />
                <button type="submit">Submit Comment</button>
            </form>
            {feedbackMessage && <p>{feedbackMessage}</p>}
        </div>
    );
};

export default CollaborativeSnippetSharing;
