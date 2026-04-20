import HeroSection from '@/components/home/HeroSection';
import StatsBar from '@/components/home/StatsBar';
import MissionSection from '@/components/home/MissionSection';
import ProgramsGrid from '@/components/home/ProgramsGrid';
import HospitalNetwork from '@/components/home/HospitalNetwork';
import Testimonials from '@/components/home/Testimonials';
import LatestNews from '@/components/home/LatestNews';
import VolunteerCTA from '@/components/home/VolunteerCTA';
import PartnersStrip from '@/components/home/PartnersStrip';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <MissionSection />
      <ProgramsGrid />
      <HospitalNetwork />
      <Testimonials />
      <LatestNews />
      <VolunteerCTA />
      <PartnersStrip />
    </main>
  );
}
