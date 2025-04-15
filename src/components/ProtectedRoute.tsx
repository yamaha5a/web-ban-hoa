import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');

  // Nếu không có token, chuyển hướng về trang login
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Nếu yêu cầu role admin nhưng user không phải admin
  if (requiredRole === 'admin' && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 