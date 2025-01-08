// LogoutButton.js

import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/logout');
      console.log(response.data);
      localStorage.removeItem('isAuthenticated');
      navigate('/authentication', { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;