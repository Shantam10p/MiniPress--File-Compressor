import React from "react";

function FileIcon({ isAnimated = false }) {
  return (
    <div className="file-icon-animated">
      <div className="file-base"></div>
      <div className="file-fold"></div>
      <div className="file-line1"></div>
      <div className="file-line2"></div>
      <div className="file-line3"></div>
      {isAnimated && (
        <div className="compression-waves">
          <div className="wave wave1"></div>
          <div className="wave wave2"></div>
        </div>
      )}
    </div>
  );
}

export default FileIcon;
