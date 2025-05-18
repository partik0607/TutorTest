import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('auth-token');
  const location = useLocation();

  if (!token) {
    if (location.pathname !== '/login') {
      alert('Please login to access this page');
    }
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
