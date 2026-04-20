'use client';

import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MapPin } from 'lucide-react';
import type { Project } from './ProjectsGrid';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <Dialog open={!!project} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent className="max-w-2xl overflow-hidden p-0">
        {project ? (
          <>
            <div className="relative h-64 w-full">
              <Image src={project.image} alt={project.title} fill className="object-cover" />
            </div>
            <div className="space-y-4 p-6">
              <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white ${project.badgeColor}`}>
                {project.category}
              </span>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-[#1A3A8F]">{project.title}</DialogTitle>
                <DialogDescription className="text-base text-slate-600">{project.description}</DialogDescription>
              </DialogHeader>
              <div className="rounded-lg bg-slate-100 p-4">
                <div className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-500">{project.impactLabel}</div>
                <div className="flex items-center gap-2 text-xl font-bold text-[#C0272D]">
                  <MapPin className="h-5 w-5" />
                  {project.impactValue}
                </div>
              </div>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
