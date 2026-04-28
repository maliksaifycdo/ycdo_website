'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProjectsHero from '@/components/projects/ProjectsHero';
import FilterTabs, { type FilterType } from '@/components/projects/FilterTabs';
import ProjectsGrid, { type Project } from '@/components/projects/ProjectsGrid';
import ProjectModal from '@/components/projects/ProjectModal';
import ProjectsCTA from '@/components/projects/ProjectsCTA';
import { ROUTES } from '@/constants/routes';

export default function ProjectsPageClient() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <main>
      <ProjectsHero />
      <section className="bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-8">
          <Link href={ROUTES.PROJECTS_HEALTHCARE} className="rounded-full bg-[#0F2F75] px-5 py-2 text-sm font-bold text-white hover:bg-[#1A3A8F]">
            Healthcare Page
          </Link>
          <Link href={ROUTES.PROJECTS_EDUCATION} className="rounded-full bg-[#0F2F75] px-5 py-2 text-sm font-bold text-white hover:bg-[#1A3A8F]">
            Education Page
          </Link>
          <Link href={ROUTES.PROJECTS_FOOD_SERVICES} className="rounded-full bg-[#0F2F75] px-5 py-2 text-sm font-bold text-white hover:bg-[#1A3A8F]">
            Food Services Page
          </Link>
        </div>
      </section>
      <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <ProjectsGrid activeFilter={activeFilter} onProjectClick={setSelectedProject} />
      <ProjectsCTA />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </main>
  );
}
