import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const CreateSnippet = () => {
  const { authState } = useAuth();
  const { token } = authState || {};
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!token) {
      setErrorMessage('You need to be logged in to create a snippet.');
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      await axios.post('http://127.0.0.1:8000/api/snippets/snippets/', {
        title,
        code,
        description,
        language,
      }, config);

      navigate('/snippets'); // Redirect to the snippets page on success
    } catch (error) {
      setErrorMessage('Failed to create snippet. Please try again.');
    }
  };

  return (
    <div>
      <h2>Create a New Snippet</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Snippet Title" required />
        <textarea value={code} onChange={(e) => setCode(e.target.value)} placeholder="Your Code Here" required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
        <input type="text" value={language} onChange={(e) => setLanguage(e.target.value)} placeholder="Programming Language" required />
        <button type="submit">Create Snippet</button>
      </form>
    </div>
  );
};

export default CreateSnippet;
