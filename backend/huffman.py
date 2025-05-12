# =====================================
# Huffman Coding Logic - MiniPress
# =====================================

import heapq
from collections import Counter
import pickle
import struct

# ===============================
# Node Class for Huffman Tree
# ===============================

class Node:
    def __init__(self, freq, char, left=None, right=None):
        self.freq = freq
        self.char = char
        self.left = left
        self.right = right

    def __lt__(self, other):
        return self.freq < other.freq

# ===============================
# Function to Build Huffman Tree
# ===============================

def build_tree(text):
    frequency = Counter(text)
    heap = [Node(freq, char) for char, freq in frequency.items()]
    heapq.heapify(heap)

    while len(heap) > 1:
        left = heapq.heappop(heap)
        right = heapq.heappop(heap)
        merged = Node(left.freq + right.freq, None, left, right)
        heapq.heappush(heap, merged)

    return heap[0] if heap else None

# ===============================
# Function to Build Huffman Codes
# ===============================

def build_codes(node, prefix="", codebook=None):
    if codebook is None:
        codebook = {}
    if node:
        if node.char is not None:
            codebook[node.char] = prefix or '0'  # Handle single character case
        else:
            build_codes(node.left, prefix + "0", codebook)
            build_codes(node.right, prefix + "1", codebook)
    return codebook

# ===============================
# Compression Function
# ===============================

def compress(text):
    """Compress text using Huffman coding and return compressed binary data"""
    if not text:
        return b''

    # Build Huffman Tree and Codebook
    tree = build_tree(text)
    codebook = build_codes(tree)

    # Encode text to bitstring
    encoded = ''.join(codebook[char] for char in text)

    # Pad the bitstring to make it divisible by 8
    padding = 8 - (len(encoded) % 8) if len(encoded) % 8 != 0 else 0
    encoded += '0' * padding

    # Convert bitstring to bytes
    byte_array = bytearray()
    for i in range(0, len(encoded), 8):
        byte = encoded[i:i+8]
        byte_array.append(int(byte, 2))

    # Serialize codebook and build header
    serialized_codebook = pickle.dumps(codebook)
    header = struct.pack('!I', len(serialized_codebook)) + bytes([padding])

    # Return header + codebook + compressed data
    return header + serialized_codebook + bytes(byte_array)

# ===============================
# Decompression Function
# ===============================

def decompress(data):
    """Decompress Huffman-encoded data back to original text"""
    if not data:
        return ""

    # Extract header
    codebook_size = struct.unpack('!I', data[:4])[0]
    padding = data[4]

    # Deserialize codebook
    serialized_codebook = data[5:5+codebook_size]
    codebook = pickle.loads(serialized_codebook)
    reverse_codebook = {code: char for char, code in codebook.items()}

    # Decode bitstring from compressed data
    compressed_data = data[5+codebook_size:]
    bit_string = ""
    for byte in compressed_data:
        bit_string += format(byte, '08b')

    # Remove padding
    if padding:
        bit_string = bit_string[:-padding]

    # Decode text using reversed codebook
    decoded_text = ""
    current_code = ""
    for bit in bit_string:
        current_code += bit
        if current_code in reverse_codebook:
            decoded_text += reverse_codebook[current_code]
            current_code = ""

    return decoded_text

# ===============================
# Compression Ratio Calculation
# ===============================

def calculate_compression_ratio(original_size, compressed_size):
    """Calculate compression ratio as a percentage of space saved"""
    if original_size == 0:
        return 0
    saved = original_size - compressed_size
    return round((saved / original_size) * 100, 2)
