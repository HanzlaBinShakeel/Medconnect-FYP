/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enables React's Strict Mode
  swcMinify: true,
  webpack: (config) => {
    config.externals = [...(config.externals || []), 'backend'];
    return config;
  },
};

export default nextConfig;
