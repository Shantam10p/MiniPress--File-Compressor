// src/components/ResultDisplay.jsx
import React from "react";

function ResultDisplay({ fileInfo }) {
  const { originalSize, compressedSize, compressionRatio, downloadUrl } =
    fileInfo;

  const handleDownload = () => {
    // This can be connected to actual backend download later
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "compressed-file"; // can be dynamically set later
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="card result-display">
      <h2>Compression Complete!</h2>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-label">Original Size</div>
          <div className="stat-value">{originalSize}</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Compressed Size</div>
          <div className="stat-value success-value">{compressedSize}</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-label">Space Saved</div>
        <div className="stat-value success-value">{compressionRatio}</div>
      </div>

      <div className="actions">
        <button className="button-success" onClick={handleDownload}>
          Download Compressed File
        </button>
        <button onClick={() => window.location.reload()}>
          Compress Another File
        </button>
      </div>
    </div>
  );
}

export default ResultDisplay;
