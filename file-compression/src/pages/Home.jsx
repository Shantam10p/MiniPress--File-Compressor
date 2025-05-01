// src/pages/Home.jsx
import React, { useState } from "react";
import UploadForm from "../components/UploadForm";
import ResultDisplay from "../components/ResultDisplay";
import Loader from "../components/Loader";
// Remove the Logo import since it's now in Layout
// import Logo from "../components/Logo";
import "../styles/index.css"; // Optional, if using shared styles

function Home() {
  const [fileInfo, setFileInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async (info) => {
    setIsLoading(true);

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setFileInfo(info);
    setIsLoading(false);
  };

  return (
    // Remove the container div and header that's duplicating Layout's header
    <div className="upload-section">
      {isLoading ? (
        <Loader message="Compressing your file..." />
      ) : fileInfo ? (
        <ResultDisplay fileInfo={fileInfo} />
      ) : (
        <UploadForm onUpload={handleUpload} />
      )}
    </div>
  );
}

export default Home;
