import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import ScrollToTop from '@/components/common/ScrollToTop';
import PageTransition from '@/components/common/PageTransition';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <ScrollToTop />
      <Navbar />
      {/* Prefetch key pages */}
      <link rel="prefetch" href="/healthcare" />
      <link rel="prefetch" href="/donate" />
      <link rel="prefetch" href="/contact" />
      <div className="pt-[72px]">
        <PageTransition>{children}</PageTransition>
      </div>
      <Footer />
    </div>
  );
}
