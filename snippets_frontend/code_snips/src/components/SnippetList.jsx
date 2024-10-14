import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { useAuth } from '../contexts/AuthContext';

const SnippetList = () => {
  const { authState } = useAuth();
  const { token } = authState || {};
  const [snippets, setSnippets] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchSnippets = async () => {
      if (!token) {
        setErrorMessage('User not authenticated');
        return;
      }

      try {
        const config = {
          headers: {
            Authorization: `Token ${token}`,
          },
        };
        const response = await axios.get('http://127.0.0.1:8000/api/snippets/snippets/', config);
        setSnippets(response.data);
      } catch (error) {
        setErrorMessage('Failed to fetch snippets.');
      }
    };

    fetchSnippets();
  }, [token]);

  if (errorMessage) {
    return <p style={{ color: 'red' }}>{errorMessage}</p>;
  }

  return (
    <div>
      <h2>Snippet List</h2>
      {snippets.length > 0 ? (
        <ul>
          {snippets.map((snippet) => (
            <li key={snippet.id}>
              <h3>
                <Link to={`/snippets/${snippet.id}`}>{snippet.title}</Link>
                {/* Clicking on the title navigates to snippet details */}
              </h3>
              <p>{snippet.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No snippets available.</p>
      )}
    </div>
  );
};

export default SnippetList;
