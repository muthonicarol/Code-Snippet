import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CommentSection from './CommentSection';

const SnippetDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { authState } = useAuth();
    const { token } = authState || {};

    const [snippet, setSnippet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedSnippet, setEditedSnippet] = useState({ title: '', code: '', description: '' });
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchSnippet = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                };
                const response = await axios.get(`http://127.0.0.1:8000/api/snippets/snippets/${id}/`, config);
                
                // Make sure the response includes the author data
                if (response.data) {
                    setSnippet(response.data);
                    setEditedSnippet({
                        title: response.data.title,
                        code: response.data.code,
                        description: response.data.description,
                    });
                } else {
                    setError('Snippet not found.');
                }
                setLoading(false);
            } catch (err) {
                setError('Failed to load snippet details.');
                setLoading(false);
            }
        };

        fetchSnippet();
    }, [id, token]);

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    Authorization: `Token ${token}`,
                },
            };
            const response = await axios.put(`http://127.0.0.1:8000/api/snippets/snippets/${id}/`, editedSnippet, config);
            setSnippet(response.data);
            setIsEditing(false);
        } catch (err) {
            setError('Failed to update snippet.');
        }
    };

    const handleDelete = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Token ${token}`,
                },
            };
            await axios.delete(`http://127.0.0.1:8000/api/snippets/snippets/${id}/`, config);
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to delete snippet.');
        }
    };

    if (loading) return <p>Loading snippet details...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Snippet Details</h2>
            {isEditing ? (
                <form onSubmit={handleEdit}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Title:</label>
                        <input
                            type="text"
                            value={editedSnippet.title}
                            onChange={(e) => setEditedSnippet({ ...editedSnippet, title: e.target.value })}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Code:</label>
                        <textarea
                            value={editedSnippet.code}
                            onChange={(e) => setEditedSnippet({ ...editedSnippet, code: e.target.value })}
                            required
                            style={styles.textarea}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Description:</label>
                        <textarea
                            value={editedSnippet.description}
                            onChange={(e) => setEditedSnippet({ ...editedSnippet, description: e.target.value })}
                            required
                            style={styles.textarea}
                        />
                    </div>
                    <div style={styles.buttonGroup}>
                        <button type="submit" style={styles.button}>Save Changes</button>
                        <button type="button" onClick={() => setIsEditing(false)} style={styles.cancelButton}>Cancel</button>
                    </div>
                </form>
            ) : (
                <div>
                    <h3 style={styles.snippetTitle}>{snippet.title}</h3>
                    <p style={styles.author}><strong>Created by:</strong> {snippet.author ? snippet.author.username : 'Unknown'}</p>
                    <div style={styles.codeContainer}>
                        <SyntaxHighlighter language={snippet.language} style={solarizedlight}>
                            {snippet.code}
                        </SyntaxHighlighter>
                        <CopyToClipboard text={snippet.code} onCopy={() => setCopied(true)}>
                            <button style={styles.copyButton}>{copied ? 'Copied!' : 'Copy Code'}</button>
                        </CopyToClipboard>
                    </div>
                    <p style={styles.description}>{snippet.description}</p>
                    <div style={styles.buttonGroup}>
                        <button onClick={() => setIsEditing(true)} style={styles.button}>Edit Snippet</button>
                        <button onClick={handleDelete} style={styles.deleteButton}>Delete Snippet</button>
                    </div>
                </div>
            )}
            <CommentSection snippetId={id} />
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '800px',
        margin: '20px auto',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        textAlign: 'center',
        color: '#333',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#555',
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
    },
    textarea: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        minHeight: '100px',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    button: {
        padding: '10px 15px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    cancelButton: {
        padding: '10px 15px',
        backgroundColor: '#f44336',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    snippetTitle: {
        fontSize: '1.5em',
        margin: '10px 0',
        color: '#333',
    },
    author: {
        color: '#777',
        marginBottom: '20px',
    },
    codeContainer: {
        position: 'relative',
        margin: '20px 0',
    },
    copyButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        padding: '5px 10px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    description: {
        margin: '20px 0',
        color: '#444',
        lineHeight: '1.6',
    },
    deleteButton: {
        padding: '10px 15px',
        backgroundColor: '#f44336',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default SnippetDetail;
