import React, { useEffect, useState } from 'react';

const SnippetList = () => {
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/snippets/')
      .then(response => response.json())
      .then(data => setSnippets(data))
      .catch(error => console.error('Error fetching snippets:', error));
  }, []);

  return (
    <div>
      <h1>Code Snippets</h1>
      <ul>
        {snippets.map(snippet => (
          <li key={snippet.id}>{snippet.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SnippetList;
