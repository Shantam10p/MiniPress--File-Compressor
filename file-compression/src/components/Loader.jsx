import React from "react";

function Loader({ message = "Processing your file..." }) {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p className="loader-text">{message}</p>
    </div>
  );
}

export default Loader;
