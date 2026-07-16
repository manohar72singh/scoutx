/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow images from external sources if needed
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  // Enable output for VPS deployment
  // output: 'standalone', // Uncomment for VPS deployment with Node.js
};

export default nextConfig;
