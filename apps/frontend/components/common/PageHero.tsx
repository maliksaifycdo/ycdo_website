'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  backgroundImage?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses: Record<NonNullable<PageHeroProps['size']>, string> = {
  sm: 'py-16',
  md: 'py-24',
  lg: 'min-h-[60vh] py-24',
};

export default function PageHero({
  title,
  subtitle,
  breadcrumbs,
  backgroundImage,
  size = 'md',
}: PageHeroProps) {
  return (
    <section className={`relative w-full overflow-hidden ${sizeClasses[size]}`}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: backgroundImage
            ? `linear-gradient(rgba(26,58,143,0.85), rgba(192,39,45,0.85)), url(${backgroundImage})`
            : 'linear-gradient(135deg, #1A3A8F, #C0272D)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 text-center">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2 text-sm text-white/70">
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <div key={`${crumb.href}-${crumb.label}`} className="flex items-center gap-2">
                  {isLast ? (
                    <span className="text-white">{crumb.label}</span>
                  ) : (
                    <Link href={crumb.href} className="hover:text-white">
                      {crumb.label}
                    </Link>
                  )}
                  {!isLast && <ChevronRight className="h-4 w-4" />}
                </div>
              );
            })}
          </div>
        ) : null}

        <h1 className="text-4xl font-bold text-white md:text-5xl">{title}</h1>
        {subtitle ? (
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">{subtitle}</p>
        ) : null}
      </div>
    </section>
  );
}

