// LogoutButton.js

import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
  
      const response = await axios.post('http://localhost:8000/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log(response.data);
      localStorage.removeItem('token');
      navigate('/authentication', { replace: true });
    } catch (error) {
      if (error.response.status === 401) {
        console.error('Unauthorized');
        alert('You are not authorized to access this resource.');
      } else if (error.response.status === 500) {
        console.error('Internal Server Error');
        alert('Internal Server Error. Please try again later.');
      } else {
        console.error(error);
      }
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;