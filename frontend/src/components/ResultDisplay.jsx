// src/components/ResultDisplay.jsx
import React from "react";
import { formatFileSize } from "../utils/fileHelpers";
import { downloadFile } from "../services/compressionAPI";
import FileIcon from "./FileIcon";

function ResultDisplay({ result, resetForm }) {
  if (!result) return null;

  const isCompressionResult = result.hasOwnProperty("compressionRatio");

  const handleDownload = () => {
    if (result.downloadUrl) {
      downloadFile(result.downloadUrl);
    }
  };

  return (
    <div className="result-card">
      <div className="result-header">
        <h2>
          {isCompressionResult
            ? "Compression Complete"
            : "Decompression Complete"}
        </h2>
        <div className="icon-container success-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.177-7.86l-2.765-2.767L7 12.431l3.823 3.826L18 9.084l-1.06-1.06-6.117 6.116z" />
          </svg>
        </div>
      </div>

      <div className="result-content">
        {isCompressionResult ? (
          <>
            <div className="result-stat">
              <span>Original Size</span>
              <div className="stat-value">
                {formatFileSize(result.originalSize)}
              </div>
            </div>
            <div className="result-stat">
              <span>Compressed Size</span>
              <div className="stat-value">
                {formatFileSize(result.compressedSize)}
              </div>
            </div>
            <div className="result-stat highlight">
              <span>Space Saved</span>
              <div className="stat-value">{result.compressionRatio}%</div>
            </div>
          </>
        ) : (
          <div className="result-stat">
            <span>Decompressed Size</span>
            <div className="stat-value">
              {formatFileSize(result.decompressedSize)}
            </div>
          </div>
        )}

        <div className="result-stat">
          <span>Processing Time</span>
          <div className="stat-value">{result.processingTime} seconds</div>
        </div>
      </div>

      <div className="result-actions">
        <button onClick={handleDownload} className="download-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="btn-icon"
          >
            <path d="M13 12h3l-4 4-4-4h3V8h2v4zm-7 8h14v-2H6v2zm14-18H6a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2z" />
          </svg>
          Download {isCompressionResult ? "Compressed" : "Decompressed"} File
        </button>
        <button onClick={resetForm} className="reset-btn">
          Process Another File
        </button>
      </div>
    </div>
  );
}

export default ResultDisplay;
