import type { CmsPageListItem } from '@/services/cms-admin.service';
import { nanoid } from 'nanoid/non-secure';
import type { EditablePage, EditableSection, CmsSectionType } from './types';

function safeString(v: unknown) {
  return typeof v === 'string' ? v : '';
}

function asType(v: unknown): CmsSectionType | null {
  return v === 'hero' || v === 'richText' || v === 'stats' || v === 'cards' || v === 'cta' ? v : null;
}

export function toEditablePage(slug: string, page: CmsPageListItem): EditablePage {
  const seoObj = (page.seo ?? {}) as { title?: unknown; description?: unknown };
  const sectionsRaw = Array.isArray(page.sections) ? page.sections : [];

  const sections: EditableSection[] = sectionsRaw
    .map((s) => {
      const section = (s ?? {}) as Record<string, unknown>;
      const type = asType(section.type);
      if (!type) return null;
      const id = safeString(section.id) || nanoid();

      if (type === 'hero') {
        const cta = (section.cta ?? {}) as Record<string, unknown>;
        return {
          id,
          type,
          title: safeString(section.title),
          subtitle: safeString(section.subtitle),
          body: safeString(section.body),
          imageUrl: safeString(section.imageUrl),
          cta: { label: safeString(cta.label), href: safeString(cta.href) },
        };
      }

      if (type === 'richText') {
        const paragraphs = Array.isArray(section.paragraphs) ? section.paragraphs.map(safeString) : [];
        return {
          id,
          type,
          heading: safeString(section.heading),
          paragraphs: paragraphs.length ? paragraphs : [''],
        };
      }

      if (type === 'stats') {
        const items = Array.isArray(section.items) ? section.items : [];
        return {
          id,
          type,
          heading: safeString(section.heading),
          items:
            items.length > 0
              ? items.map((it) => {
                  const o = (it ?? {}) as Record<string, unknown>;
                  return { label: safeString(o.label), value: safeString(o.value) };
                })
              : [{ label: '', value: '' }],
        };
      }

      if (type === 'cards') {
        const items = Array.isArray(section.items) ? section.items : [];
        return {
          id,
          type,
          heading: safeString(section.heading),
          items:
            items.length > 0
              ? items.map((it) => {
                  const o = (it ?? {}) as Record<string, unknown>;
                  return {
                    title: safeString(o.title),
                    description: safeString(o.description ?? o.text),
                    imageUrl: safeString(o.imageUrl),
                  };
                })
              : [{ title: '', description: '', imageUrl: '' }],
        };
      }

      // cta
      const button = (section.button ?? {}) as Record<string, unknown>;
      return {
        id,
        type: 'cta',
        heading: safeString(section.heading),
        text: safeString(section.text),
        button: { label: safeString(button.label), href: safeString(button.href) },
      };
    })
    .filter(Boolean) as EditableSection[];

  return {
    slug,
    title: page.title ?? slug,
    seo: {
      title: safeString(seoObj.title),
      description: safeString(seoObj.description),
    },
    sections,
  };
}

export function toUpsertDto(page: EditablePage) {
  return {
    title: page.title,
    seo: { title: page.seo.title, description: page.seo.description },
    sections: page.sections.map((s) => {
      // Ensure CMS sections include id for stable reorder keys.
      return { ...s } as Record<string, unknown>;
    }),
  };
}

