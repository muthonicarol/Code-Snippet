import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SnippetList = () => {
  const [snippets, setSnippets] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State to store the search query
  const [filteredSnippets, setFilteredSnippets] = useState([]); // State for filtered snippets

  useEffect(() => {
    axios.get('http://localhost:8000/api/snippets/')
      .then(response => {
        setSnippets(response.data);
        setFilteredSnippets(response.data); // Initially, all snippets are displayed
      })
      .catch(error => console.error('Error fetching snippets:', error));
  }, []);

  // Filter snippets based on search query
  useEffect(() => {
    if (searchQuery === '') {
      setFilteredSnippets(snippets); // Show all snippets when search query is empty
    } else {
      const filtered = snippets.filter(snippet =>
        snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        snippet.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        snippet.language.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSnippets(filtered);
    }
  }, [searchQuery, snippets]);

  return (
    <div>
      {/* Search input field */}
      <input
        type="text"
        placeholder="Search for code snippets..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
      />

      {/* Display snippets */}
      {filteredSnippets.length > 0 ? (
        filteredSnippets.map(snippet => (
          <div key={snippet.id} style={{ marginBottom: '20px' }}>
            <h3>{snippet.title}</h3>
            <pre><code>{snippet.code}</code></pre>
            <p>{snippet.description}</p>
            <p>Language: {snippet.language}</p>
          </div>
        ))
      ) : (
        <p>No snippets found.</p>
      )}
    </div>
  );
};

export default SnippetList;
