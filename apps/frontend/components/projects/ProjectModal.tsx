'use client';

import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MapPin } from 'lucide-react';
import { useLocale } from '@/contexts/LocaleContext';
import type { Project } from './ProjectsGrid';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { t, locale } = useLocale();

  return (
    <Dialog open={!!project} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent className="max-w-2xl overflow-hidden p-0">
        {project ? (
          <>
            <div className="relative h-64 w-full">
              <Image
                src={project.image}
                alt={t(`projects.items.${project.id}.title`)}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                quality={85}
                loading="lazy"
                className="object-cover"
              />
            </div>
            <div className="space-y-4 p-6">
              <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold tracking-widest text-white ${locale === 'en' ? 'uppercase' : ''} ${project.badgeColor}`}>
                {t(`projects.categories.${project.category}`)}
              </span>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-[#1A3A8F]">{t(`projects.items.${project.id}.title`)}</DialogTitle>
                <DialogDescription className="text-base text-slate-600">{t(`projects.items.${project.id}.description`)}</DialogDescription>
              </DialogHeader>
              <div className="rounded-lg bg-slate-100 p-4">
                <div className={`mb-1 text-xs font-bold tracking-wide text-slate-500 ${locale === 'en' ? 'uppercase' : ''}`}>{t(`projects.items.${project.id}.impactLabel`)}</div>
                <div className="flex items-center gap-2 text-xl font-bold text-[#C0272D]">
                  <MapPin className="h-5 w-5" />
                  {t(`projects.items.${project.id}.impactValue`)}
                </div>
              </div>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
