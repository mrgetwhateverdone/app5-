import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Check if user is authenticated by looking for profile data
    const userProfile = localStorage.getItem('userProfile');
    const userName = localStorage.getItem('userName');
    
    setIsAuthenticated(!!userProfile && !!userName);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null; // or a loading spinner
  }

  if (!isAuthenticated) {
    // Redirect to login while saving the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute; 