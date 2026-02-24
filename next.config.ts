import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  experimental: {
    // Inline CSS in HTML to eliminate render-blocking stylesheet request (~390ms).
    // Replaces <link href="...css"> with <style> in head — no extra network round-trip.
    inlineCss: true,
  },
  // Modern JS: package.json "browserslist" targets Chrome/Edge/Firefox/Safari latest to reduce
  // polyfills (Array.at, flat, Object.fromEntries, etc.) and bundle size (~14 KiB savings).
  // Дозволити доступ до dev-сервера з інших пристроїв у локальній мережі (hostname, не URL)
  allowedDevOrigins: [
    "127.0.0.1",
    // Локальна мережа: 192.168.x.x та 10.x.x.x
    "192.168.*.*",
    "10.*.*.*",
  ],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ribaskarpaty.com",
      },
    ],
  },
};

export default nextConfig;
