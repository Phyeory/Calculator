# Deployment Guide - Is My Calculator Allowed?

## 🚀 Deploying to Vercel (Recommended)

### Option 1: Deploy via Vercel Dashboard

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Is My Calculator Allowed web app"
   git branch -M main
   git remote add origin https://github.com/yourusername/calculator.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js configuration
   - Click "Deploy"

3. **Configure Domain** (Optional)
   - In project settings, add your custom domain
   - Update DNS records as instructed
   - Vercel handles SSL automatically

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

## 📝 Environment Setup

### Required Secrets (GitHub Actions)

If using the included GitHub Actions workflow, add these secrets:

1. Go to GitHub repo → Settings → Secrets and variables → Actions
2. Add the following secrets:
   - `VERCEL_TOKEN`: Your Vercel account token
   - `VERCEL_ORG_ID`: Your Vercel organization ID
   - `VERCEL_PROJECT_ID`: Your Vercel project ID

To get these values:
```bash
# Install Vercel CLI
npm i -g vercel

# Link project
vercel link

# Get project info
cat .vercel/project.json
```

## 🔧 Configuration Checklist

### Before Deploying

- [ ] Update `baseUrl` in `src/app/sitemap.ts` to your actual domain
- [ ] Update `url` in `src/app/layout.tsx` metadata to your actual domain
- [ ] Replace placeholder calculator images with real product photos
- [ ] Verify all exam data is up-to-date
- [ ] Test build locally: `npm run build`
- [ ] Check lighthouse score: `npm run build && npx lighthouse http://localhost:3000`

### After Deploying

- [ ] Submit sitemap to Google Search Console: `https://yourdomain.com/sitemap.xml`
- [ ] Verify robots.txt: `https://yourdomain.com/robots.txt`
- [ ] Test all dynamic routes work
- [ ] Check Open Graph images display correctly on social media
- [ ] Set up Google Analytics (optional)
- [ ] Set up Sentry error monitoring (optional)

## 📊 Google Search Console Setup

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add your property (domain or URL prefix)
3. Verify ownership (use DNS or HTML file method)
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`
5. Request indexing for key pages:
   - Homepage
   - Top 10 exam pages
   - Top 10 calculator pages

## 🔍 SEO Optimization Steps

### Initial Launch (Week 1)

1. **Submit to Search Engines**
   - Google Search Console sitemap submission
   - Bing Webmaster Tools
   - Request indexing for all static pages

2. **Social Media**
   - Share on Reddit: r/ApStudents, r/GCSE, r/IBO
   - Twitter/X announcement
   - Facebook education groups

3. **Content Seeding**
   - Publish "Calculator Rules by Exam 2025" guide
   - Create comparison charts (allowed vs banned)
   - Write blog post: "How to Choose the Right Calculator for Your Exam"

### Ongoing (Monthly)

1. **Update Data**
   - Check official exam board websites for rule changes
   - Update `last_updated` dates
   - Add new calculator models as they're released

2. **Monitor Performance**
   - Check Google Search Console for crawl errors
   - Review Core Web Vitals
   - Monitor ranking for key queries

3. **Content Expansion**
   - Add more exams (regional variations)
   - Add calculator comparison tool
   - Add "exam mode" setup guides per calculator

## 🎯 Key Pages to Monitor

### High-Priority URLs for Ranking

```
/exam/gcse
/exam/a-level
/exam/sat
/exam/act
/exam/ib
/exam/ap-calculus
/exam/iit-jee
/calculator/casio-fx-991ex
/calculator/ti-84-plus-ce
/calculator/ti-nspire-cx-ii
```

## 📈 Analytics Setup (Optional)

### Google Analytics 4

1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to `src/app/layout.tsx`:

```tsx
import Script from 'next/script'

// In head or body
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

### Sentry Error Monitoring

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

Follow the wizard to set up Sentry.

## 🔄 Continuous Updates

### Data Update Workflow

1. **Edit exam or calculator JSON**
   ```bash
   # Edit file in /data/exams/ or /data/calculators/
   vim data/exams/gcse.json
   ```

2. **Update last_updated date**
   ```json
   "last_updated": "2025-10-07"
   ```

3. **Commit and push**
   ```bash
   git add data/
   git commit -m "Update GCSE calculator rules"
   git push
   ```

4. **Automatic deployment**
   - Vercel auto-deploys on push to main
   - Build takes ~2 minutes
   - Changes live immediately

### ISR (Incremental Static Regeneration)

Pages automatically revalidate. To force immediate update:

1. **Trigger revalidation via API** (future feature)
2. **Or redeploy**: `vercel --prod`

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### Images Not Loading

- Ensure images are in `/public/images/calculators/`
- Check file extensions match JSON (`.webp`)
- Verify image names match calculator slugs

### 404 on Dynamic Routes

- Run `npm run build` to regenerate static paths
- Check slug formatting (lowercase, hyphens)
- Verify JSON files exist in `/data/`

## 📱 Performance Optimization

### Image Optimization

```bash
# Convert images to WebP
npm install -g sharp-cli
sharp -i input.png -o output.webp --webp
```

### Lighthouse Score Target

- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100

Run audit:
```bash
npm run build
npm start
npx lighthouse http://localhost:3000 --view
```

## 🔒 Security

### Environment Variables

Never commit:
- API keys
- Database credentials
- Private tokens

Use Vercel environment variables for sensitive data.

### Content Security Policy

Add to `next.config.js` if needed:

```js
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com;"
        }
      ]
    }
  ]
}
```

## 📧 Support

For deployment issues:
- Vercel docs: https://vercel.com/docs
- Next.js docs: https://nextjs.org/docs
- GitHub issues: https://github.com/yourusername/calculator/issues

---

**Ready to deploy? Run `vercel --prod` or push to GitHub!** 🚀
