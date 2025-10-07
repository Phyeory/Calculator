# 🚀 Quick Image Download - Copy & Paste Commands

## Fastest Way to Get Real Calculator Images

Run these commands one by one in your terminal. These use publicly available images:

```bash
cd /Users/jaime/Calculator/public/images/calculators

# 1. Casio fx-991EX (from public CDN)
curl -L -o casio-fx-991ex.jpg "https://m.media-amazon.com/images/I/61lQJ9W0AFL._AC_SL1500_.jpg"

# 2. Casio fx-83GTX (from public CDN)
curl -L -o casio-fx-83gtx.jpg "https://m.media-amazon.com/images/I/61J8zLqxOJL._AC_SL1000_.jpg"

# 3. Casio fx-85GTX (from public CDN)
curl -L -o casio-fx-85gtx.jpg "https://m.media-amazon.com/images/I/61xCHt7JQGL._AC_SL1000_.jpg"

# 4. TI-84 Plus CE (from public CDN)
curl -L -o ti-84-plus-ce.jpg "https://m.media-amazon.com/images/I/61uUXSdTQbL._AC_SL1500_.jpg"

# 5. TI-30XS MultiView (from public CDN)
curl -L -o ti-30xs.jpg "https://m.media-amazon.com/images/I/61eYRXGNH3L._AC_SL1000_.jpg"

# 6. TI-Nspire CX II (from public CDN)
curl -L -o ti-nspire-cx-ii.jpg "https://m.media-amazon.com/images/I/51YqmOtxCDL._AC_SL1000_.jpg"

# 7. TI-Nspire CX II CAS (from public CDN)
curl -L -o ti-nspire-cx-ii-cas.jpg "https://m.media-amazon.com/images/I/51lXsXXD9kL._AC_SL1000_.jpg"

# 8. HP Prime (from public CDN)
curl -L -o hp-prime.jpg "https://m.media-amazon.com/images/I/51sNCvVN6rL._AC_SL1000_.jpg"

# 9. Casio fx-9860GIII (from public CDN)
curl -L -o casio-fx-9860giii.jpg "https://m.media-amazon.com/images/I/61-L4v0QPQL._AC_SL1000_.jpg"

# 10. Casio fx-CG50 (from public CDN)
curl -L -o casio-fx-cg50.jpg "https://m.media-amazon.com/images/I/51MpZl3KXOL._AC_SL1000_.jpg"

echo "✅ All images downloaded!"
```

## Convert to WebP (Optional but Recommended)

If you have `cwebp` installed:

```bash
cd /Users/jaime/Calculator/public/images/calculators

# Install webp tools
brew install webp

# Convert all JPG to WebP
for img in *.jpg; do
    cwebp -q 85 "$img" -o "${img%.jpg}.webp"
    rm "$img"
done

echo "✅ Converted to WebP format!"
```

## Alternative: Use Unsplash (High Quality, Free)

```bash
cd /Users/jaime/Calculator/public/images/calculators

# Generic calculator images (high quality, royalty-free)
curl -L -o casio-fx-991ex.jpg "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=800&fit=crop&q=80"
curl -L -o ti-84-plus-ce.jpg "https://images.unsplash.com/photo-1595453639662-f7c0e63c4dfd?w=800&h=800&fit=crop&q=80"
curl -L -o hp-prime.jpg "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&h=800&fit=crop&q=80"
```

## Manual Download (Most Reliable)

### Direct Download Links:

1. **Casio fx-991EX**: https://www.amazon.com/dp/B01N07OCBV → Click image → Right-click "Save As" → `casio-fx-991ex.jpg`

2. **Casio fx-83GTX**: https://www.amazon.co.uk/dp/B01N0TT79O → Save image → `casio-fx-83gtx.jpg`

3. **TI-84 Plus CE**: https://www.amazon.com/dp/B00TFYYWQA → Save image → `ti-84-plus-ce.jpg`

4. **HP Prime**: https://www.amazon.com/dp/B00VNM3JMY → Save image → `hp-prime.jpg`

### Steps:
1. Click the link
2. Click on the main product image to enlarge
3. Right-click → "Save Image As..."
4. Save to: `/Users/jaime/Calculator/public/images/calculators/`
5. Use exact filename (e.g., `casio-fx-991ex.jpg`)

## Verify Images

```bash
ls -lh /Users/jaime/Calculator/public/images/calculators/
```

You should see all 10 image files.

## Test on Website

```bash
cd /Users/jaime/Calculator
npm run build
npm run dev
```

Visit: http://localhost:3000/calculator/casio-fx-991ex

---

**Choose whichever method works best for you!** 🎉
