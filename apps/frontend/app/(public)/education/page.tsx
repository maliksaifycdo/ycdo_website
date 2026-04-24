import type { Metadata } from 'next';
import EducationHero from '@/components/education/EducationHero';
import CrisisStats from '@/components/education/CrisisStats';
import ProgramCards from '@/components/education/ProgramCards';
import WomenEmpowerment from '@/components/education/WomenEmpowerment';
import ScholarshipForm from '@/components/education/ScholarshipForm';
import SuccessStories from '@/components/education/SuccessStories';

export const metadata: Metadata = {
  title: 'Education & Youth',
  description: 'YCDO empowers youth through scholarships, child protection, and vocational training across Pakistan.',
};

export default function EducationPage() {
  return (
    <main>
      <EducationHero />
      <CrisisStats />
      <ProgramCards />
      <WomenEmpowerment />
      <ScholarshipForm />
      <SuccessStories />
    </main>
  );
}
