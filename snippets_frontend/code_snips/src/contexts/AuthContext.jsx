import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({ user: null, token: null });

    const login = (userData, token) => {
        setAuthState({ user: userData, token });
    };

    const logout = () => {
        setAuthState({ user: null, token: null });
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
