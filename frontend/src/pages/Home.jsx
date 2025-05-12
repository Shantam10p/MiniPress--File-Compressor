// src/pages/Home.jsx
import React, { useState } from "react";
import UploadForm from "../components/UploadForm";
import ResultDisplay from "../components/ResultDisplay";
import FileIcon from "../components/FileIcon";
import Logo from "../components/Logo";

function Home() {
  const [result, setResult] = useState(null);

  const resetForm = () => {
    setResult(null);
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <Logo />
          <h2 className="hero-subtitle">Text File Compression Tool</h2>
        </div>
        
        <div className="project-info">
          <p><span>By:</span> Shantam Budhathoki</p>
          <p><span>Course:</span> Algorithm and Structured Programming</p>
          <p><span>Professor:</span> Mohammed Akhoirshida</p>
        </div>
        
        <p className="app-description">
          MiniPress uses Huffman coding to efficiently compress and decompress text files, 
          significantly reducing file sizes while preserving all original content.
        </p>
      </div>

      {!result ? (
        <UploadForm setResult={setResult} />
      ) : (
        <ResultDisplay result={result} resetForm={resetForm} />
      )}

      <div className="feature-highlights">
        <div className="feature">
          <h3>Efficient Compression</h3>
          <p>Uses Huffman coding for optimal text compression</p>
        </div>
        <div className="feature">
          <h3>Lossless Processing</h3>
          <p>Preserves 100% of your content during compression/decompression</p>
        </div>
        <div className="feature">
          <h3>Fast Processing</h3>
          <p>Optimized algorithm for quick file processing</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
