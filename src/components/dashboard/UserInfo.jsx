import React, { useState, useEffect, useContext } from "react";
const UserInfo = ({ userId }) => {

  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch employees from API
      // API base URL
    const API_URL = `${window.API_BASE_URL}/users/${userId}`;
    const API_Key = window.API_KEY;
    const token = localStorage.getItem("authToken"); // Retrieve token

    const fetchUserInfo = async () => {
      try {
        
        const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': API_Key,
          Authorization: `Bearer ${token}`
        },
      });
      
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setUserData(data); // Set the fetched data to state
        console.log(data); //
      } catch (err) {
        setError(err.message); // Set the error message if the request fails
      } finally {
        //setIsLoading(false); // Set loading to false when the request completes
      }
    };

    fetchUserInfo();
  }, [userId]); 

  return (
    <div>
      <h3>ID: {userData.id}</h3>
      <p>Username: {userData.username}</p>
      <p>Name: {userData.name}</p>
    </div>
  );
};

export default UserInfo;
