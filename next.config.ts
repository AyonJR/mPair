/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enables strict mode for React
  swcMinify: true, // Use the SWC compiler for minification
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Match images served over HTTPS
        hostname: '**', // Wildcard for all hostnames
      },
    ],
  },
  experimental: {
    appDir: true, // Enables the experimental app directory
  },
};

module.exports = nextConfig;