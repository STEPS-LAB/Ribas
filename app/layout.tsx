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

const defaultTitle = "Ribas Karpaty — Готель в самому серці Карпат";
const defaultDescription =
  "Готель Ribas Karpaty — відпочинок у серці Карпат. Номери, SPA, ресторан та гірська панорама. Забронюйте свій відпочинок.";

export const metadata: Metadata = {
  title: defaultTitle,
  description: defaultDescription,
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    images: ["/images/hero-poster%20desktop.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
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
