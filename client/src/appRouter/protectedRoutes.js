// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RouteName } from '../utils/routesConstants';

const ProtectedRoute = ({ children, roles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to={RouteName.login} />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to={RouteName.unauthorized} />;
  }

  return children;
};


export default ProtectedRoute;
