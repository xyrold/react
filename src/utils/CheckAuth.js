import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CheckAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Function to check if auth cookie exists
    const checkAuth = () => {
      const cookies = document.cookie; // Get all cookies
      const authCookieExists = cookies.split(";").some((cookie) => 
        cookie.trim().startsWith("auth=") // Replace 'auth' with your cookie name
      );

      if (authCookieExists) {
        navigate("/dashboard"); // Redirect to the dashboard
      }
    };

    checkAuth();
  }, [navigate]); // Dependency array ensures the effect runs on mount

  return null; // This component doesn't render anything
};

export default CheckAuth;
