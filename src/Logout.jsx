import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token'); // Clear the token
    navigate('/login'); // Redirect to login after logout
  }, [navigate]);

  return null; // Invisible component, it just handles logout logic
}

export default Logout;
