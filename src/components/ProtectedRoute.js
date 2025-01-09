// components/ProtectedRoute.js

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/authentication" replace />;
  }

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  return children;
};

export default ProtectedRoute;