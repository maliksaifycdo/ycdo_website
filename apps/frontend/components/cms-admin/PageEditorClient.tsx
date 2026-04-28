'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { cmsAdminService } from '@/services/cms-admin.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DragDropContext, Draggable, Droppable, type DropResult } from '@hello-pangea/dnd';
import AddSectionBar from './AddSectionBar';
import SectionCard from './SectionCard';
import SectionEditor from './SectionEditor';
import { createSection } from './sectionDefaults';
import { toEditablePage, toUpsertDto } from './normalize';
import type { EditablePage, EditableSection } from './types';

function validate(page: EditablePage) {
  if (!page.title.trim()) return 'Page title is required';
  for (const section of page.sections) {
    if (section.type === 'hero' && !section.title.trim()) return 'Hero title is required';
    if (section.type === 'richText' && !section.heading.trim()) return 'Rich Text heading is required';
    if (section.type === 'cta' && !section.heading.trim()) return 'CTA heading is required';
    if (section.type === 'cards') {
      for (const card of section.items) {
        if (card.title.trim() === '') return 'Each card needs a title';
      }
    }
  }
  return null;
}

export default function PageEditorClient() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const slug = useMemo(() => String(params?.slug || ''), [params]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [page, setPage] = useState<EditablePage | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const raw = await cmsAdminService.getPage(slug);
        if (cancelled) return;
        setPage(toEditablePage(slug, raw));
      } catch (e) {
        console.error(e);
        toast.error('Failed to load CMS page');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    if (slug) load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const onDragEnd = (result: DropResult) => {
    if (!page) return;
    if (!result.destination) return;
    const next = [...page.sections];
    const [moved] = next.splice(result.source.index, 1);
    next.splice(result.destination.index, 0, moved);
    setPage({ ...page, sections: next });
  };

  const updateSection = (idx: number, nextSection: EditableSection) => {
    if (!page) return;
    const next = [...page.sections];
    next[idx] = nextSection;
    setPage({ ...page, sections: next });
  };

  const deleteSection = (idx: number) => {
    if (!page) return;
    setPage({ ...page, sections: page.sections.filter((_, i) => i !== idx) });
  };

  const addSection = (type: any) => {
    if (!page) return;
    setPage({ ...page, sections: [...page.sections, createSection(type)] });
  };

  const save = async () => {
    if (!page) return;
    const error = validate(page);
    if (error) {
      toast.error(error);
      return;
    }
    try {
      setSaving(true);
      await cmsAdminService.upsertPage(slug, toUpsertDto(page));
      toast.success('Page saved');
    } catch (e) {
      console.error(e);
      toast.error('Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="rounded-2xl border border-slate-200 bg-white p-6">Loading page…</div>;
  }

  if (!page) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <p className="text-sm font-semibold text-slate-900">No page loaded</p>
        <p className="mt-1 text-sm text-slate-600">Please go back and select a page.</p>
        <Button type="button" className="mt-4" variant="outline" onClick={() => router.push('/admin/cms')}>
          Back to list
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Edit Page</h1>
          <p className="mt-1 text-sm text-slate-600">
            Slug: <span className="font-mono">{slug}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => router.push('/admin/cms')}>
            Back
          </Button>
          <Button type="button" onClick={save} disabled={saving}>
            {saving ? 'Saving…' : 'Save'}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-extrabold text-slate-900">Page</p>
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Title *</label>
                <Input value={page.title} onChange={(e) => setPage({ ...page, title: e.target.value })} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-extrabold text-slate-900">SEO</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">SEO Title</label>
                <Input
                  value={page.seo.title}
                  onChange={(e) => setPage({ ...page, seo: { ...page.seo, title: e.target.value } })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">SEO Description</label>
                <Textarea
                  value={page.seo.description}
                  onChange={(e) => setPage({ ...page, seo: { ...page.seo, description: e.target.value } })}
                />
              </div>
            </div>
          </div>

          <AddSectionBar onAdd={addSection} />

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="sections">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-4">
                  {page.sections.map((section, index) => (
                    <Draggable key={section.id} draggableId={section.id} index={index}>
                      {(drag) => (
                        <div ref={drag.innerRef} {...drag.draggableProps}>
                          <SectionCard
                            title={section.type.toUpperCase()}
                            dragHandleProps={drag.dragHandleProps as any}
                            onDelete={() => deleteSection(index)}
                          >
                            <SectionEditor section={section} onChange={(next) => updateSection(index, next)} />
                          </SectionCard>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-extrabold text-slate-900">Publishing</p>
            <p className="mt-2 text-sm text-slate-600">
              Click <span className="font-semibold">Save</span> to publish changes. The public site updates immediately (or on
              next revalidate).
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-extrabold text-slate-900">Tips</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
              <li>Drag the grip icon to reorder sections.</li>
              <li>Use full image URLs for now (preview shown).</li>
              <li>Keep at least one paragraph/stat/card item.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

