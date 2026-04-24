import type { Metadata } from 'next';
import ContactHero from '@/components/contact/ContactHero';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import MapSection from '@/components/contact/MapSection';
import HospitalLocations from '@/components/contact/HospitalLocations';
import SocialStrip from '@/components/contact/SocialStrip';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact YCDO for healthcare, donations, volunteering or media inquiries. Find our hospital locations in Multan.',
};

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <div className="relative z-20 mx-auto max-w-7xl -mt-12 px-4 pb-24 md:px-8 lg:px-12">
        <div className="flex flex-col gap-12 md:flex-row">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
      <MapSection />
      <HospitalLocations />
      <SocialStrip />
    </main>
  );
}
