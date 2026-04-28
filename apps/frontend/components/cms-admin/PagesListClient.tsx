'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { cmsAdminService, type CmsPageListItem } from '@/services/cms-admin.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function PagesListClient() {
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState<CmsPageListItem[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const data = await cmsAdminService.listPages();
        if (!cancelled) setPages(data);
      } catch (e) {
        console.error(e);
        toast.error('Failed to load CMS pages');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return pages;
    return pages.filter((p) => p.slug.toLowerCase().includes(q) || (p.title ?? '').toLowerCase().includes(q));
  }, [pages, query]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">CMS Pages</h1>
          <p className="mt-1 text-sm text-slate-600">Select a page to edit its content and sections.</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Input
            placeholder="Search by slug or title…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="max-w-sm"
          />
          <Button type="button" variant="outline" onClick={() => window.location.reload()}>
            Refresh
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <p className="text-sm font-extrabold text-slate-900">Available pages</p>
        </div>

        {loading ? (
          <div className="p-6 text-sm text-slate-600">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="p-6 text-sm text-slate-600">No pages found.</div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {filtered.map((p) => (
              <li key={p.slug} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-slate-900">{p.title}</p>
                  <p className="mt-1 text-xs text-slate-600">
                    Slug: <span className="font-mono">{p.slug}</span> · Sections: {Array.isArray(p.sections) ? p.sections.length : 0}
                  </p>
                </div>
                <Link
                  href={`/admin/cms/${encodeURIComponent(p.slug)}`}
                  className="inline-flex h-9 items-center rounded-lg bg-[#1A3A8F] px-4 text-sm font-bold text-white hover:bg-[#0F2F75]"
                >
                  Edit
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

