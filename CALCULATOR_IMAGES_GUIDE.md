# 📸 Calculator Images - Download Guide

## Overview
This guide provides direct links to download high-quality, official calculator images for your website.

---

## 🎯 Quick Download Links

### Casio Calculators

#### 1. **Casio fx-991EX ClassWiz**
- **Official Product Page**: https://www.casio.com/intl/scientific-calculators/product.FX-991EX/
- **Image Sources**:
  - Direct: https://www.casio-intl.com/mea/en/calc/products/fx-991ex/
  - Wikipedia: https://commons.wikimedia.org/wiki/File:Casio_fx-991EX_calculator.jpg
  - Amazon Product Image: https://www.amazon.com/Casio-FX-991EX-Scientific-Calculator/dp/B01N07OCBV
- **Recommended**: Download from official Casio page or use Wikipedia Commons

#### 2. **Casio fx-83GTX**
- **Official Product Page**: https://www.casio.com/intl/scientific-calculators/product.FX-83GTPLUS/
- **Image Sources**:
  - UK Casio: https://www.casio.co.uk/products/calculators/scientific/fx-83gtx
  - Amazon: https://www.amazon.co.uk/Casio-FX-83GTX-Scientific-Calculator/dp/B01N0TT79O
- **Note**: Very popular in UK schools

#### 3. **Casio fx-85GTX**
- **Official Product Page**: https://www.casio.co.uk/products/calculators/scientific/fx-85gtx
- **Image Sources**:
  - Same as fx-83GTX but silver model
  - Amazon UK: https://www.amazon.co.uk/Casio-FX-85GTX-Scientific-Calculator/dp/B01N0TTA5E

#### 4. **Casio fx-9860GIII**
- **Official Product Page**: https://www.casio.com/intl/scientific-calculators/product.FX-9860GIII/
- **Image Sources**:
  - Direct: https://www.casio-intl.com/asia/en/calc/products/fx-9860giii/
  - Download high-res from product page

#### 5. **Casio fx-CG50**
- **Official Product Page**: https://www.casio.com/intl/scientific-calculators/product.FX-CG50/
- **Image Sources**:
  - Direct: https://www.casio-intl.com/asia/en/calc/products/fx-cg50/
  - Color graphing calculator with high-res images available

---

### Texas Instruments (TI) Calculators

#### 6. **TI-30XS MultiView**
- **Official Product Page**: https://education.ti.com/en/products/calculators/scientific-calculators/ti-30xs-multiview
- **Image Sources**:
  - TI Education: https://education.ti.com/en/products/calculators/scientific-calculators/ti-30xs-multiview
  - Download from product page (high quality PNG)
  - Amazon: https://www.amazon.com/Texas-Instruments-MultiView-Scientific-Calculator/dp/B004NBZB2Y

#### 7. **TI-84 Plus CE**
- **Official Product Page**: https://education.ti.com/en/products/calculators/graphing-calculators/ti-84-plus-ce
- **Image Sources**:
  - TI Education: Direct download from product page
  - Multiple colors available (choose one)
  - Wikipedia: https://commons.wikimedia.org/wiki/File:TI-84_Plus_CE.jpg
  - Amazon: https://www.amazon.com/Texas-Instruments-Plus-Graphing-Calculator/dp/B00TFYYWQA

#### 8. **TI-Nspire CX II**
- **Official Product Page**: https://education.ti.com/en/products/calculators/graphing-calculators/ti-nspire-cx-ii
- **Image Sources**:
  - TI Education: https://education.ti.com/en/products/calculators/graphing-calculators/ti-nspire-cx-ii
  - High-res product images available

#### 9. **TI-Nspire CX II CAS**
- **Official Product Page**: https://education.ti.com/en/products/calculators/graphing-calculators/ti-nspire-cx-ii-cas
- **Image Sources**:
  - TI Education: https://education.ti.com/en/products/calculators/graphing-calculators/ti-nspire-cx-ii-cas
  - Same as CX II but with "CAS" branding

---

### HP Calculators

#### 10. **HP Prime**
- **Official Product Page**: https://www.hp.com/us-en/shop/tech-takes/hp-prime-graphing-calculator
- **Image Sources**:
  - HP Store: https://www.hp.com/us-en/shop/pdp/hp-prime-graphing-calculator
  - Wikipedia: https://commons.wikimedia.org/wiki/File:HP_Prime_Calculator.jpg
  - Amazon: https://www.amazon.com/HP-Prime-Graphing-Calculator/dp/B00VNM3JMY

---

## 🛠️ How to Download Images

### Method 1: Manual Download (Recommended)

1. **Visit Official Product Pages** (links above)
2. **Right-click on product image** → "Save Image As..."
3. **Save with correct filename**:
   - `casio-fx-991ex.webp`
   - `ti-84-plus-ce.webp`
   - etc.
4. **Place in**: `/public/images/calculators/`

### Method 2: Using wget/curl

```bash
# Example: Download Casio fx-991EX from Wikipedia Commons
wget https://upload.wikimedia.org/wikipedia/commons/9/9e/Casio_fx-991EX_calculator.jpg \
  -O public/images/calculators/casio-fx-991ex.jpg

# Convert to WebP for optimization
# (if you have ImageMagick or cwebp installed)
convert public/images/calculators/casio-fx-991ex.jpg \
  public/images/calculators/casio-fx-991ex.webp
```

### Method 3: Amazon Product Images

Amazon has high-quality product photos:

1. Go to Amazon product page
2. Click on main product image
3. Right-click enlarged image → Save
4. Rename appropriately

**Amazon Links:**
- fx-991EX: `amazon.com/dp/B01N07OCBV`
- TI-84 Plus CE: `amazon.com/dp/B00TFYYWQA`
- HP Prime: `amazon.com/dp/B00VNM3JMY`

---

## 📐 Image Specifications

### Recommended Format:
- **Format**: WebP (or JPG/PNG)
- **Size**: 800x800px minimum
- **Aspect Ratio**: 1:1 (square) or 3:4 (portrait)
- **Background**: White or transparent
- **Quality**: High resolution, clear details

### File Naming Convention:
- Use slugs from JSON files
- Lowercase with dashes
- `.webp` extension
- Examples:
  - `casio-fx-991ex.webp`
  - `ti-84-plus-ce.webp`
  - `ti-nspire-cx-ii-cas.webp`

---

## 🎨 Image Optimization

After downloading, optimize images:

```bash
# Install tools (if needed)
brew install webp imagemagick

# Convert to WebP
for img in public/images/calculators/*.{jpg,png}; do
  cwebp -q 85 "$img" -o "${img%.*}.webp"
done

# Resize to 800x800
for img in public/images/calculators/*.webp; do
  convert "$img" -resize 800x800 -background white -gravity center -extent 800x800 "$img"
done
```

---

## ⚖️ Legal / Copyright

### Safe Sources:
1. ✅ **Wikipedia Commons** - Public domain/CC licensed
2. ✅ **Official Manufacturer Sites** - Usually allow product images for informational use
3. ✅ **Your Own Photos** - Take pictures of actual calculators
4. ✅ **Stock Photo Sites** - Purchase rights

### Risky Sources:
- ❌ Random Google Images (copyright issues)
- ❌ Other websites without permission

### Fair Use Considerations:
For educational/informational purposes showing product specifications:
- Use official product images
- Credit manufacturers
- Don't imply endorsement
- Use for identification only

---

## 🚀 Quick Start Commands

### 1. Download from Wikipedia Commons (Public Domain):

```bash
cd /Users/jaime/Calculator

# Casio fx-991EX
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Casio_fx-991EX_calculator.jpg/800px-Casio_fx-991EX_calculator.jpg" \
  -o public/images/calculators/casio-fx-991ex.jpg

# TI-84 Plus CE
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/TI-84_Plus_CE.jpg/800px-TI-84_Plus_CE.jpg" \
  -o public/images/calculators/ti-84-plus-ce.jpg

# HP Prime
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/HP_Prime_Calculator.jpg/800px-HP_Prime_Calculator.jpg" \
  -o public/images/calculators/hp-prime.jpg
```

### 2. Convert to WebP:

```bash
# Install webp if needed
brew install webp

# Convert all JPG to WebP
for img in public/images/calculators/*.jpg; do
  cwebp -q 85 "$img" -o "${img%.jpg}.webp"
  rm "$img"  # Remove original JPG
done
```

---

## 📋 Checklist

- [ ] Download all 10 calculator images
- [ ] Verify image quality (clear, high-res)
- [ ] Convert to WebP format
- [ ] Optimize file sizes (< 200KB each)
- [ ] Place in `/public/images/calculators/`
- [ ] Verify filenames match JSON slugs
- [ ] Test images load on website
- [ ] Check mobile responsive display
- [ ] Add image credits if required
- [ ] Rebuild and deploy

---

## 🔄 Alternative: Use Placeholder Service

If you can't find good images immediately, use a placeholder service:

```typescript
// In calculator page component
const imageUrl = calc.image 
  ? `/images/calculators/${calc.image}`
  : `https://placehold.co/800x800/e2e8f0/1e293b?text=${encodeURIComponent(calc.model)}`;
```

This creates nice placeholder images with the model name until you get real ones.

---

## 📞 Contact Manufacturers

For official high-res images, contact:

**Casio**: https://www.casio.com/intl/contact/
**Texas Instruments**: https://education.ti.com/en/contact-us
**HP**: https://www.hp.com/us-en/contact-hp

Request permission to use product images for educational/informational purposes.

---

**Next Steps:**
1. Start with Wikipedia Commons downloads (100% legal)
2. Visit official product pages for higher quality
3. Optimize and convert to WebP
4. Replace placeholder SVGs
5. Rebuild and deploy!

Good luck! 🎉
