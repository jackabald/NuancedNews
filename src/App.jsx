import React from 'react';
import './App.css';
import SearchBar from './components/SearchBar.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';

function App() {
  const handleSearch = (searchTerm) => {
    console.log('Search for:', searchTerm);
    // Implement search functionality here
  };

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>TimeFlys</h1>
          <p>Make travel less stressful, be in the know — Plan, Track, and Go!</p>
        </header>
        <main className="app-main">
          <SearchBar onSearch={handleSearch} />
          <Signup />
          <Login />
        </main>
      </div>
    </div>
  );
}

export default App;
