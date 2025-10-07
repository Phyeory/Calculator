# Is My Calculator Allowed? 📐

A production-ready, SEO-first Next.js web application that helps students worldwide instantly check whether their calculator model is permitted in specific exams.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/calculator)

## 🎯 Features

- ✅ **Comprehensive Exam Coverage**: GCSE, A-Level, IB, SAT, ACT, AP, IIT-JEE, NEET, CBSE, and more
- 🔍 **Advanced Search**: Search by calculator model or exam name with real-time results
- 📊 **Detailed Information**: View allowed, banned, and conditional calculators for each exam
- 🎨 **Responsive Design**: Optimized for mobile, tablet, and desktop
- ⚡ **Fast Performance**: Static generation with ISR for optimal Core Web Vitals
- 🔎 **SEO Optimized**: Structured data, meta tags, sitemaps, and Open Graph support
- 🌙 **Dark Mode**: Automatic dark mode support
- ♿ **Accessible**: WCAG AA compliant with keyboard navigation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/is-my-calculator-allowed.git
cd is-my-calculator-allowed

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📁 Project Structure

```
├── data/
│   ├── exams/           # Exam JSON files
│   └── calculators/     # Calculator JSON files
├── public/
│   └── images/
│       └── calculators/ # Calculator product images
├── src/
│   ├── app/            # Next.js app router pages
│   │   ├── exam/[slug]/      # Dynamic exam pages
│   │   ├── calculator/[slug]/ # Dynamic calculator pages
│   │   ├── search/           # Search page
│   │   └── api/              # API routes
│   ├── lib/            # Utility functions
│   └── types/          # TypeScript type definitions
├── .github/
│   └── workflows/      # GitHub Actions CI/CD
└── vercel.json         # Vercel configuration
```

## 📝 Adding New Data

### Adding a New Exam

1. Create a new JSON file in `/data/exams/<exam-slug>.json`:

```json
{
  "slug": "exam-slug",
  "name": "Exam Full Name",
  "regions": ["Region"],
  "boards": ["Board1", "Board2"],
  "last_updated": "2025-09-01",
  "notes": "General notes about calculator rules",
  "allowed": ["calculator-slug-1", "calculator-slug-2"],
  "conditional": [
    {
      "model": "calculator-slug-3",
      "condition": "Specific conditions for this model"
    }
  ],
  "banned": ["calculator-slug-4"],
  "official_links": [
    {
      "title": "Official Policy",
      "url": "https://example.com/policy"
    }
  ]
}
```

2. The page will be automatically generated at `/exam/<exam-slug>`

### Adding a New Calculator

1. Create a new JSON file in `/data/calculators/<calculator-slug>.json`:

```json
{
  "slug": "calculator-slug",
  "brand": "Brand Name",
  "model": "Model Name",
  "image": "/images/calculators/calculator-slug.webp",
  "alt_text": "Descriptive alt text",
  "type": "scientific",
  "features": {
    "graphing": false,
    "programmable": false,
    "symbolic": false,
    "examMode": false,
    "cas": false
  },
  "notes": "Description of the calculator",
  "related_models": ["related-slug-1", "related-slug-2"]
}
```

2. Add a product image to `/public/images/calculators/<calculator-slug>.webp`
3. The page will be automatically generated at `/calculator/<calculator-slug>`

## 🏗️ Build and Deploy

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com/new)
3. Vercel will automatically detect Next.js and configure build settings
4. Deploy!

Or use the Vercel CLI:

```bash
npm install -g vercel
vercel
```

### Environment Variables

No environment variables are required for basic functionality. Optional:

- `NEXT_PUBLIC_GA_ID`: Google Analytics 4 Measurement ID
- `SENTRY_DSN`: Sentry error monitoring DSN

## 🔧 Configuration

### Next.js Config (`next.config.js`)

- Image optimization configured for WebP and AVIF
- Security headers included
- Custom cache headers for static assets

### Tailwind Config (`tailwind.config.ts`)

- Custom color schemes
- Responsive breakpoints
- Dark mode support

## 📊 SEO Features

### Structured Data

- **FAQPage** schema on exam pages
- **Product** schema on calculator pages
- **ItemList** schema for calculator lists
- **BreadcrumbList** for navigation

### Meta Tags

- Dynamic title and description per page
- Open Graph tags for social sharing
- Twitter Card support
- Canonical URLs

### Sitemap

Automatically generated at `/sitemap.xml` including:
- Homepage
- All exam pages
- All calculator pages
- Search and info pages

### Robots.txt

Generated at `/robots.txt` with proper crawl directives

## 🎨 Customization

### Styling

The app uses Tailwind CSS. Modify `tailwind.config.ts` for:
- Colors
- Typography
- Spacing
- Breakpoints

### Branding

Update these files:
- `/public/favicon.ico`
- `/public/og-image.png`
- `/src/app/layout.tsx` (metadata)

## 📈 Analytics & Monitoring

### Google Analytics 4

Add GA4 in `/src/app/layout.tsx`:

```tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
  strategy="afterInteractive"
/>
```

### Sentry Error Monitoring

Install Sentry:

```bash
npm install @sentry/nextjs
```

Follow [Sentry Next.js setup](https://docs.sentry.io/platforms/javascript/guides/nextjs/)

## 🧪 Testing

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

### Build Test

```bash
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 Data Sources

All calculator rules are sourced from official exam board websites:

- **GCSE/A-Level**: AQA, Edexcel, OCR, WJEC official websites
- **IB**: International Baccalaureate Organization
- **SAT/ACT**: College Board, ACT Organization
- **IIT-JEE/NEET**: National Testing Agency (India)
- **CBSE**: Central Board of Secondary Education (India)

## ⚠️ Disclaimer

This website provides information for reference purposes only. Calculator rules can change. Always verify with your official exam board before the exam. We are not responsible for any exam-related decisions made based on this information.

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- Exam boards for publishing calculator policies
- Calculator manufacturers for product information
- Next.js team for the excellent framework

## 📞 Support

- Report issues: [GitHub Issues](https://github.com/yourusername/calculator/issues)
- Email: support@ismycalculatorallowed.com

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
