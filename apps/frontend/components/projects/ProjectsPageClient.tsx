'use client';

import { useState } from 'react';
import ProjectsHero from '@/components/projects/ProjectsHero';
import FilterTabs, { type FilterType } from '@/components/projects/FilterTabs';
import ProjectsGrid, { type Project } from '@/components/projects/ProjectsGrid';
import ProjectModal from '@/components/projects/ProjectModal';
import ProjectsCTA from '@/components/projects/ProjectsCTA';

export default function ProjectsPageClient() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <main>
      <ProjectsHero />
      <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <ProjectsGrid activeFilter={activeFilter} onProjectClick={setSelectedProject} />
      <ProjectsCTA />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </main>
  );
}
