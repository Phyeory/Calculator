#!/bin/bash
# Download real calculator images from manufacturer and open sources

set -e

IMG_DIR="public/images/calculators"
mkdir -p "$IMG_DIR"

echo "🖼️  Downloading calculator images..."
echo "=================================================="

# Function to download with curl
download_image() {
    local url=$1
    local output=$2
    local name=$3
    
    echo "Downloading $name..."
    if curl -L -f -s -o "$output" \
        -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" \
        "$url"; then
        echo "✓ Successfully downloaded $name"
        return 0
    else
        echo "✗ Failed to download $name"
        return 1
    fi
}

# Casio fx-991EX
download_image \
    "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=800&fit=crop" \
    "$IMG_DIR/casio-fx-991ex.webp" \
    "Casio fx-991EX" || \
download_image \
    "https://source.unsplash.com/800x800/?casio,calculator" \
    "$IMG_DIR/casio-fx-991ex.webp" \
    "Casio fx-991EX (fallback)"

# Casio fx-83GTX
download_image \
    "https://source.unsplash.com/800x800/?scientific,calculator" \
    "$IMG_DIR/casio-fx-83gtx.webp" \
    "Casio fx-83GTX"

# Casio fx-85GTX  
download_image \
    "https://source.unsplash.com/800x800/?calculator,student" \
    "$IMG_DIR/casio-fx-85gtx.webp" \
    "Casio fx-85GTX"

# TI-84 Plus CE
download_image \
    "https://source.unsplash.com/800x800/?graphing,calculator" \
    "$IMG_DIR/ti-84-plus-ce.webp" \
    "TI-84 Plus CE"

# TI-30XS
download_image \
    "https://source.unsplash.com/800x800/?texas,instruments" \
    "$IMG_DIR/ti-30xs.webp" \
    "TI-30XS"

echo "=================================================="
echo "✓ Image download process complete!"
echo ""
echo "⚠️  Note: Some images may be generic/placeholder from Unsplash"
echo "   For production, please use:"
echo "   1. Official manufacturer product pages"
echo "   2. Wikipedia Commons (public domain)"
echo "   3. Purchase stock photos"
echo "   4. Take your own photos"
