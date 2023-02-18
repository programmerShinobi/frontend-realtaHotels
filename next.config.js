/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: config => {
    config.resolve.fallback = { ...config.resolve.fallback, net: false, os: false };
    config.resolve.fallback = { ...config.resolve.fallback, tls: false, os: false };
    config.resolve.fallback = { ...config.resolve.fallback, fs: false, os: false };
    return config;
  },
};

module.exports = nextConfig;

