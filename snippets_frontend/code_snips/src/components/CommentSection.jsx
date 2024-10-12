import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentSection = ({ snippetId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Fetch comments for the snippet
    axios.get(`http://localhost:8000/api/snippets/${snippetId}/comments/`)
      .then(response => setComments(response.data))
      .catch(error => console.error('Error fetching comments:', error));
  }, [snippetId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Post a new comment
    axios.post(`http://localhost:8000/api/snippets/${snippetId}/comments/`, { text: newComment })
      .then(response => {
        setComments([...comments, response.data]);
        setNewComment('');
      })
      .catch(error => console.error('Error posting comment:', error));
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold">Comments</h2>

      {/* Display comments */}
      <ul className="mt-4">
        {comments.map(comment => (
          <li key={comment.id} className="mb-2 p-3 bg-gray-100 rounded-lg">
            <p>{comment.text}</p>
            <p className="text-sm text-gray-500">Posted by {comment.author} on {new Date(comment.created_at).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>

      {/* New comment form */}
      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Write your comment..."
          required
        />
        <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg">Post Comment</button>
      </form>
    </div>
  );
};

// Ensure default export
export default CommentSection;
