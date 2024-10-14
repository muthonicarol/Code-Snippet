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
    <div>
      <h2>Sign In</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;