// App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [sortedBy, setSortedBy] = useState('name');

  useEffect(() => {
    // Fetch user data on component mount
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching user data:', error));
  }, []);

  const handleSearch = () => {
    // Filter users based on the search term
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUsers(filteredUsers);

    // Add the search term to search history
    setSearchHistory([...searchHistory, searchTerm]);
    setSearchTerm('');
  };

  const handleSort = (attribute) => {
    const sortedUsers = [...users];
    sortedUsers.sort((a, b) =>
      a[attribute].localeCompare(b[attribute])
    );
    setUsers(sortedUsers);
    setSortedBy(attribute);
  };

  return (
    <div className="App">
      <h1>User Info App</h1>
      <div className="container">
        <div className="search">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="search-history">
          <h2>Search History:</h2>
          {searchHistory.map((term, index) => (
            <span key={index}>{term}, </span>
          ))}
        </div>
        <div className="sort-buttons">
          <button onClick={() => handleSort('name')}>Sort by Name</button>
          <button onClick={() => handleSort('phone')}>Sort by Phone</button>
          <button onClick={() => handleSort('email')}>Sort by Email</button>
        </div>
        
        {/* User data displayed within the container */}
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td style={{ backgroundColor: 'violet' }}>{user.name}</td>
                <td style={{ backgroundColor: 'orange' }}>{user.phone}</td>
                <td style={{ backgroundColor: 'green' }}>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
