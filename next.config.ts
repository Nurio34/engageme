import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
  async headers() {
    return [
      {
        // Apply the headers to all routes in the application
        source: "/(.*)",
        headers: [
          {
            // Prevents browsers from guessing the MIME type of content
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            // Prevents your application from being embedded in an iframe
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            // Controls how much referrer information should be sent when navigating from your site
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        // Headers specifically for the service worker file (sw.js)
        source: "/sw.js",
        headers: [
          {
            // Sets the content type for the service worker file
            key: "Content-Type",
            value: "application/javascript; charset=utf-8",
          },
          {
            // Disables caching to ensure the service worker always fetches the latest version
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            // Restricts sources of content to prevent XSS attacks
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self'",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
