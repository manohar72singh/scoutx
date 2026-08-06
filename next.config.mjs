const nextConfig = {
  // Ensure consistent clean URLs without trailing slashes to prevent redirect loops in GSC
  trailingSlash: false,

  // Only allow images from trusted domains
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },

  // Redirect www to non-www for SEO & Google Search Console consistency
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.scoutxsecurity.com' }],
        destination: 'https://scoutxsecurity.com/:path*',
        permanent: true,
      },
    ];
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
          // Force HTTPS
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
    ];
  },
};

export default nextConfig;
