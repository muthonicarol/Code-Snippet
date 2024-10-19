import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const { authState, logout } = useAuth();
    const navigate = useNavigate();
    const [userSnippets, setUserSnippets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserSnippets = async () => {
            if (authState.token) {
                try {
                    const config = {
                        headers: {
                            Authorization: `Token ${authState.token}`,
                        },
                    };
                    const response = await axios.get('http://127.0.0.1:8000/api/snippets/snippets/', config);
                    setUserSnippets(response.data || []);
                } catch (error) {
                    setError('Error fetching your snippets.');
                    console.error('Error fetching user snippets:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchUserSnippets();
    }, [authState.token]);

    if (!authState.user) {
        return <p style={styles.errorMessage}>Please log in to view your dashboard.</p>;
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleDeleteSnippet = async (snippetId) => {
        try {
            const config = {
                headers: {
                    Authorization: `Token ${authState.token}`,
                },
            };
            await axios.delete(`http://127.0.0.1:8000/api/snippets/${snippetId}/`, config);
            setUserSnippets((prevSnippets) => prevSnippets.filter(snippet => snippet.id !== snippetId));
        } catch (error) {
            console.error('Failed to delete snippet:', error);
            setError('Failed to delete snippet.');
        }
    };

    const handleEditSnippet = (snippetId) => {
        navigate(`/snippets/edit/${snippetId}`);
    };

    return (
        <div style={styles.dashboardContainer}>
            <header style={styles.header}>
                <h1 style={styles.heading}>Welcome, {authState.user.username}!</h1>
                <p style={styles.welcomeMessage}>
                    Explore and manage your code snippets below.
                </p>
            </header>

            <div style={styles.contentContainer}>
                {loading ? (
                    <p>Loading snippets...</p>
                ) : error ? (
                    <p style={styles.errorMessage}>{error}</p>
                ) : (
                    <div style={styles.snippetsContainer}>
                        <h2 style={styles.sectionHeading}>Your Snippets</h2>
                        {Array.isArray(userSnippets) && userSnippets.length > 0 ? (
                            userSnippets.map((snippet) => (
                                <div key={snippet.id} style={styles.snippetCard}>
                                    <h3 style={styles.snippetTitle}>{snippet.title}</h3>
                                    <p style={styles.snippetLanguage}>{snippet.language}</p>
                                    <p style={styles.snippetContent}>
                                        {snippet?.content ? snippet.content.slice(0, 100) : 'No content available'}...
                                    </p>
                                    <div style={styles.snippetActions}>
                                        <button
                                            onClick={() => navigate(`/snippets/${snippet.id}`)}
                                            style={styles.viewButton}
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => handleEditSnippet(snippet.id)}
                                            style={styles.editButton}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteSnippet(snippet.id)}
                                            style={styles.deleteButton}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p style={styles.noSnippetsMessage}>No snippets created yet.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    dashboardContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#fdf6e3',
        minHeight: '100vh',
        color: '#4a4a4a',
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#7a5230',
        color: '#fff',
        width: '100%',
        textAlign: 'center',
        borderBottom: '4px solid #ffc107',
    },
    heading: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    welcomeMessage: {
        fontSize: '1.2rem',
        marginBottom: '20px',
        fontStyle: 'italic',
        color: '#ffeb3b',
    },
    contentContainer: {
        width: '100%',
        maxWidth: '1200px',
        marginTop: '20px',
    },
    snippetsContainer: {
        padding: '20px',
        backgroundColor: '#fffbe6',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    sectionHeading: {
        fontSize: '1.8rem',
        marginBottom: '20px',
        fontWeight: 'bold',
        color: '#7a5230',
    },
    snippetCard: {
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
        transition: 'box-shadow 0.3s ease',
        border: '1px solid #ffc107',
    },
    snippetTitle: {
        fontSize: '1.3rem',
        fontWeight: 'bold',
        color: '#7a5230',
    },
    snippetLanguage: {
        fontSize: '1rem',
        fontStyle: 'italic',
        color: '#7a5230',
        marginBottom: '10px',
    },
    snippetContent: {
        fontSize: '1rem',
        marginBottom: '20px',
        color: '#4a4a4a',
    },
    snippetActions: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    viewButton: {
        backgroundColor: '#7a5230',
        color: '#ffc107',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    editButton: {
        backgroundColor: '#ffc107',
        color: '#7a5230',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    deleteButton: {
        backgroundColor: '#d9534f',
        color: '#fff',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    noSnippetsMessage: {
        fontSize: '1rem',
        color: '#7a5230',
        textAlign: 'center',
    },
    errorMessage: {
        color: '#d9534f',
        textAlign: 'center',
    },
};

export default Dashboard;
