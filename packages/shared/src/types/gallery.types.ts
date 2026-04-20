export enum GalleryCategory {
  HEALTHCARE = 'healthcare',
  EDUCATION = 'education',
  COMMUNITY = 'community',
  EVENTS = 'events',
}

export type GalleryItemType = 'image' | 'video';

export interface IGalleryItem {
  _id: string;
  url: string;
  caption: string;
  category: GalleryCategory;
  date: string;
  eventTag?: string;
  type: GalleryItemType;
  createdAt: string;
}

export interface ICreateGalleryItemDto {
  url: string;
  caption: string;
  category: GalleryCategory;
  date: string;
  eventTag?: string;
  type: GalleryItemType;
}
