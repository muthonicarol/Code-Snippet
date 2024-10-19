import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth

const SignIn = () => {
  const { dispatch } = useAuth(); // Get dispatch function
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        username,
        password,
      });
      const token = response.data.token;

      if (token) {
        localStorage.setItem('token', token);
        dispatch({ type: 'LOGIN', payload: { user: username, token } }); // Dispatch login action
        navigate('/dashboard'); // Redirect to the dashboard
      } else {
        setErrorMessage('Login failed: No token received.');
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage('Login failed: ' + JSON.stringify(error.response.data));
      } else {
        setErrorMessage('Login failed: Network or server error.');
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Sign In</h2>
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            style={styles.input}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Sign In</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundImage: 'url("https://www.pinterest.com/pin/976225656722615637/")', // Tech-themed background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    fontFamily: 'Roboto, sans-serif', // Modern font style
  },
  formContainer: {
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 228, 196, 0.9)', // Light yellow background for the form
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#8B4513', // Brown color for the title
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    transition: 'border-color 0.3s',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#DAA520', // Golden yellow color for the button
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#CDAA20', // Darker shade on hover
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
};

export default SignIn;
