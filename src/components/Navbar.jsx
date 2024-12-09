import React, { useContext } from "react";
import { MainLayoutContext } from "./../pages/private/MainLayout";

const NavigationBar = () => {
    const {user, handleLogout} = useContext(MainLayoutContext);
    console.log(user);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand" href="#">
          MyApp
        </a>

        {/* Toggler for smaller screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" href="/dashboard">
                Users
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/chatai">
                Chat Ai
              </a>
            </li>
          </ul>

          {/* Right-aligned Menu */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <span className="navbar-text me-3">
                Hello, <strong>{user.name}</strong>
              </span>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
