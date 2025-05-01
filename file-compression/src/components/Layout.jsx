import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import Logo from "./Logo";

function Layout() {
  return (
    <div className="app-container">
      <header>
        <div className="header-content">
          <Logo />
          <p className="subtitle">Fast & Efficient File Compression</p>

          <nav className="main-nav">
            <NavLink to="/" end>
              Home
            </NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/faq">FAQ</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>
        </div>
      </header>

      <main className="container">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} MiniPress - All rights reserved</p>
          <div className="footer-links">
            <NavLink to="/privacy">Privacy Policy</NavLink>
            <NavLink to="/contact">Contact Us</NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
