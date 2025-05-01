import React from "react";

function Privacy() {
  return (
    <div className="page-container card">
      <h1>Privacy Policy</h1>

      <div className="content-section">
        <p className="updated-date">Last Updated: May 1, 2025</p>

        <h2>Your Privacy Matters</h2>
        <p>
          At MiniPress, we take your privacy seriously. This policy explains our
          practices regarding data collection and usage when you use our file
          compression service.
        </p>

        <h3>Information Collection</h3>
        <p>
          <strong>Browser-Based Processing:</strong> All file compression
          happens directly in your browser. Your files are never uploaded to our
          servers for processing.
        </p>

        <p>
          <strong>Usage Analytics:</strong> We collect anonymous usage
          statistics to improve our service, including compression ratios
          achieved and features used. This data cannot be tied to individual
          users.
        </p>

        <h3>Data Security</h3>
        <p>
          Since files are processed locally in your browser, they remain secure
          on your device. We implement industry-standard security measures to
          protect any interaction with our service.
        </p>

        <h3>Third-Party Services</h3>
        <p>
          MiniPress uses minimal third-party services to operate our website.
          These include:
        </p>
        <ul>
          <li>Hosting provider</li>
          <li>Analytics platform</li>
        </ul>
        <p>
          Each of these providers has their own privacy policies, which we
          encourage you to review.
        </p>

        <h3>Changes To This Policy</h3>
        <p>
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page.
        </p>
      </div>
    </div>
  );
}

export default Privacy;
