export type CmsSectionType =
  | 'hero'
  | 'richText'
  | 'stats'
  | 'cards'
  | 'cta'
  | 'image'
  | 'list';

export interface CmsSection {
  type: CmsSectionType | string;
  id?: string;
  [key: string]: unknown;
}

export interface CmsPageSeo {
  title?: string;
  description?: string;
}

export interface CmsPage {
  slug: string;
  title: string;
  seo?: CmsPageSeo;
  sections: CmsSection[];
}
