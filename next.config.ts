import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
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
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
    ],
  },
};

export default nextConfig;
