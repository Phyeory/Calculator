# Google Search Console Verification Guide

## Method 1: HTML File Upload (Recommended)

1. **Go to Google Search Console**
   - Visit: https://search.google.com/search-console
   - Click "Add Property"
   - Choose "URL prefix" and enter your domain (e.g., https://ismycalculatorallowed.com)

2. **Download Verification File**
   - Google will provide a file like `google1234567890abcdef.html`
   - Download this file

3. **Upload to Your Project**
   - Place the file in `/public/` directory
   - The file is already accessible at: `https://yourdomain.com/google1234567890abcdef.html`

4. **Verify**
   - Click "Verify" in Google Search Console
   - You're done! ✅

## Method 2: HTML Meta Tag

Add this to your `src/app/layout.tsx` in the metadata:

```typescript
export const metadata: Metadata = {
  // ... existing metadata
  verification: {
    google: 'YOUR_VERIFICATION_CODE_HERE'
  }
}
```

Replace `YOUR_VERIFICATION_CODE_HERE` with the code from Google Search Console.

## Method 3: DNS Verification

If you control DNS:

1. Go to your domain registrar (Namecheap, GoDaddy, etc.)
2. Add a TXT record with the value provided by Google
3. Wait for DNS propagation (up to 48 hours)
4. Verify in Google Search Console

## After Verification

### Submit Your Sitemap

1. In Google Search Console, go to "Sitemaps"
2. Enter: `https://yourdomain.com/sitemap.xml`
3. Click "Submit"

### Request Indexing for Key Pages

Go to "URL Inspection" and request indexing for:

1. Homepage: `https://yourdomain.com`
2. Top Exams:
   - `https://yourdomain.com/exam/gcse`
   - `https://yourdomain.com/exam/sat`
   - `https://yourdomain.com/exam/ib`
   - `https://yourdomain.com/exam/a-level`
3. Top Calculators:
   - `https://yourdomain.com/calculator/casio-fx-991ex`
   - `https://yourdomain.com/calculator/ti-84-plus-ce`

### Monitor Performance

- Check "Performance" report weekly
- Review "Coverage" for indexing issues
- Monitor "Core Web Vitals"

## Bing Webmaster Tools

Also add your site to Bing:

1. Visit: https://www.bing.com/webmasters
2. Add your site
3. Verify using similar methods
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`

## Current Status

- ✅ Sitemap ready at `/sitemap.xml`
- ✅ Robots.txt ready at `/robots.txt`
- ✅ Structured data (JSON-LD) on all pages
- ✅ Meta tags optimized
- ✅ Open Graph images configured
- ⏳ Waiting for you to verify ownership

**Your Next Step:** Deploy to production, then complete Google Search Console verification!
