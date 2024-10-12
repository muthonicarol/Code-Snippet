import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Import the custom hook

const CreateSnippet = () => {
  const { authState } = useAuth(); // Use the useAuth hook to get authState
  const { user, token } = authState || {};
  
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Debugging logs
    console.log('Auth State:', authState); 
    console.log('Token:', token);

    // Ensure the user and token exist before proceeding
    if (!user || !token) {
      setErrorMessage('You need to be logged in to create a snippet.');
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      console.log('Authorization Header:', config.headers.Authorization); // Debugging log

      await axios.post('http://127.0.0.1:8000/api/snippets/snippets/', {
        title,
        code,
        description,
        language,
      }, config);

      navigate('/snippets');
    } catch (error) {
      console.error('Error creating snippet:', error);
      if (error.response) {
        if (error.response.status === 401) {
          setErrorMessage('Unauthorized. Please log in.');
        } else {
          setErrorMessage('Failed to create snippet. Please try again.');
        }
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      <h2>Create a New Snippet</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Optional styling for error */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Snippet Title"
          required
        />
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Your Code Here"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <input
          type="text"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          placeholder="Programming Language"
          required
        />
        <button type="submit">Create Snippet</button>
      </form>
    </div>
  );
};

export default CreateSnippet;
