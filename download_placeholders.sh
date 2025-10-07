#!/bin/bash
# Generate professional placeholder images for calculators using placeholder services

IMG_DIR="public/images/calculators"
cd "$(dirname "$0")"

echo "🖼️  Downloading calculator placeholder images..."
echo "=================================================="

# Function to download placeholder
download_placeholder() {
    local model=$1
    local filename=$2
    local color=$3
    
    echo "📥 Downloading placeholder for $model..."
    
    # Using placeholder.com with custom text and colors
    local url="https://via.placeholder.com/800x800/${color}/ffffff?text=${model// /+}"
    
    if curl -L -f -s -o "$IMG_DIR/$filename" "$url"; then
        echo "✅ Downloaded $filename"
        return 0
    else
        echo "❌ Failed to download $filename"
        return 1
    fi
}

# Download placeholders with appropriate colors
download_placeholder "CASIO+fx-991EX" "casio-fx-991ex.webp" "2563eb"
download_placeholder "CASIO+fx-83GTX" "casio-fx-83gtx.webp" "2563eb"
download_placeholder "CASIO+fx-85GTX" "casio-fx-85gtx.webp" "2563eb"
download_placeholder "CASIO+fx-9860GIII" "casio-fx-9860giii.webp" "1e40af"
download_placeholder "CASIO+fx-CG50" "casio-fx-cg50.webp" "7c3aed"
download_placeholder "TI-30XS" "ti-30xs.webp" "059669"
download_placeholder "TI-84+Plus+CE" "ti-84-plus-ce.webp" "0891b2"
download_placeholder "TI-Nspire+CX+II" "ti-nspire-cx-ii.webp" "0369a1"
download_placeholder "TI-Nspire+CX+II+CAS" "ti-nspire-cx-ii-cas.webp" "0c4a6e"
download_placeholder "HP+Prime" "hp-prime.webp" "dc2626"

echo ""
echo "=================================================="
echo "✅ Placeholder images downloaded!"
echo ""
echo "⚠️  These are temporary placeholders. For production, use:"
echo "   1. Official product images from manufacturers"
echo "   2. See CALCULATOR_IMAGES_GUIDE.md for direct links"
echo "   3. Or take photos of actual calculators"
