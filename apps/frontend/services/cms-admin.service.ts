import api from '@/services/api';
import type { CmsPage } from '@/types/cms.types';

export type CmsPageListItem = Pick<CmsPage, 'slug' | 'title' | 'seo' | 'sections'> & {
  _id?: string;
  updatedAt?: string;
  createdAt?: string;
};

export type CmsUpsertDto = {
  title: string;
  seo?: Record<string, unknown>;
  sections?: Array<Record<string, unknown>>;
};

export const cmsAdminService = {
  listPages: async (): Promise<CmsPageListItem[]> => {
    const res = await api.get('/cms/pages');
    return res.data as CmsPageListItem[];
  },

  getPage: async (slug: string): Promise<CmsPageListItem> => {
    const res = await api.get(`/cms/pages/${encodeURIComponent(slug)}`);
    return res.data as CmsPageListItem;
  },

  upsertPage: async (slug: string, dto: CmsUpsertDto): Promise<CmsPageListItem> => {
    const res = await api.put(`/cms/pages/${encodeURIComponent(slug)}`, dto);
    return res.data as CmsPageListItem;
  },
};

