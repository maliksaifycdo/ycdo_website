import { UpsertCmsPageDto } from './dto/upsert-cms-page.dto';

function makeDefaultPage(title: string, slug: string): UpsertCmsPageDto {
  return {
    title,
    seo: {
      title: `${title} | YCDO`,
      description: `${title} page managed from Headless CMS`,
    },
    sections: [
      {
        type: 'hero',
        title,
        subtitle: 'YCDO Headless CMS',
        body: `This "${slug}" page is fully controlled by CMS content.`,
        imageUrl:
          'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80',
      },
      {
        type: 'richText',
        heading: `${title} Content`,
        paragraphs: [
          'Update this section from CMS API.',
          'Frontend deployments no longer own or overwrite this page content.',
        ],
      },
    ],
  };
}

export const DEFAULT_CMS_PAGES: Array<{ slug: string; data: UpsertCmsPageDto }> = [
  {
    slug: 'home',
    data: {
      title: 'Home',
      seo: {
        title: 'Home | YCDO',
        description: 'Youth Community Development Organization',
      },
      sections: [
        {
          type: 'hero',
          title: 'YCDO',
          subtitle: 'Serve Humanity',
          body: 'This page is now fully CMS-driven. Update this content from your CMS backend.',
          imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=80',
          cta: { label: 'View Projects', href: '/projects' },
        },
      ],
    },
  },
  {
    slug: 'about',
    data: makeDefaultPage('About', 'about'),
  },
  {
    slug: 'contact',
    data: makeDefaultPage('Contact', 'contact'),
  },
  { slug: 'community', data: makeDefaultPage('Community', 'community') },
  { slug: 'donate', data: makeDefaultPage('Donate', 'donate') },
  { slug: 'education', data: makeDefaultPage('Education', 'education') },
  { slug: 'gallery', data: makeDefaultPage('Gallery', 'gallery') },
  { slug: 'healthcare', data: makeDefaultPage('Healthcare', 'healthcare') },
  { slug: 'mission', data: makeDefaultPage('Mission', 'mission') },
  { slug: 'founder', data: makeDefaultPage('Founder', 'founder') },
  { slug: 'news', data: makeDefaultPage('News', 'news') },
  { slug: 'projects', data: makeDefaultPage('Projects', 'projects') },
  {
    slug: 'projects-healthcare',
    data: makeDefaultPage('Healthcare Project', 'projects-healthcare'),
  },
  {
    slug: 'projects-education',
    data: makeDefaultPage('Education Project', 'projects-education'),
  },
  {
    slug: 'projects-food-services',
    data: makeDefaultPage('Food Services Project', 'projects-food-services'),
  },
];
