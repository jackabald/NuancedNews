// src/App.js

import React from 'react';
import './App.css';
import SearchBar from './components/SearchBar';

function App() {
  const handleSearch = (searchTerm) => {
    console.log('Search for:', searchTerm);
    // Implement search functionality here
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>TimeFlys</h1>
        <p>Make travel less stressful, be in the know — Plan, Track, and Go!</p>
      </header>
      <main className="app-main">
        <SearchBar onSearch={handleSearch} />
      </main>
    </div>
  );
}

export default App;
