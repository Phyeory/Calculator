import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Is my calculator allowed? — Global exam calculator rules 2025",
    template: "%s | Is My Calculator Allowed"
  },
  description: "Find out in seconds whether your Casio, TI, HP, or Sharp calculator is allowed in GCSE, A-Level, IB, SAT, IIT-JEE and more. Images, quick notes, and official sources.",
  keywords: ["calculator", "exam rules", "GCSE", "A-Level", "SAT", "ACT", "IB", "IIT-JEE", "allowed calculators", "calculator policy", "exam calculator", "scientific calculator", "graphing calculator"],
  authors: [{ name: "Is My Calculator Allowed" }],
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE_HERE" // Replace with actual code from Google Search Console
  },
  metadataBase: new URL('https://ismycalculatorallowed.com'), // Replace with your actual domain
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/calculator-icon.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    shortcut: '/calculator-icon.png'
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ismycalculatorallowed.com",
    siteName: "Is My Calculator Allowed",
    title: "Is my calculator allowed? — Global exam calculator rules 2025",
    description: "Check if your calculator is allowed in any exam worldwide",
    images: [
      {
        url: "/calculator-icon.png",
        width: 512,
        height: 512,
        alt: "Is My Calculator Allowed - Calculator Icon"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Is my calculator allowed? — Global exam calculator rules 2025",
    description: "Check if your calculator is allowed in any exam worldwide",
    images: ["/calculator-icon.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
