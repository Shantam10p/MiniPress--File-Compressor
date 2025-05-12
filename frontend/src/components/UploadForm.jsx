// src/components/UploadForm.jsx
import React, { useState, useRef } from "react";
import { compressFile, decompressFile } from "../services/compressionAPI";
import { getFileExtension, formatFileSize } from "../utils/fileHelpers";
import FileIcon from "./FileIcon";

function UploadForm({ setResult }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("compress");
  const fileInputRef = useRef(null);

  // Define supported formats directly in the component
  const SUPPORTED_FORMATS = {
    compress: [".txt", "txt", "text/plain"],
    decompress: [".bin", "bin", "application/octet-stream"],
  };

  const FILE_SIZE_LIMIT = 10 * 1024 * 1024; // 10MB

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setError("");

    if (!selectedFile) {
      setFile(null);
      return;
    }

    // Validate file size
    if (selectedFile.size > FILE_SIZE_LIMIT) {
      setError(
        `File size exceeds the limit of ${formatFileSize(FILE_SIZE_LIMIT)}`
      );
      setFile(null);
      e.target.value = null;
      return;
    }

    // Enhanced file extension validation
    const extension = getFileExtension(selectedFile.name).toLowerCase();
    const fileType = selectedFile.type;
    const supportedFormats =
      mode === "compress"
        ? SUPPORTED_FORMATS.compress
        : SUPPORTED_FORMATS.decompress;

    // Check if file extension or mime type is supported
    if (
      !supportedFormats.includes(`.${extension}`) &&
      !supportedFormats.includes(extension) &&
      !supportedFormats.includes(fileType)
    ) {
      setError(
        `Unsupported file format. Please upload ${supportedFormats[0]} file${
          supportedFormats.length > 1 ? "s" : ""
        }`
      );
      setFile(null);
      e.target.value = null;
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file first");
      return;
    }

    try {
      setLoading(true);
      setError("");

      let result;
      if (mode === "compress") {
        result = await compressFile(file);
      } else {
        result = await decompressFile(file);
      }

      setResult(result);
    } catch (error) {
      setError(error.message || "An error occurred during processing");
    } finally {
      setLoading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const switchMode = (newMode) => {
    if (mode !== newMode) {
      setMode(newMode);
      clearFile();
    }
  };
  return (
    <div className="upload-card">
      <div className="mode-selector">
        <button
          className={`mode-btn ${mode === "compress" ? "active" : ""}`}
          onClick={() => switchMode("compress")}
          type="button"
          style={{
            backgroundColor: mode === "compress" ? "#4361ee" : "#f8f9fa",
            color: mode === "compress" ? "white" : "#495057",
            fontWeight: "600",
            opacity: 1,
          }}
        >
          Compress
        </button>
        <button
          className={`mode-btn ${mode === "decompress" ? "active" : ""}`}
          onClick={() => switchMode("decompress")}
          type="button"
          style={{
            backgroundColor: mode === "decompress" ? "#4361ee" : "#f8f9fa",
            color: mode === "decompress" ? "white" : "#495057",
            fontWeight: "600",
            opacity: 1,
          }}
        >
          Decompress
        </button>
      </div>

      <form onSubmit={handleSubmit} className="upload-form">
        <div className="drop-zone">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept={mode === "compress" ? ".txt" : ".bin"}
            className="file-input"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="drop-zone-label">
            <div className="icon-container">
              <FileIcon isAnimated={false} />
            </div>
            <div className="drop-zone-text">
              <p className="primary-text">
                {file ? file.name : `Drag & drop or click to select file`}
              </p>
              <p className="secondary-text">
                Supported format: {mode === "compress" ? ".txt" : ".bin"}
              </p>
            </div>
          </label>
        </div>

        {error && <div className="error-alert">{error}</div>}

        {file && (
          <div className="file-preview">
            <div className="file-preview-content">
              <FileIcon isAnimated={false} />
              <div className="file-details">
                <h4>{file.name}</h4>
                <div className="file-meta">
                  <span className="file-type">
                    {file.type || getFileExtension(file.name).toUpperCase()}
                  </span>
                  <span className="file-size">{formatFileSize(file.size)}</span>
                </div>
              </div>
            </div>
            <button type="button" className="clear-btn" onClick={clearFile}>
              ×
            </button>
          </div>
        )}

        <div className="action-bar">
          <button
            type="submit"
            className={`submit-btn ${loading ? "loading" : ""}`}
            disabled={!file || loading}
          >
            {loading
              ? "Processing..."
              : `${mode === "compress" ? "Compress" : "Decompress"} File`}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UploadForm;
