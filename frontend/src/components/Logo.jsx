import React from "react";

function Logo() {
  return (
    <div className="logo-container">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
        className="logo-icon"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4a6cfa" />
            <stop offset="100%" stopColor="#63e0ff" />
          </linearGradient>
        </defs>
        <path
          d="M34 10L20 4L6 10V30L20 36L34 30V10Z"
          fill="url(#logoGradient)"
          stroke="#fff"
          strokeWidth="2"
        />
        <path d="M20 4V36" stroke="#fff" strokeWidth="2" />
        <path d="M12 7L28 33" stroke="#fff" strokeWidth="2" />
      </svg>
      <div className="logo-text">
        <span className="logo-text-mini">Mini</span>
        <span className="logo-text-press">Press</span>
      </div>
    </div>
  );
}

export default Logo;
