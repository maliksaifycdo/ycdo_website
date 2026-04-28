import { createElement } from 'react';
import { Metadata } from 'next';
import CmsPageView from '@/components/cms/CmsPageView';
import { getPage } from '@/services/cmsService';

export async function renderCmsPage(slug: string) {
  const page = await getPage(slug);
  return createElement(CmsPageView, { page });
}

export async function getCmsMetadata(slug: string): Promise<Metadata> {
  try {
    const page = await getPage(slug);
    return {
      title: page.seo?.title || page.title,
      description: page.seo?.description,
    };
  } catch {
    return {
      title: 'Content',
      description: 'CMS powered page',
    };
  }
}
