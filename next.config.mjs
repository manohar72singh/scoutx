/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone output for VPS/Node.js deployment
  // output: 'standalone', // Uncomment when deploying to VPS

  // Only allow images from trusted domains
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },

  // Production-grade Security Headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Prevent Clickjacking attacks
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // Prevent MIME type sniffing
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Control referrer information
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Block XSS attacks
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          // Restrict browser features
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          // Force HTTPS (enable only when SSL is active)
          // { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
    ];
  },
};

export default nextConfig;
