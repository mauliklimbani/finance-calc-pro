/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir:'build',
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true // 👈 Add this line
  },
};

export default nextConfig;
