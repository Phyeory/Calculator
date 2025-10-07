#!/usr/bin/env python3
"""
Download real calculator images from online sources.
Uses royalty-free and manufacturer official images.
"""

import urllib.request
import os
from pathlib import Path

# Image directory
img_dir = Path(__file__).parent / "public" / "images" / "calculators"
img_dir.mkdir(parents=True, exist_ok=True)

# High-quality calculator images from various sources
# Using manufacturer websites, Wikipedia, and royalty-free sources
calculator_images = {
    "casio-fx-991ex.webp": "https://www.casio-intl.com/mea/en/calc/products/fx-991ex/img/fx-991ex.png",
    "casio-fx-83gtx.webp": "https://www.casio-intl.com/mea/en/calc/products/fx-83gtx/img/fx-83gtx.png",
    "casio-fx-85gtx.webp": "https://www.casio-intl.com/mea/en/calc/products/fx-85gtx/img/fx-85gtx.png",
    "casio-fx-9860giii.webp": "https://www.casio-intl.com/mea/en/calc/products/fx-9860giii/img/fx-9860giii.png",
    "casio-fx-cg50.webp": "https://www.casio-intl.com/mea/en/calc/products/fx-cg50/img/fx-cg50.png",
    "ti-30xs.webp": "https://education.ti.com/~/media/images/products/calculators/scientific/ti30xs/ti30xsmultiview_straight.png",
    "ti-84-plus-ce.webp": "https://education.ti.com/~/media/images/products/calculators/graphing/ti84-plus-ce/ti84plusce_straight.png",
    "ti-nspire-cx-ii.webp": "https://education.ti.com/~/media/images/products/calculators/graphing/ti-nspire-cx-ii/tinspire_cx_ii_straight.png",
    "ti-nspire-cx-ii-cas.webp": "https://education.ti.com/~/media/images/products/calculators/graphing/ti-nspire-cx-ii-cas/tinspire_cx_ii_cas_straight.png",
    "hp-prime.webp": "https://www.hp.com/wcc/images/products/small/c06739803-png.png",
}

# Fallback URLs from alternative sources
fallback_urls = {
    "casio-fx-991ex.webp": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Casio_fx-991EX_calculator.jpg/800px-Casio_fx-991EX_calculator.jpg",
    "ti-84-plus-ce.webp": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/TI-84_Plus_CE.jpg/800px-TI-84_Plus_CE.jpg",
    "hp-prime.webp": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/HP_Prime_Calculator.jpg/800px-HP_Prime_Calculator.jpg",
}

def download_image(url, filepath):
    """Download an image from URL to filepath"""
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'}
        req = urllib.request.Request(url, headers=headers)
        
        print(f"Downloading {filepath.name}...")
        with urllib.request.urlopen(req, timeout=10) as response:
            if response.status == 200:
                with open(filepath, 'wb') as f:
                    f.write(response.read())
                print(f"✓ Successfully downloaded {filepath.name}")
                return True
    except Exception as e:
        print(f"✗ Failed to download {filepath.name}: {e}")
    return False

def main():
    print("🖼️  Downloading calculator images...")
    print("=" * 50)
    
    success_count = 0
    
    for filename, url in calculator_images.items():
        filepath = img_dir / filename
        
        # Try primary URL
        if download_image(url, filepath):
            success_count += 1
        # Try fallback URL if available
        elif filename in fallback_urls:
            print(f"  Trying fallback URL...")
            if download_image(fallback_urls[filename], filepath):
                success_count += 1
    
    print("=" * 50)
    print(f"✓ Downloaded {success_count}/{len(calculator_images)} images successfully!")
    
    if success_count < len(calculator_images):
        print("\n⚠️  Some images failed to download.")
        print("   You may need to manually download them from:")
        print("   - Manufacturer websites (Casio, TI, HP)")
        print("   - Wikipedia Commons")
        print("   - Google Images (with usage rights filter)")

if __name__ == "__main__":
    main()
