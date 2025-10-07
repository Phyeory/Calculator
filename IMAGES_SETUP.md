# 📸 Calculator Images - Complete Setup Guide

## Current Status
✅ Build working with 58 static pages
✅ Image slots ready in `/public/images/calculators/`
⏳ Currently using SVG placeholders (need real images)

---

## 🎯 RECOMMENDED APPROACH

### Option 1: Manual Download from Amazon (Best Quality, 5 minutes)

**Why Amazon?**
- High-quality product photos
- Consistent white backgrounds
- All calculators available
- No copyright issues for product display

**Steps:**

1. **Open each link** → Click main image → Right-click "Save Image As..."
2. **Save to**: `/Users/jaime/Calculator/public/images/calculators/`
3. **Use these exact filenames**:

| Calculator | Amazon Link | Filename |
|------------|-------------|----------|
| Casio fx-991EX | [Link](https://www.amazon.com/Casio-FX-991EX-Scientific-Calculator/dp/B01N07OCBV) | `casio-fx-991ex.jpg` |
| Casio fx-83GTX | [Link](https://www.amazon.co.uk/Casio-FX-83GTX-Scientific-Calculator/dp/B01N0TT79O) | `casio-fx-83gtx.jpg` |
| Casio fx-85GTX | [Link](https://www.amazon.co.uk/Casio-FX-85GTX-Scientific-Calculator/dp/B01N0TTA5E) | `casio-fx-85gtx.jpg` |
| Casio fx-9860GIII | [Link](https://www.amazon.com/Casio-FX-9860GIII-Graphing-Calculator/dp/B082N9GGXP) | `casio-fx-9860giii.jpg` |
| Casio fx-CG50 | [Link](https://www.amazon.com/Casio-fx-CG50-PRIZM-Graphing-Calculator/dp/B01LXC7C6M) | `casio-fx-cg50.jpg` |
| TI-30XS | [Link](https://www.amazon.com/Texas-Instruments-MultiView-Scientific-Calculator/dp/B004NBZB2Y) | `ti-30xs.jpg` |
| TI-84 Plus CE | [Link](https://www.amazon.com/Texas-Instruments-Plus-Graphing-Calculator/dp/B00TFYYWQA) | `ti-84-plus-ce.jpg` |
| TI-Nspire CX II | [Link](https://www.amazon.com/Texas-Instruments-Nspire-Graphing-Calculator/dp/B07VJQQ5KQ) | `ti-nspire-cx-ii.jpg` |
| TI-Nspire CX II CAS | [Link](https://www.amazon.com/Texas-Instruments-TI-Nspire-Graphing-Calculator/dp/B07VJSMSG9) | `ti-nspire-cx-ii-cas.jpg` |
| HP Prime | [Link](https://www.amazon.com/HP-Prime-Graphing-Calculator/dp/B00VNM3JMY) | `hp-prime.jpg` |

**Time**: ~5 minutes total

---

### Option 2: Automated Download (If you want to try)

Create and run this script:

```bash
#!/bin/bash
# download_real_images.sh

cd /Users/jaime/Calculator/public/images/calculators

# These are direct image URLs (may change over time)
curl -L -o casio-fx-991ex.jpg "https://m.media-amazon.com/images/I/61lQJ9W0AFL._AC_SL1500_.jpg" 2>/dev/null &
curl -L -o casio-fx-83gtx.jpg "https://m.media-amazon.com/images/I/61J8zLqxOJL._AC_SL1000_.jpg" 2>/dev/null &
curl -L -o ti-84-plus-ce.jpg "https://m.media-amazon.com/images/I/61uUXSdTQbL._AC_SL1500_.jpg" 2>/dev/null &
curl -L -o hp-prime.jpg "https://m.media-amazon.com/images/I/51sNCvVN6rL._AC_SL1000_.jpg" 2>/dev/null &

wait
echo "✅ Downloaded images!"
ls -lh *.jpg
```

Then run:
```bash
chmod +x download_real_images.sh
./download_real_images.sh
```

---

### Option 3: Keep Placeholders (Temporary)

If you want to deploy quickly, keep the current SVG placeholders and add real images later.

---

## 🔄 After Getting Images

### 1. Optimize Images (Optional but recommended)

```bash
# Install optimization tools
brew install webp imagemagick

# Convert to WebP (smaller file size)
cd /Users/jaime/Calculator/public/images/calculators
for img in *.jpg; do
  cwebp -q 85 "$img" -o "${img%.jpg}.webp"
  rm "$img"
done

# Or resize/optimize JPGs
for img in *.jpg; do
  convert "$img" -resize 800x800 -quality 85 "$img"
done
```

### 2. Update Image References (if needed)

Your code already points to the right files:
```typescript
// In calculator JSON files
"image": "casio-fx-991ex.webp"  // or .jpg
```

### 3. Rebuild and Test

```bash
cd /Users/jaime/Calculator

# Build
npm run build

# Test locally
npm run dev
```

Visit: http://localhost:3000/calculator/casio-fx-991ex

### 4. Deploy

```bash
# Push to Git
git add public/images/calculators/
git commit -m "Add real calculator images"
git push

# Deploy (if using Render)
# Automatic deployment on push

# Or deploy to Vercel
vercel --prod
```

---

## 📋 Image Specifications

**Requirements:**
- ✅ Format: JPG, PNG, or WebP
- ✅ Size: 800x800px minimum
- ✅ Background: White or transparent
- ✅ Quality: High resolution, clear details
- ✅ Orientation: Front-facing, straight on

**File Naming:**
- Must match calculator slug from JSON
- Lowercase with dashes
- Examples:
  - `casio-fx-991ex.webp`
  - `ti-84-plus-ce.jpg`
  - `hp-prime.png`

---

## ⚖️ Legal / Copyright

### ✅ Safe for Product Display:
- Amazon product images (for factual product information)
- Official manufacturer images (educational/informational use)
- Wikipedia Commons (public domain)
- Your own photos

### 📝 Best Practices:
- Use images to identify products only
- Don't imply manufacturer endorsement
- Add attribution if required
- For commercial use, get proper licenses

### 🔒 Fair Use:
Product images for factual information about calculator compatibility are generally considered fair use for educational/informational purposes.

---

## 🚀 Quick Start (Choose One)

### Fast Track (5 minutes):
1. Open the 10 Amazon links above
2. Download each image
3. Save to `/public/images/calculators/`
4. Run `npm run build`
5. Deploy!

### Automated (1 minute):
1. Copy the script from Option 2 above
2. Save as `download_real_images.sh`
3. Run: `chmod +x download_real_images.sh && ./download_real_images.sh`
4. Run `npm run build`
5. Deploy!

### Keep Placeholders (0 minutes):
1. Deploy as-is
2. Add real images later
3. Redeploy when ready

---

## ✅ Checklist

- [ ] Choose download method (Manual/Automated/Placeholder)
- [ ] Download all 10 calculator images
- [ ] Verify images are in `/public/images/calculators/`
- [ ] Verify filenames match JSON slugs exactly
- [ ] (Optional) Convert to WebP for optimization
- [ ] (Optional) Resize to 800x800px
- [ ] Test locally: `npm run dev`
- [ ] Build: `npm run build`
- [ ] Verify build successful
- [ ] Deploy to production
- [ ] Test all calculator pages show images

---

## 🆘 Troubleshooting

### Images not showing:
1. Check filename matches JSON exactly
2. Check file extension (`.webp`, `.jpg`, or `.png`)
3. Verify files are in `/public/images/calculators/`
4. Clear browser cache
5. Rebuild: `npm run build`

### Images too large:
```bash
# Optimize with ImageMagick
convert image.jpg -resize 800x800 -quality 85 image.jpg

# Or convert to WebP
cwebp -q 85 image.jpg -o image.webp
```

### Permission errors:
```bash
chmod 644 public/images/calculators/*
```

---

## 📞 Need Help?

**Resources:**
- Image Guide: See `CALCULATOR_IMAGES_GUIDE.md`
- Quick Download: See `QUICK_IMAGE_DOWNLOAD.md`
- Build Issues: Run `npm run build` and check errors

**Pro Tip:** Start with 3-4 images for the most popular calculators (fx-991EX, TI-84, etc.), then add the rest later!

---

**Ready to add images! Choose your method above and follow the steps.** 🎉

**Recommended: Manual download from Amazon (5 min, best quality)** ⭐
