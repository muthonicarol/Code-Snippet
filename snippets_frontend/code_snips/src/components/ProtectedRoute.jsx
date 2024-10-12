import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { authState } = useAuth(); // Assuming authState has user info

  // Check if the user is authenticated
  if (!authState.user) {
    return <Navigate to="/signin" replace />; // Redirect to sign-in if not authenticated
  }

  return children; // If authenticated, render the child components
};

export default ProtectedRoute;
