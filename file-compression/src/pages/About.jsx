import React from "react";

function About() {
  return (
    <div className="page-container card">
      <h1>About MiniPress</h1>
      <div className="content-section">
        <h2>Advanced File Compression</h2>
        <p>
          MiniPress is a powerful file compression tool built to make your files
          smaller without losing quality. Our state-of-the-art algorithms
          analyze your files to apply the most efficient compression technique.
        </p>

        <h2>Why Choose MiniPress</h2>
        <ul className="feature-list">
          <li>
            <span className="feature-icon">⚡</span>
            <div>
              <strong>Lightning Fast</strong>
              <p>Compress files in seconds with our optimized algorithms</p>
            </div>
          </li>
          <li>
            <span className="feature-icon">🔒</span>
            <div>
              <strong>Secure & Private</strong>
              <p>
                Your files are processed in your browser, never stored on our
                servers
              </p>
            </div>
          </li>
          <li>
            <span className="feature-icon">💯</span>
            <div>
              <strong>Maximum Compression</strong>
              <p>Achieve up to 95% size reduction on many file types</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default About;
