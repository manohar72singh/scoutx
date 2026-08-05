// app/careers/layout.js

export const metadata = {
  title: 'Careers | Security Guard & Housekeeping Jobs in NCR',
  description: 'Join ScoutX Protection Group. We are hiring professional security guards, PSOs, bouncers, supervisors, housekeeping staff, and private detectives in Ghaziabad, Noida, and Delhi NCR.',
  alternates: { canonical: 'https://scoutxsecurity.com/careers' },
  openGraph: {
    title: 'Careers at ScoutX Protection Group | Apply Now',
    description: 'We are hiring professional security guards, PSOs, bouncers, supervisors, housekeeping staff, and private detectives in NCR. Apply now!',
    url: 'https://scoutxsecurity.com/careers',
  },
};

export default function CareersLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://scoutxsecurity.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Careers',
                item: 'https://scoutxsecurity.com/careers',
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
