# Is My Calculator Allowed? - Project Instructions

## Project Overview
Production-ready Next.js web app for checking calculator permissions across global exams. SEO-first architecture with static generation and ISR.

## Tech Stack
- Next.js 14+ with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- JSON-based data structure
- Vercel for deployment

## Development Guidelines
- Use TypeScript strict mode
- Follow Next.js App Router patterns
- Optimize for Core Web Vitals
- Keep data models in /data folder
- Generate static pages for all exams and calculators
- Implement ISR for data updates

## SEO Requirements
- Static page generation for all exam and calculator pages
- Structured data (FAQPage, Product, ItemList)
- Optimized meta tags and Open Graph
- Sitemap and robots.txt generation
- Image optimization with next/image

## Data Structure
- Exams: /data/exams/<exam-slug>.json
- Calculators: /data/calculators/<model-slug>.json
- Images: /public/images/calculators/<slug>.webp

## Deployment
- Primary: Vercel
- CI/CD: GitHub Actions
- Analytics: GA4
- Monitoring: Sentry
