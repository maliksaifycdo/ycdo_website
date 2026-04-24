import type { Metadata } from 'next';
import HealthcareHero from '@/components/healthcare/HealthcareHero';
import ServicesGrid from '@/components/healthcare/ServicesGrid';
import HospitalMap from '@/components/healthcare/HospitalMap';
import HospitalList from '@/components/healthcare/HospitalList';
import BookingForm from '@/components/healthcare/BookingForm';

export const metadata: Metadata = {
  title: 'Healthcare Network',
  description:
    'YCDO operates 16+ hospitals across Multan providing free and affordable healthcare. Book a free consultation today.',
};

export default function HealthcarePage() {
  return (
    <main>
      <HealthcareHero />
      <ServicesGrid />
      <HospitalMap />
      <HospitalList />
      <BookingForm />
    </main>
  );
}
