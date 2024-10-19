import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SnippetList = () => {
    const { authState } = useAuth();
    const { token, userId } = authState || {};
    const [snippets, setSnippets] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [groupedSnippets, setGroupedSnippets] = useState({});

    useEffect(() => {
        const fetchSnippets = async () => {
            if (!token) {
                setErrorMessage('User not authenticated');
                return;
            }

            try {
                const config = {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                };
                // Fetch all snippets from the backend (not just the user's snippets)
                const response = await axios.get('http://127.0.0.1:8000/api/snippets/snippets/', config);
                const snippets = response.data;

                // Group snippets by language
                const grouped = snippets.reduce((acc, snippet) => {
                    const language = snippet.language || 'Unknown';
                    if (!acc[language]) {
                        acc[language] = [];
                    }
                    acc[language].push(snippet);
                    return acc;
                }, {});
                setGroupedSnippets(grouped);
                setSnippets(snippets);
            } catch (error) {
                setErrorMessage('Failed to fetch snippets.');
            }
        };

        fetchSnippets();
    }, [token]);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this snippet?');
        if (confirmDelete) {
            try {
                const config = {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                };
                await axios.delete(`http://127.0.0.1:8000/api/snippets/snippets/${id}/`, config);
                setGroupedSnippets((prev) => {
                    const newGrouped = { ...prev };
                    for (const language in newGrouped) {
                        newGrouped[language] = newGrouped[language].filter((snippet) => snippet.id !== id);
                    }
                    return newGrouped;
                });
            } catch (error) {
                setErrorMessage('Failed to delete snippet.');
            }
        }
    };

    if (errorMessage) {
        return <p style={{ color: 'red' }}>{errorMessage}</p>;
    }

    return (
        <div style={styles.pageContainer}>
            <h2 style={styles.pageTitle}>Snippet List</h2>
            {Object.keys(groupedSnippets).length > 0 ? (
                <div style={styles.snippetContainer}>
                    {Object.keys(groupedSnippets).map((language) => (
                        <div key={language} style={styles.languageSection}>
                            <h3 style={styles.languageTitle}>{language} Snippets</h3>
                            <ul style={styles.snippetList}>
                                {groupedSnippets[language].map((snippet) => (
                                    <li key={snippet.id} style={styles.snippetItem}>
                                        <h4 style={styles.snippetTitle}>
                                            <Link to={`/snippets/${snippet.id}`} style={styles.snippetLink}>{snippet.title}</Link>
                                        </h4>
                                        <p>{snippet.description}</p>
                                        <p>Created by: {snippet.owner_username}</p> {/* Display the owner's username */}
                                        <div style={styles.actionButtons}>
                                            <Link to={`/snippets/${snippet.id}`}>
                                                <button style={styles.viewButton}>View Details</button>
                                            </Link>
                                            {snippet.owner === userId && ( // Only show edit and delete for the owner
                                                <>
                                                    <Link to={`/snippets/edit/${snippet.id}`}>
                                                        <button style={styles.editButton}>Edit</button>
                                                    </Link>
                                                    <button 
                                                        onClick={() => handleDelete(snippet.id)} 
                                                        style={styles.deleteButton}>
                                                        Delete
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <p style={styles.noSnippetsMessage}>No snippets available.</p>
            )}
        </div>
    );
};

const styles = {
    pageContainer: {
        padding: '20px',
        backgroundColor: '#f7f3e9',
        minHeight: '100vh',
    },
    pageTitle: {
        textAlign: 'center',
        fontSize: '2rem',
        color: '#5a3d1a',
        marginBottom: '20px',
    },
    snippetContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    languageSection: {
        backgroundColor: '#f4ecd3',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    languageTitle: {
        fontSize: '1.5rem',
        color: '#d4a437',
        marginBottom: '10px',
    },
    snippetList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
    },
    snippetItem: {
        padding: '15px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        marginBottom: '10px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.3s ease',
    },
    snippetTitle: {
        fontSize: '1.25rem',
        color: '#5a3d1a',
        marginBottom: '10px',
    },
    snippetLink: {
        textDecoration: 'none',
        color: '#5a3d1a',
    },
    actionButtons: {
        display: 'flex',
        gap: '10px',
        marginTop: '10px',
    },
    viewButton: {
        padding: '8px 12px',
        backgroundColor: '#d4a437',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    editButton: {
        padding: '8px 12px',
        backgroundColor: '#d4a437',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    deleteButton: {
        padding: '8px 12px',
        backgroundColor: '#a85d32',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    noSnippetsMessage: {
        textAlign: 'center',
        fontSize: '1.25rem',
        color: '#5a3d1a',
    },
};

export default SnippetList;
