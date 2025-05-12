import React from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="app-container">
      <main className="container">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-info">
            <div className="footer-logo">
              <strong>MiniPress</strong> - Huffman Coding File Compressor
            </div>
            <div className="footer-attribution">
              <p>Academic Project by Shantam Budhathoki</p>
              <p>Algorithm and Structured Programming</p>
            </div>
          </div>
          <p className="copyright">
            © {new Date().getFullYear()} All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
