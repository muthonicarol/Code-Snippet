import React, { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

const initialState = {
  user: null,
  token: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload.user, token: action.payload.token };
    case 'LOGOUT':
      return initialState; // Reset to initial state
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  const logout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    dispatch({ type: 'LOGOUT' }); // Reset auth state
  };

  return (
    <AuthContext.Provider value={{ authState, dispatch, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming the AuthContext
export const useAuth = () => useContext(AuthContext);