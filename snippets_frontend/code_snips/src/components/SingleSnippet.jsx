import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CommentSection from './CommentSection';

const SingleSnippet = () => {
  const { snippetId } = useParams(); // Get the snippet ID from the URL
  const [snippet, setSnippet] = useState(null); // State for the snippet
  const navigate = useNavigate(); // For navigation
  
  useEffect(() => {
    axios.get(`http://localhost:8000/api/snippets/${snippetId}/`)
      .then(response => setSnippet(response.data))
      .catch(error => console.error('Error fetching snippet:', error));
  }, [snippetId]);

  if (!snippet) return <div>Loading...</div>; // Show loading until data is fetched

  return (
    <div>
      {/* Back to snippets button */}
      <button onClick={() => navigate('/')} style={{ marginBottom: '20px' }}>
        Back to Snippets
      </button>

      {/* Display the snippet details */}
      <h1>{snippet.title}</h1>
      <pre style={{ backgroundColor: '#f5f5f5', padding: '10px' }}>
        <code>{snippet.code}</code>
      </pre>
      <p>{snippet.description}</p>
      <p><strong>Language:</strong> {snippet.language}</p>

      {/* Comment Section */}
      <CommentSection snippetId={snippetId} />
    </div>
  );
};

export default SingleSnippet;
