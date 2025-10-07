# 🚀 Quick Start: Deploy & Rank #1 (15 Minutes)

## Step 1: Deploy to Production (5 min)

### Option A: Vercel CLI (Fastest)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd /Users/jaime/Calculator
vercel --prod
```

### Option B: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import from GitHub: `Phyeory/Calculator`
4. Click "Deploy"
5. ✅ Live in 2 minutes!

---

## Step 2: Update Your Domain (2 min)

After deployment, Vercel gives you a URL like: `calculator-abc123.vercel.app`

**Update these 3 files with YOUR domain:**

### File 1: `src/app/sitemap.ts`
```typescript
// Line 5 - Change this:
const baseUrl = 'https://ismycalculatorallowed.com';

// To your domain:
const baseUrl = 'https://calculator-abc123.vercel.app';
// Or your custom domain: 'https://yourdomain.com'
```

### File 2: `src/app/layout.tsx`
```typescript
// Line 9 - Change this:
metadataBase: new URL('https://ismycalculatorallowed.com'),

// To your domain:
metadataBase: new URL('https://calculator-abc123.vercel.app'),
```

### File 3: `src/lib/schema.ts`
```typescript
// Line 105 & 112 - Change these URLs to your domain
```

**Then redeploy:**
```bash
git add .
git commit -m "Update domain URLs"
git push
vercel --prod
```

---

## Step 3: Google Search Console (5 min)

### A. Go to Search Console
🔗 https://search.google.com/search-console

### B. Add Property
1. Click **"Add Property"**
2. Choose **"URL prefix"**
3. Enter: `https://your-deployed-url.vercel.app`
4. Click **"Continue"**

### C. Verify (Choose easiest method)

#### Method 1: HTML File ⭐ RECOMMENDED
```bash
# 1. Google gives you a file: google1234567890abcdef.html
# 2. Download it
# 3. Move to public folder:
mv ~/Downloads/google*.html public/

# 4. Deploy:
git add public/google*.html
git commit -m "Add Google verification"
git push
vercel --prod

# 5. Click "VERIFY" in Google Search Console
```

#### Method 2: Meta Tag (Already prepared!)
```typescript
// In src/app/layout.tsx, replace:
verification: {
  google: "YOUR_GOOGLE_VERIFICATION_CODE_HERE"
}

// With code from Google Search Console, example:
verification: {
  google: "abc123def456ghi789"
}

// Then deploy:
git add src/app/layout.tsx
git commit -m "Add Google verification meta tag"
git push
vercel --prod
```

### D. Submit Sitemap
1. In Search Console, click **"Sitemaps"** (left menu)
2. Enter: `sitemap.xml`
3. Click **"Submit"**
4. ✅ Success!

---

## Step 4: Request Indexing (3 min)

**Speed up ranking - tell Google to index your pages NOW:**

1. Click **"URL Inspection"** in Search Console
2. Enter each URL below (one at a time)
3. Click **"Request Indexing"**

**Do these 10 URLs first:**
```
https://your-url.vercel.app
https://your-url.vercel.app/exam/gcse
https://your-url.vercel.app/exam/sat
https://your-url.vercel.app/exam/a-level
https://your-url.vercel.app/exam/ib
https://your-url.vercel.app/exam/act
https://your-url.vercel.app/calculator/casio-fx-991ex
https://your-url.vercel.app/calculator/ti-84-plus-ce
https://your-url.vercel.app/calculator/ti-nspire-cx-ii
https://your-url.vercel.app/search
```

⏱️ Takes 30 seconds per URL
📈 Indexed in 24-48 hours instead of weeks!

---

## Step 5: Share & Promote (Optional, 5 min)

**Get initial traffic:**

### Reddit Posts (Karma boost + SEO)
- r/GCSE: "Free tool to check if your calculator is allowed"
- r/SAT: "Is your calculator SAT-approved? Check instantly"
- r/IBO: "IB calculator rules checker - all calculators"
- r/ApStudents: "AP exam calculator verification tool"

### Twitter/X
```
🧮 New free tool: Check if YOUR calculator is allowed in any exam

✅ GCSE, A-Level, IB, SAT, ACT, AP
✅ Instant results
✅ Official sources linked

Try it: [your-url]

#GCSE #SAT #IB #ApExams
```

---

## ✅ Verification Checklist

**After 15 minutes, you should have:**

- [ ] Site deployed to Vercel (live URL)
- [ ] Domain updated in code
- [ ] Google Search Console verified
- [ ] Sitemap submitted
- [ ] Top 10 pages indexed
- [ ] Shared on 1-2 platforms

---

## 📊 What to Monitor (Next 7 Days)

### Day 1-2:
- [ ] Check "Coverage" in Search Console - pages discovered?
- [ ] Test all pages load correctly on production

### Day 3-5:
- [ ] Check "Coverage" again - pages indexed?
- [ ] Look for first impressions in "Performance" report

### Day 6-7:
- [ ] Check keyword rankings (use Google Search Console)
- [ ] Monitor clicks and impressions
- [ ] Fix any indexing errors

---

## 🎯 Expected Results

### Week 1:
- **Indexed:** 27 pages
- **Impressions:** 100-500
- **Clicks:** 5-20
- **Position:** 30-50

### Month 1:
- **Impressions:** 1,000-5,000
- **Clicks:** 50-200
- **Position:** 15-30
- **Rankings:** 50+ keywords

### Month 3:
- **Impressions:** 10,000+
- **Clicks:** 500-1,000
- **Position:** 5-15
- **Rankings:** 200+ keywords, some #1 🏆

---

## 🆘 Troubleshooting

### "Site not verified"
- ✅ Check verification file is accessible: visit `https://your-url.vercel.app/google*.html`
- ✅ Wait 5 minutes and try again
- ✅ Try meta tag method instead

### "Sitemap couldn't be read"
- ✅ Visit `https://your-url.vercel.app/sitemap.xml` in browser
- ✅ Should show XML with all URLs
- ✅ Resubmit in Search Console

### "Page not indexed"
- ✅ Use URL Inspection
- ✅ Click "Request Indexing"
- ✅ Wait 24-48 hours
- ✅ Check again

---

## 🏆 Success!

**You're done! Your site is now:**
- ✅ Live in production
- ✅ Verified in Google Search Console
- ✅ Sitemap submitted
- ✅ Being indexed by Google
- ✅ Ready to rank #1

**Next steps:**
- Monitor Search Console weekly
- Add more exam data as it updates
- Build backlinks in month 2
- Track progress to position #1

---

## 📚 Additional Resources

**Read these for more details:**
- `GOOGLE_SEARCH_CONSOLE.md` - Full GSC guide
- `SEO_STRATEGY.md` - Complete SEO roadmap
- `DEPLOYMENT.md` - Advanced deployment
- `RANK_1_SUMMARY.md` - What makes you rank #1

**Your 15-minute setup is complete! 🎉**

Watch the rankings climb in Google Search Console → Performance tab.

**First #1 ranking expected: Week 2-4 for long-tail queries** 🏆
