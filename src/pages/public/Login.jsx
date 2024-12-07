import React, { useState } from 'react';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useLoading }  from '../../components/loading/LoadingContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('1234');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setIsLoading, isLoading  } = useLoading();

  // setIsLoading(true);
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    setError('');
    // setIsLoadingx(true);
    setIsLoading(true);

    try {
      const API_url = `${window.API_BASE_URL}/auth`;
      const API_Key = window.API_KEY;
      const requestBody = {
        username: "admin", // Map email to username
        password: "1234",
      };
      const response = await fetch(API_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': API_Key,
        },
        body: JSON.stringify(requestBody),
        //credentials: "include", // Required to include cookies
      });

      const result = await response.json();
      
      // setIsLoading(false);

      if (!response.ok) {
        throw new Error(result.message || 'Login failed');
      }

      localStorage.setItem("authToken", result.access_token); // Save token to localStorage
      // Handle successful login
      console.log('Login successful:', result);
      //alert('Login successful!');

      Cookies.set("auth", JSON.stringify({ id: 1, name: 'test user', email: 'test@gmail.com' }), {
        expires: 1, // Cookie expires in 1 day
      });

      navigate("/dashboard");


    } catch (err) {
      // Handle errors
      setError(err.message);
    } finally {
      
      setIsLoading(false);
    }
  };

  const buttonStyle = {
    transition: "all 0.5s ease",
  };

  return (   
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <div className='input-group'>
            <span className="input-group-text">
            <i className="fa-thin fa-envelope"></i>
            </span>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className='input-group'>
            <span className="input-group-text">
            <i className="fa-thin fa-lock"></i>
            </span>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            </div>
          </div>
          <button type="submit" className={`btn btn-primary d-flex  w-100 custom-button ${isLoading ? "loading" : ""}`} disabled={isLoading}
          style={buttonStyle}
          >
            {isLoading ? <div className="spinner d-flex justify-content-center" ></div> : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;