import type { Metadata } from 'next';
import AboutHero from '@/components/about/AboutHero';
import OurStory from '@/components/about/OurStory';
import Timeline from '@/components/about/Timeline';
import MissionVisionValues from '@/components/about/MissionVisionValues';
import Leadership from '@/components/about/Leadership';
import LegalStatus from '@/components/about/LegalStatus';
import Partners from '@/components/about/Partners';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    "Learn about YCDO's 30+ year journey from a student's dream to 16+ hospitals serving communities across Pakistan.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <OurStory />
      <Timeline />
      <MissionVisionValues />
      <Leadership />
      <LegalStatus />
      <Partners />
    </main>
  );
}
