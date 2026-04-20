'use client';

export type GalleryFilterType = 'all' | 'healthcare' | 'education' | 'food' | 'community' | 'convention';

interface GalleryFilterProps {
  activeFilter: GalleryFilterType;
  onFilterChange: (filter: GalleryFilterType) => void;
}

const filters: { label: string; value: GalleryFilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Healthcare', value: 'healthcare' },
  { label: 'Education', value: 'education' },
  { label: 'Food', value: 'food' },
  { label: 'Community', value: 'community' },
  { label: 'Annual Convention', value: 'convention' },
];

export default function GalleryFilter({ activeFilter, onFilterChange }: GalleryFilterProps) {
  return (
    <section className="sticky top-[72px] z-40 border-b border-slate-200/60 bg-white px-8 py-6">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`rounded-full px-6 py-2 text-sm font-bold tracking-tight transition-all ${
              activeFilter === filter.value
                ? 'bg-[#C0272D] text-white shadow-md'
                : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </section>
  );
}

