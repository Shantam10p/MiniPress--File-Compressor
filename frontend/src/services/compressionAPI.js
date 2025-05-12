import { API_BASE_URL } from "../config";

export const compressFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_BASE_URL}/api/compress`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Compression failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Compression error:", error);
    throw error;
  }
};

export const decompressFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_BASE_URL}/api/decompress`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Decompression failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Decompression error:", error);
    throw error;
  }
};

export const downloadFile = (url) => {
  window.open(API_BASE_URL + url, "_blank");
};
