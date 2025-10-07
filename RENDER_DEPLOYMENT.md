# Deploy to Render.com - Step by Step Guide

## 🚀 Quick Deploy (5 Minutes)

### Prerequisites
- GitHub repository pushed with latest code
- Render.com account (free)

---

## Step 1: Push Your Code to GitHub

Make sure all files are committed and pushed:

```bash
cd /Users/jaime/Calculator

# Check git status
git status

# If you have changes, commit them:
git add .
git commit -m "Add Render deployment config"
git push origin main
```

---

## Step 2: Deploy on Render.com

### A. Go to Render Dashboard
1. Visit: **https://render.com**
2. **Sign up** or **Log in** (use GitHub login for easier setup)

### B. Create New Web Service
1. Click **"New +"** button (top right)
2. Select **"Web Service"**

### C. Connect Repository
1. Click **"Connect a repository"** or **"Build and deploy from a Git repository"**
2. If first time: Click **"Configure account"** to authorize GitHub
3. Find and select: **`Phyeory/Calculator`**
4. Click **"Connect"**

### D. Configure Service

Fill in these settings:

| Setting | Value |
|---------|-------|
| **Name** | `is-my-calculator-allowed` (or any name) |
| **Region** | Choose closest to your target audience |
| **Branch** | `main` |
| **Root Directory** | Leave empty |
| **Runtime** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` (or paid plan) |

### E. Environment Variables (Optional)
Click **"Advanced"** → **"Add Environment Variable"**

```
NODE_ENV = production
```

### F. Deploy!
1. Click **"Create Web Service"** button
2. ⏳ Wait 3-5 minutes for first build
3. ✅ Your site will be live at: `https://is-my-calculator-allowed.onrender.com`

---

## Step 3: Update Your Domain in Code

After deployment, you'll get a URL like: `https://your-app-name.onrender.com`

**Update these files with your Render URL:**

### File 1: `src/app/sitemap.ts`
```typescript
const baseUrl = 'https://your-app-name.onrender.com';
```

### File 2: `src/app/layout.tsx`
```typescript
metadataBase: new URL('https://your-app-name.onrender.com'),
```

### File 3: `src/lib/schema.ts`
Update the URLs in the schema functions

**Then push and redeploy:**
```bash
git add .
git commit -m "Update domain URLs for Render"
git push
```

Render will auto-deploy on every push to `main` branch! 🎉

---

## Step 4: Custom Domain (Optional)

### Add Your Own Domain
1. In Render Dashboard, open your web service
2. Go to **"Settings"** tab
3. Scroll to **"Custom Domains"**
4. Click **"Add Custom Domain"**
5. Enter your domain: `ismycalculatorallowed.com`
6. Follow DNS instructions to add:
   - **CNAME record** pointing to Render

**Example DNS setup:**
```
Type: CNAME
Name: www
Value: your-app-name.onrender.com
```

For apex domain (no www):
```
Type: A
Name: @
Value: [IP provided by Render]
```

---

## 📊 Render.com Features

### ✅ What You Get (Free Plan)
- **Automatic deploys** on git push
- **Free SSL certificate** (HTTPS)
- **Custom domain support**
- **Build & deploy logs**
- **Environment variables**
- **Auto-scaling** (on paid plans)

### ⚠️ Free Plan Limitations
- **Spins down after 15 min inactivity** (first load slow ~30 sec)
- **750 hours/month** (still plenty!)
- Limited bandwidth
- No build cache (slower builds)

### 💰 Upgrade to Paid ($7/mo)
- **Always on** (no spin down)
- **Faster builds** with cache
- **More resources**
- **Better performance**

---

## 🔧 Troubleshooting

### Build Fails
**Check build logs in Render dashboard:**
1. Click on your service
2. Go to **"Logs"** tab
3. Look for errors

**Common fixes:**
```bash
# If Node version issue, add to render.yaml:
engines:
  node: "20.x"
```

### Site Shows 404
**Make sure Start Command is correct:**
```
npm start
```

**And package.json has:**
```json
"scripts": {
  "start": "next start"
}
```

### Environment Variables Not Working
1. Go to **"Environment"** tab
2. Click **"Add Environment Variable"**
3. Make sure `NODE_ENV=production` is set

---

## 🚀 Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Render account created
- [ ] Repository connected
- [ ] Build command: `npm install && npm run build`
- [ ] Start command: `npm start`
- [ ] Service created and deployed
- [ ] Site accessible at `.onrender.com` URL
- [ ] Domain URLs updated in code
- [ ] Changes pushed (auto-redeploys)
- [ ] Custom domain added (optional)

---

## 🔄 Auto-Deploy Workflow

From now on, every time you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update calculator data"
git push origin main

# Render automatically:
# 1. Detects push
# 2. Runs build
# 3. Deploys new version
# 4. Site updated in ~3 min
```

---

## 📈 After Deployment

### Monitor Your Site
1. **Render Dashboard**: Check logs, metrics, uptime
2. **Google Search Console**: Submit sitemap after deployment
3. **Analytics**: Add GA4 tracking code

### Optimize Performance
1. **Upgrade to paid plan** to avoid spin down
2. **Add CDN** for faster global access
3. **Enable caching** in headers

---

## 🆚 Render vs Vercel

| Feature | Render.com | Vercel |
|---------|-----------|--------|
| **Free Plan** | 750 hrs, spins down | Always on, 100GB bandwidth |
| **Build Time** | 2-5 min | 1-2 min |
| **Deploy Speed** | Good | Excellent |
| **Custom Domain** | ✅ Free | ✅ Free |
| **SSL** | ✅ Auto | ✅ Auto |
| **Best For** | Full-stack apps | Next.js/Static sites |

**Verdict**: For Next.js SEO sites, **Vercel is better** (faster, always on, built for Next.js)

---

## ✅ You're Live!

Your site is now:
- 🌐 Live at `https://your-app-name.onrender.com`
- 🔒 Secured with HTTPS
- 🔄 Auto-deploys on every git push
- 📈 Ready for Google Search Console

**Next Steps:**
1. Visit your live site
2. Test all pages work
3. Submit to Google Search Console (see `GOOGLE_SEARCH_CONSOLE.md`)
4. Share and get traffic!

---

## 🆘 Need Help?

**Render Documentation:**
- https://render.com/docs/deploy-nextjs

**Your Config File:**
- `render.yaml` (already created!)

**Support:**
- Render Community: https://community.render.com
- GitHub Issues: https://github.com/Phyeory/Calculator/issues

---

**Happy deploying! 🚀**

Your Next.js calculator app is production-ready on Render.com!
