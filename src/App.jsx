import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getServers } from './API';

function App({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check authentication status when the app loads
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [navigate]);

  // Don't render anything until authentication is confirmed
  if (!isAuthenticated) {
    return null; // Invisible until authentication state is verified
  }

  return (
    <>
      {children} {/* Pass children for displaying pages inside the authenticated state */}
    </>
  );
}

export default App;


