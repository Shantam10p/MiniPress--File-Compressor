from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flasgger import Swagger
import os
import time
from huffman import compress, decompress, calculate_compression_ratio

app = Flask(__name__)
CORS(app)

swagger = Swagger(app, template={
    "swagger": "2.0",
    "info": {
        "title": "MiniPress File Compressor API",
        "description": "Compress .txt files using Huffman Coding",
        "version": "1.0"
    }
})

# Create directories for uploads, compressed files, and decompressed files
UPLOAD_FOLDER = 'uploads'
COMPRESSED_FOLDER = 'compressed'
DECOMPRESSED_FOLDER = 'decompressed'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(COMPRESSED_FOLDER, exist_ok=True)
os.makedirs(DECOMPRESSED_FOLDER, exist_ok=True)

@app.route('/api/compress', methods=['POST'])
def compress_file():
    """
    Compress a .txt file using Huffman Coding
    ---
    consumes:
      - multipart/form-data
    parameters:
      - name: file
        in: formData
        type: file
        required: true
        description: Upload your .txt file to compress
    responses:
      200:
        description: Compression success
        examples:
          application/json: {
            "originalSize": 1024,
            "compressedSize": 512,
            "compressionRatio": 50.0,
            "downloadUrl": "/download/compressed_sample.bin",
            "processingTime": 0.123
          }
      400:
        description: Error in request
      500:
        description: Server error
    """
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files['file']
        if not file.filename:
            return jsonify({"error": "Empty filename"}), 400
            
        filename = file.filename
        base_name = os.path.splitext(filename)[0]
        original_path = os.path.join(UPLOAD_FOLDER, filename)
        compressed_path = os.path.join(COMPRESSED_FOLDER, f"{base_name}.bin")

        file.save(original_path)

        # Read file as binary for better compatibility with various encodings
        with open(original_path, 'rb') as f:
            binary_data = f.read()
            
        # Convert to text if it's a text file
        try:
            text = binary_data.decode('utf-8')
        except UnicodeDecodeError:
            return jsonify({"error": "Not a valid text file or unsupported encoding"}), 400
            
        # Measure compression time
        start_time = time.time()
        compressed_data = compress(text)
        end_time = time.time()
        processing_time = round(end_time - start_time, 3)

        # Save compressed file
        with open(compressed_path, 'wb') as f:
            f.write(compressed_data)

        # Calculate sizes and ratio
        original_size = os.path.getsize(original_path)
        compressed_size = os.path.getsize(compressed_path)
        compression_ratio = calculate_compression_ratio(original_size, compressed_size)

        return jsonify({
            "originalSize": original_size,
            "compressedSize": compressed_size,
            "compressionRatio": compression_ratio,
            "downloadUrl": f"/download/compressed/{base_name}.bin",
            "processingTime": processing_time
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/decompress', methods=['POST'])
def decompress_file():
    """
    Decompress a previously compressed file
    ---
    consumes:
      - multipart/form-data
    parameters:
      - name: file
        in: formData
        type: file
        required: true
        description: Upload your compressed .bin file to decompress
    responses:
      200:
        description: Decompression success
        examples:
          application/json: {
            "decompressedSize": 1024,
            "downloadUrl": "/download/decompressed/original_file.txt",
            "processingTime": 0.123
          }
      400:
        description: Error in request
      500:
        description: Server error
    """
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files['file']
        if not file.filename:
            return jsonify({"error": "Empty filename"}), 400
        
        filename = file.filename
        base_name = os.path.splitext(filename)[0]
        compressed_path = os.path.join(COMPRESSED_FOLDER, filename)
        decompressed_path = os.path.join(DECOMPRESSED_FOLDER, f"{base_name}.txt")
        
        file.save(compressed_path)
        
        # Read compressed data
        with open(compressed_path, 'rb') as f:
            compressed_data = f.read()
            
        # Measure decompression time
        start_time = time.time()
        decompressed_text = decompress(compressed_data)
        end_time = time.time()
        processing_time = round(end_time - start_time, 3)
        
        # Save decompressed text
        with open(decompressed_path, 'w', encoding='utf-8') as f:
            f.write(decompressed_text)
            
        decompressed_size = os.path.getsize(decompressed_path)
        
        return jsonify({
            "decompressedSize": decompressed_size,
            "downloadUrl": f"/download/decompressed/{base_name}.txt",
            "processingTime": processing_time
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/download/<path:type>/<path:filename>', methods=['GET'])
def download_file(type, filename):
    """
    Download a file
    ---
    parameters:
      - name: type
        in: path
        type: string
        required: true
        description: Type of file (compressed or decompressed)
      - name: filename
        in: path
        type: string
        required: true
        description: Filename to download
    responses:
      200:
        description: File download
      404:
        description: File not found
    """
    if type == 'compressed':
        return send_from_directory(COMPRESSED_FOLDER, filename, as_attachment=True)
    elif type == 'decompressed':
        return send_from_directory(DECOMPRESSED_FOLDER, filename, as_attachment=True)
    else:
        return jsonify({"error": "Invalid file type"}), 400

@app.route('/')
def index():
    return "MiniPress Backend Running. Use /apidocs for API documentation."

if __name__ == '__main__':
    print("🚀 Server running at http://localhost:5000")
    app.run(debug=True)
