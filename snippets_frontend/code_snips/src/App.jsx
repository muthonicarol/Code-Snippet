import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import SnippetList from './components/SnippetList';
import SingleSnippet from './components/SingleSnippet';
import CreateSnippet from './components/CreateSnippet';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import UserProfile from './components/UserProfile';  // New component for user profiles
import EditSnippet from './components/EditSnippet';  // New component for editing snippets
import FavoriteSnippets from './components/FavoriteSnippets';  // New component for favorite snippets

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar /> {/* Include Navbar across all routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
          
          {/* Protected routes for authenticated users */}
          <Route path="/snippets" element={<ProtectedRoute><SnippetList /></ProtectedRoute>} />
          <Route path="/snippets/:id" element={<ProtectedRoute><SingleSnippet /></ProtectedRoute>} />
          <Route path="/create-snippet" element={<ProtectedRoute><CreateSnippet /></ProtectedRoute>} />
          <Route path="/edit-snippet/:id" element={<ProtectedRoute><EditSnippet /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/favorites" element={<ProtectedRoute><FavoriteSnippets /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
