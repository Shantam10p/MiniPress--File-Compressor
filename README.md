# MiniPress File Compressor

## Overview

MiniPress File Compressor is a Python-based project that compresses and decompresses text files using Huffman coding. It features a user-friendly frontend for file upload and download, and a robust backend that handles the core logic for compression and decompression. This project is developed as part of an academic course on Algoithms and Structured Programming, demonstrating the practical application of theoretical concepts to solve real-world problems.

## Features

- **File Compression**: Reduces the size of text files using Huffman coding.
- **File Decompression**: Restores compressed files to their original form.
- **User-Friendly Interface**: Simple and intuitive frontend for file operations.
- **Error Handling**: Manages edge cases like empty files and unsupported formats.
- **Binary File Handling**: Stores compressed data with metadata headers.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, Vite.js
- **Backend**: Python (Flask or similar framework)
- **Algorithm**: Huffman Coding (Greedy Algorithm)

## Gif Demo
![MiniPress-Gif](https://github.com/user-attachments/assets/2f9f574a-7e46-4cf7-874d-212f9c980daf)


## Project Structure

```
MiniPress--File-Compressor/
├── backend/
│   ├── app.py                # Backend server
│   ├── huffman.py            # Huffman coding logic
│   ├── compressed/           # Directory for compressed files
│   ├── decompressed/         # Directory for decompressed files
│   ├── uploads/              # Directory for uploaded files
│   └── env_name/             # Virtual environment
├── frontend/
│   ├── index.html            # Main HTML file
│   ├── package.json          # Frontend dependencies
│   ├── vite.config.js        # Vite.js configuration
│   └── src/                  # Frontend source files
└── README.md                 # Project documentation
```

## Installation

### Prerequisites

- Python 3.10 or higher
- Node.js and npm

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv env_name
   .\env_name\Scripts\activate  # On Windows
   source env_name/bin/activate  # On macOS/Linux
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the backend server:
   ```bash
   python app.py
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Open the frontend in your browser (usually at `http://localhost:3000`).
2. Upload a text file for compression or decompression.
3. Click the appropriate button to compress or decompress the file.
4. Download the resulting file.

## Algorithm Details

### Huffman Coding

Huffman coding is a greedy algorithm that minimizes the average length of codes assigned to characters based on their frequencies. It uses a binary tree (Huffman Tree) to generate prefix-free binary codes for each character.

#### Steps:

1. Calculate the frequency of each character in the input text.
2. Build a priority queue with nodes representing characters and their frequencies.
3. Construct the Huffman Tree by repeatedly combining the two smallest nodes.
4. Generate binary codes by traversing the tree.
5. Use the codes to compress and decompress the text.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push to your branch.
4. Submit a pull request.
