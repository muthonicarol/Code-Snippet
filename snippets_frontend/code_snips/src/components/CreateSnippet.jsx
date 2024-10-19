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
    <div style={styles.container}>
      <h2 style={styles.title}>Create a New Snippet</h2>
      {errorMessage && <p style={styles.error}>{errorMessage}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Snippet Title" 
          required 
          style={styles.input}
        />
        <textarea 
          value={code} 
          onChange={(e) => setCode(e.target.value)} 
          placeholder="Your Code Here" 
          required 
          style={{ ...styles.input, height: '150px' }}
        />
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Description" 
          required 
          style={{ ...styles.input, height: '100px' }}
        />
        <input 
          type="text" 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)} 
          placeholder="Programming Language" 
          required 
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Create Snippet</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    backgroundColor: '#f7f3e9', // Light brown background
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    fontSize: '1.8rem',
    color: '#5a3d1a', // Dark brown for the title
    marginBottom: '20px',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    border: '1px solid #d4a437', // Yellow border
    borderRadius: '5px',
    outline: 'none',
    backgroundColor: '#fff',
    color: '#5a3d1a', // Dark brown for input text
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#d4a437', // Yellow button
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#b38730', // Darker yellow on hover
  },
};

export default CreateSnippet;
