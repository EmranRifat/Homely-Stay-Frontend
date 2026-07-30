/** @type {import('next').NextConfig} */

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
  reactStrictMode: true,

  allowedDevOrigins: ["192.168.1.71"],

  images: {
    remotePatterns: [
      // Unsplash
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },

      // Local backend
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "192.168.1.71",
        port: "8080",
        pathname: "/uploads/**",
      },

      // Render backend
      {
        protocol: "https",
        hostname: "go-fiber-api-96nd.onrender.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports =
  process.env.NODE_ENV === "development" ? nextConfig : withPWA(nextConfig);
