'use client';

import { usePathname } from 'next/navigation';
import TrustRibbon from '@/components/TrustRibbon';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import FloatingPhone from '@/components/FloatingPhone';
import ScrollToTop from '@/components/ScrollToTop';

export default function LayoutUI({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    // For admin pages, just render the content without public layout
    return <main className="admin-layout">{children}</main>;
  }

  return (
    <>
      <TrustRibbon />
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingWhatsApp />
      <FloatingPhone />
      <ScrollToTop />
    </>
  );
}
