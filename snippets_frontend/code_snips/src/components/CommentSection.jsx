import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const CommentSection = ({ snippetId }) => {
  const { authState } = useAuth(); // Get the authentication state to access token
  const { token } = authState || {};
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/snippets/${snippetId}/comments/`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setError('Could not load comments');
      }
    };
    fetchComments();
  }, [snippetId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      return; // Prevent posting empty comments
    }

    try {
      const config = {
        headers: {
          Authorization: `Token ${token}`, // Use token to authenticate the user
        },
      };

      const response = await axios.post(
        'http://127.0.0.1:8000/api/snippets/${snippetId}/comments/',
        { text: newComment },
        config
      );

      setComments([...comments, response.data]); // Add new comment to the comments array
      setNewComment(''); // Clear the textarea
    } catch (error) {
      console.error('Error posting comment:', error);
      setError('Failed to post the comment');
    }
  };

  return (
    <div>
      <h2>Comments</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.text}</p>
            {/* Display the author and the time the comment was created */}
            <p>
              Posted by <strong>{comment.author.username}</strong> on{' '}
              {new Date(comment.created_at).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>

      {/* Form for adding a new comment */}
      <form onSubmit={handleSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
          placeholder="Leave a comment..."
        />
        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
};

export default CommentSection;
