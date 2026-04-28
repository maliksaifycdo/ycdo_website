import { CmsPage } from '@/types/cms.types';

function getDefaultCmsUrl() {
  // In production client-side, use relative API path (handled by Netlify/Vercel rewrites).
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') return '/api';
  return 'http://localhost:10000/api';
}

function sanitizeCmsUrl(raw: string | undefined) {
  if (!raw) return null;
  const v = raw.trim();
  // Guard against misconfigured env values like "NEXT_PUBLIC_CMS_URL"
  if (v === 'NEXT_PUBLIC_CMS_URL' || v.startsWith('NEXT_PUBLIC_')) return null;
  // Accept absolute or relative-to-host API base.
  if (v.startsWith('http://') || v.startsWith('https://') || v.startsWith('/')) return v;
  return null;
}

// Next.js: only NEXT_PUBLIC_* is guaranteed client-exposed.
const CMS_URL =
  sanitizeCmsUrl(process.env.NEXT_PUBLIC_CMS_URL) ||
  sanitizeCmsUrl(process.env.NEXT_PUBLIC_API_URL) ||
  sanitizeCmsUrl(process.env.CMS_URL) ||
  getDefaultCmsUrl();

// Optional compatibility: set NEXT_PUBLIC_CMS_KIND=strapi to use Strapi query format.
const CMS_KIND = (process.env.NEXT_PUBLIC_CMS_KIND || 'ycdo').toLowerCase();

function normalizeApiBaseUrl(url: string) {
  return url.endsWith('/api') ? url : `${url.replace(/\/$/, '')}/api`;
}

const CMS_BASE_URL = normalizeApiBaseUrl(CMS_URL);

function devLog(...args: unknown[]) {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
}

function createFallbackPage(slug: string): CmsPage {
  const title = slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

  return {
    slug,
    title: title || 'Content',
    seo: {
      title: `${title || 'Content'} | YCDO`,
      description: 'CMS connection failed. Check NEXT_PUBLIC_CMS_URL and backend availability.',
    },
    sections: [
      {
        type: 'richText',
        heading: 'CMS connection failed',
        paragraphs: [
          `Slug: "${slug}"`,
          `CMS URL: ${CMS_BASE_URL}`,
          'We could not fetch content from the CMS.',
          'Fix your CMS URL / backend and refresh.',
        ],
      },
    ],
  };
}

function createEmptyPage(slug: string): CmsPage {
  const title = slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
  return {
    slug,
    title: title || 'Content',
    seo: {
      title: `${title || 'Content'} | YCDO`,
      description: 'No CMS content found for this slug.',
    },
    sections: [
      {
        type: 'richText',
        heading: 'No content found',
        paragraphs: [
          `Slug: "${slug}"`,
          `CMS URL: ${CMS_BASE_URL}`,
          'The CMS responded successfully, but no page content exists for this slug yet.',
        ],
      },
    ],
  };
}

async function fetchJson(url: string) {
  const response = await fetch(url, {
    next: { revalidate: 60, tags: ['cms'] },
  });
  const text = await response.text().catch(() => '');
  const json = text ? JSON.parse(text) : null;
  return { response, json };
}

export async function getPage(slug: string): Promise<CmsPage> {
  try {
    devLog('[CMS] kind=', CMS_KIND, 'base=', CMS_BASE_URL, 'slug=', slug);

    // YCDO/Nest CMS format (default)
    if (CMS_KIND !== 'strapi') {
      const url = `${CMS_BASE_URL}/cms/pages/${encodeURIComponent(slug)}`;
      const { response, json } = await fetchJson(url);
      devLog('[CMS] response', response.status, url);
      devLog('[CMS] json', json);

      if (!response.ok) return createFallbackPage(slug);
      if (!json || !json.slug) return createEmptyPage(slug);
      return json as CmsPage;
    }

    // Strapi-like format (optional)
    // CMS_BASE_URL ends with /api, Strapi expects /api/pages?filters...
    const url = `${CMS_BASE_URL}/pages?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`;
    const { response, json } = await fetchJson(url);
    devLog('[CMS] response', response.status, url);
    devLog('[CMS] json', json);

    if (!response.ok) return createFallbackPage(slug);
    const first = json?.data?.[0];
    const attrs = first?.attributes;
    if (!attrs) return createEmptyPage(slug);

    return {
      slug,
      title: attrs.title || slug,
      seo: attrs.seo || undefined,
      sections: Array.isArray(attrs.sections) ? attrs.sections : [],
    } as CmsPage;
  } catch (err) {
    devLog('[CMS] error', err);
    return createFallbackPage(slug);
  }
}
