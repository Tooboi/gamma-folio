/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "images.unsplash.com" }, { hostname: "drive.google.com"}],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
