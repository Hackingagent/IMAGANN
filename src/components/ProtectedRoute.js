// ProtectedRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('isAuthenticated'); // Replace with your authentication logic

  if (!isAuthenticated) {
    return <Navigate to="/authentication" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;