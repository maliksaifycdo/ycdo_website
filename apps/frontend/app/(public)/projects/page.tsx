import type { Metadata } from 'next';
import ProjectsPageClient from '@/components/projects/ProjectsPageClient';

export const metadata: Metadata = {
  title: 'Our Projects | YCDO – Serve Humanity',
  description:
    '15+ humanitarian programs across healthcare, education, food security, water, and community services in Pakistan.',
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
