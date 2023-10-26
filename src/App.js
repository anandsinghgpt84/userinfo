// UserList.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [sortedBy, setSortedBy] = useState("name");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  useEffect(() => {
    // Load search history from local storage on component mount
    const storedSearchHistory = JSON.parse(
      localStorage.getItem("searchHistory")
    );
    if (storedSearchHistory) {
      setSearchHistory(storedSearchHistory);
    }
  }, []);

  useEffect(() => {
    // Save search history to local storage whenever it changes
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  const handleSearch = () => {
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUsers(filteredUsers);

    if (searchTerm && !searchHistory.includes(searchTerm)) {
      setSearchHistory([...searchHistory, searchTerm]);
    }

    setSearchTerm("");
  };

  const handleSort = (attribute) => {
    const sortedUsers = [...users];
    sortedUsers.sort((a, b) => a[attribute].localeCompare(b[attribute]));
    setUsers(sortedUsers);
    setSortedBy(attribute);
  };

  return (
    <div className="main-container">
      <h1>User Info App</h1>
      <div className="search-container">
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
      <table className="user-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>Name</th>
            <th onClick={() => handleSort("phone")}>Phone</th>
            <th onClick={() => handleSort("email")}>Email</th>
            <th>Address</th>
            <th>Company</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="vibrant-color-1">{user.name}</td>
              <td className="vibrant-color-2">{user.phone}</td>
              <td className="vibrant-color-3">{user.email}</td>
              <td className="vibrant-color-4">
                {user.address.street}, {user.address.suite}, {user.address.city}
                , {user.address.zipcode}
              </td>
              <td className="vibrant-color-5">{user.company.name}</td>
              <td className="vibrant-color-6">{user.website}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
