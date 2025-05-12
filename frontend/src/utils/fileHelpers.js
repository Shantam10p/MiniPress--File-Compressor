// src/utils/fileHelpers.js

// Format bytes to human-readable format
export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

// Calculate compression percentage
export const calculateCompressionRatio = (originalSize, compressedSize) => {
  const ratio = ((originalSize - compressedSize) / originalSize) * 100;
  return ratio.toFixed(1) + "%";
};

/**
 * Extract file extension from filename
 */
export const getFileExtension = (filename) => {
  if (!filename) return '';
  // More robust extension extraction
  const lastDotIndex = filename.lastIndexOf(".");
  if (lastDotIndex === -1) return ''; // No extension found
  return filename.substring(lastDotIndex + 1);
};

/**
 * Format file size to human-readable format
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

/**
 * Check if a file is valid for compression/decompression
 */
export const validateFile = (file, allowedExtensions, maxSize) => {
  if (!file) return { valid: false, error: "No file selected" };

  // Check file size
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File too large. Maximum size: ${formatFileSize(maxSize)}`,
    };
  }

  // Check file extension
  const extension = getFileExtension(file.name).toLowerCase();
  if (!allowedExtensions.includes(`.${extension}`)) {
    return {
      valid: false,
      error: `Invalid file type. Supported formats: ${allowedExtensions.join(
        ", "
      )}`,
    };
  }

  return { valid: true };
};
