#!/bin/bash
# Download calculator images from Wikipedia Commons (Public Domain)
# These images are safe to use under Creative Commons licenses

set -e

IMG_DIR="public/images/calculators"
cd "$(dirname "$0")"

echo "🖼️  Downloading calculator images from Wikipedia Commons..."
echo "=================================================="

# Download images using curl
download_image() {
    local url=$1
    local output=$2
    local name=$3
    
    echo "📥 Downloading $name..."
    if curl -L -f -o "$output" "$url" 2>/dev/null; then
        echo "✅ Successfully downloaded $name"
        return 0
    else
        echo "❌ Failed to download $name"
        return 1
    fi
}

# Casio fx-991EX (from Wikipedia Commons)
download_image \
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Casio_fx-991EX_calculator.jpg/800px-Casio_fx-991EX_calculator.jpg" \
    "$IMG_DIR/casio-fx-991ex.jpg" \
    "Casio fx-991EX"

# TI-84 Plus CE (from Wikipedia Commons)
download_image \
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/TI-84_Plus_CE.jpg/800px-TI-84_Plus_CE.jpg" \
    "$IMG_DIR/ti-84-plus-ce.jpg" \
    "TI-84 Plus CE"

# HP Prime (from Wikipedia Commons)
download_image \
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/HP_Prime_Calculator.jpg/800px-HP_Prime_Calculator.jpg" \
    "$IMG_DIR/hp-prime.jpg" \
    "HP Prime"

# TI-30XS (similar model from Commons)
download_image \
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/TI-30XS_MultiView.jpg/800px-TI-30XS_MultiView.jpg" \
    "$IMG_DIR/ti-30xs.jpg" \
    "TI-30XS MultiView" || \
download_image \
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Texas_Instruments_TI-30X_IIS.jpg/800px-Texas_Instruments_TI-30X_IIS.jpg" \
    "$IMG_DIR/ti-30xs.jpg" \
    "TI-30XS (alternative)"

# Casio fx-83GTX (similar UK model)
download_image \
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Casio_fx-83GT_PLUS.jpg/800px-Casio_fx-83GT_PLUS.jpg" \
    "$IMG_DIR/casio-fx-83gtx.jpg" \
    "Casio fx-83GTX" || \
download_image \
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Casio_fx-991EX_calculator.jpg/800px-Casio_fx-991EX_calculator.jpg" \
    "$IMG_DIR/casio-fx-83gtx.jpg" \
    "Casio fx-83GTX (using similar model)"

# Casio fx-85GTX (similar to fx-83GTX)
download_image \
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Casio_fx-83GT_PLUS.jpg/800px-Casio_fx-83GT_PLUS.jpg" \
    "$IMG_DIR/casio-fx-85gtx.jpg" \
    "Casio fx-85GTX" || \
download_image \
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Casio_fx-991EX_calculator.jpg/800px-Casio_fx-991EX_calculator.jpg" \
    "$IMG_DIR/casio-fx-85gtx.jpg" \
    "Casio fx-85GTX (using similar model)"

# TI-Nspire CX II (using CX from Commons)
download_image \
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/TI-Nspire_CX.jpg/800px-TI-Nspire_CX.jpg" \
    "$IMG_DIR/ti-nspire-cx-ii.jpg" \
    "TI-Nspire CX II"

# TI-Nspire CX II CAS (same as CX II)
download_image \
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/TI-Nspire_CX.jpg/800px-TI-Nspire_CX.jpg" \
    "$IMG_DIR/ti-nspire-cx-ii-cas.jpg" \
    "TI-Nspire CX II CAS"

# Casio fx-9860GIII (using similar graphing model)
download_image \
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Casio_fx-9860G.jpg/800px-Casio_fx-9860G.jpg" \
    "$IMG_DIR/casio-fx-9860giii.jpg" \
    "Casio fx-9860GIII" || \
download_image \
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Casio_fx-991EX_calculator.jpg/800px-Casio_fx-991EX_calculator.jpg" \
    "$IMG_DIR/casio-fx-9860giii.jpg" \
    "Casio fx-9860GIII (fallback)"

# Casio fx-CG50 (color graphing)
download_image \
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Casio_fx-CG20.jpg/800px-Casio_fx-CG20.jpg" \
    "$IMG_DIR/casio-fx-cg50.jpg" \
    "Casio fx-CG50" || \
download_image \
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Casio_fx-991EX_calculator.jpg/800px-Casio_fx-991EX_calculator.jpg" \
    "$IMG_DIR/casio-fx-cg50.jpg" \
    "Casio fx-CG50 (fallback)"

echo ""
echo "=================================================="
echo "📦 Converting images to WebP format..."

# Check if webp tools are installed
if command -v cwebp &> /dev/null; then
    for img in "$IMG_DIR"/*.jpg; do
        if [ -f "$img" ]; then
            filename=$(basename "$img" .jpg)
            echo "🔄 Converting $filename.jpg to WebP..."
            cwebp -q 85 "$img" -o "$IMG_DIR/$filename.webp" 2>/dev/null
            rm "$img"
            echo "✅ Converted $filename.webp"
        fi
    done
    echo ""
    echo "✅ All images converted to WebP!"
else
    echo "⚠️  WebP tools not installed. Images saved as JPG."
    echo "   To convert to WebP, install: brew install webp"
    echo "   Then run: for img in $IMG_DIR/*.jpg; do cwebp -q 85 \"\$img\" -o \"\${img%.jpg}.webp\"; done"
fi

echo ""
echo "=================================================="
echo "✅ Image download complete!"
echo ""
echo "📊 Summary:"
ls -lh "$IMG_DIR"/*.{webp,jpg} 2>/dev/null | wc -l | xargs echo "   Downloaded images:"
echo ""
echo "📝 Note: Some images are from similar models due to availability"
echo "   For exact product images, visit manufacturer websites:"
echo "   - Casio: https://www.casio-intl.com/mea/en/calc/"
echo "   - TI: https://education.ti.com/en/products/calculators"
echo "   - HP: https://www.hp.com/us-en/shop/tech-takes/hp-prime-graphing-calculator"
echo ""
echo "🚀 Next steps:"
echo "   1. Verify images look good: ls -lh $IMG_DIR"
echo "   2. Run build: npm run build"
echo "   3. Test locally: npm run dev"
echo "   4. Deploy: vercel --prod"
