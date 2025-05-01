import React from "react";

function FAQ() {
  return (
    <div className="page-container card">
      <h1>Frequently Asked Questions</h1>

      <div className="faq-list">
        <div className="faq-item">
          <h3>How does file compression work?</h3>
          <p>
            File compression reduces file size by identifying and eliminating
            redundancies in data. MiniPress uses advanced algorithms that
            analyze file content and apply the most efficient compression method
            for each file type.
          </p>
        </div>

        <div className="faq-item">
          <h3>Is my data secure when using MiniPress?</h3>
          <p>
            Absolutely! MiniPress processes all files directly in your browser.
            Your files never leave your device, ensuring complete privacy and
            security.
          </p>
        </div>

        <div className="faq-item">
          <h3>What file types can I compress?</h3>
          <p>
            MiniPress supports a wide range of file types including documents
            (PDF, DOC, PPT), images (JPG, PNG, GIF), and more. Each file type is
            compressed using specialized techniques to maximize efficiency.
          </p>
        </div>

        <div className="faq-item">
          <h3>Is there a file size limit?</h3>
          <p>
            The free version allows compression of files up to 50MB. For larger
            files, consider upgrading to MiniPress Pro.
          </p>
        </div>

        <div className="faq-item">
          <h3>Will compression affect file quality?</h3>
          <p>
            MiniPress uses smart compression to balance size reduction with
            quality preservation. For most use cases, you won't notice any
            quality difference in the compressed files.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
