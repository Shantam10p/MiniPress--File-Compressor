// src/components/UploadForm.jsx
import React, { useState } from "react";
import { formatBytes } from "../utils/fileHelpers";
import FileIcon from "./FileIcon";

function UploadForm({ onUpload }) {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return;

    setIsLoading(true);

    // Create FormData for backend-ready implementation
    const formData = new FormData();
    formData.append("file", file);

    // Simulate backend processing
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const fileInfo = {
        originalFile: file,
        originalSize: formatBytes(file.size),
        compressedSize: formatBytes(file.size * 0.6),
        compressionRatio: "40%",
        downloadUrl: URL.createObjectURL(file), // Just a placeholder
      };

      onUpload(fileInfo);
    } catch (error) {
      console.error("Error compressing file:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <form className="upload-form" onSubmit={handleSubmit}>
        {!file ? (
          <div
            className={`file-input-container ${dragActive ? "active" : ""}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file-upload"
              onChange={handleChange}
              disabled={isLoading}
            />
            <div className="file-input-label">
              <FileIcon />
              <p>Drag and drop your file here or click to browse</p>
            </div>
          </div>
        ) : (
          <div className="file-details">
            <div className="file-preview">
              <FileIcon />
              <div className="file-info">
                <h3 className="file-name">{file.name}</h3>
                <div className="file-meta">
                  <span className="file-type">
                    {file.type || "Unknown type"}
                  </span>
                  <span className="file-size">{formatBytes(file.size)}</span>
                </div>
              </div>
            </div>

            <div className="upload-actions">
              <button
                type="submit"
                disabled={isLoading}
                className={isLoading ? "loading" : ""}
              >
                {isLoading ? "Compressing..." : "Compress File"}
              </button>

              <button
                type="button"
                className="button-secondary"
                onClick={() => setFile(null)}
                disabled={isLoading}
              >
                Change File
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default UploadForm;
