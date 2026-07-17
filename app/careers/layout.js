// app/careers/layout.js

export const metadata = {
  title: 'Careers | Security Guard Jobs in NCR',
  description: 'Join ScoutX Protection Group. We are hiring professional security guards, PSOs, bouncers, and supervisors in Ghaziabad, Noida, and Delhi NCR.',
  alternates: { canonical: 'https://www.scoutxsecurity.com/careers' },
  openGraph: {
    title: 'Careers at ScoutX Protection Group',
    description: 'We are hiring professional security guards, PSOs, bouncers, and supervisors in NCR. Apply now!',
    url: 'https://www.scoutxsecurity.com/careers',
  },
};

export default function CareersLayout({ children }) {
  return children;
}
