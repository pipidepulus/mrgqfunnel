/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    qualities: [75, 85, 90],
    unoptimized: true,
  },
};

export default nextConfig;