import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Ribas Karpaty - Premium Demo Landing",
  description:
    "Ready-to-launch premium landing page concept for Ribas Karpaty by STEPS LAB x Ribas Concept.",
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    images: ["/images/hero-poster%20desktop.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/images/hero-poster%20desktop.webp"
          as="image"
          media="(min-width: 769px)"
        />
        <link
          rel="preload"
          href="/images/hero-poster%20mobile.webp"
          as="image"
          media="(max-width: 768px)"
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
