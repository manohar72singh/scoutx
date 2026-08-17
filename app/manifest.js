export default function manifest() {
  return {
    name: 'ScoutX Protection Group Pvt. Ltd.',
    short_name: 'ScoutX Security',
    description: 'PSARA-licensed security guard, housekeeping & detective agency in Ghaziabad, Noida & Delhi NCR.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0F1F',
    theme_color: '#0A0F1F',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
