'use client';

import Image from 'next/image';
import { MapPin, TrendingUp, FolderKanban } from 'lucide-react';
import { IProject, ProjectCategory } from '@ycdo/shared';
import { Badge } from '@/components/ui/badge';

interface ProjectCardProps {
  project: IProject;
  onClick?: () => void;
}

const categoryClassMap: Record<ProjectCategory, string> = {
  healthcare: 'bg-red-100 text-red-700',
  education: 'bg-blue-100 text-blue-700',
  food: 'bg-green-100 text-green-700',
  water: 'bg-sky-100 text-sky-700',
  community: 'bg-amber-100 text-amber-700',
  orphan: 'bg-violet-100 text-violet-700',
};

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const imageUrl = project.images?.[0];

  return (
    <article
      className="overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      onClick={onClick}
    >
      <div className="relative h-48 w-full">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={80}
            loading="lazy"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary to-primary text-white">
            <FolderKanban className="h-12 w-12" />
          </div>
        )}
      </div>

      <div className="p-5">
        <Badge className={`mb-3 capitalize ${categoryClassMap[project.category] ?? 'bg-gray-100 text-gray-700'}`}>
          {project.category}
        </Badge>

        <h3 className="text-lg font-bold text-secondary">{project.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-gray-500">{project.description}</p>

        <div className="mt-3 flex items-center gap-2 text-sm text-green-600">
          <TrendingUp className="h-4 w-4" />
          <span>{project.impactStat}</span>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <MapPin className="h-4 w-4" />
            <span>{project.location}</span>
          </div>
          <button className="text-sm font-medium text-primary">View Details ?</button>
        </div>
      </div>
    </article>
  );
}

