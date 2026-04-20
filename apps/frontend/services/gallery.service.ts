import api from './api';
import { IGalleryItem, ICreateGalleryItemDto, GalleryCategory } from '@ycdo/shared';

export const galleryService = {
  getAll: async (category?: GalleryCategory): Promise<IGalleryItem[]> => {
    const res = await api.get('/gallery', { params: { category } });
    return res.data;
  },
  create: async (dto: ICreateGalleryItemDto): Promise<IGalleryItem> => {
    const res = await api.post('/gallery', dto);
    return res.data;
  },
  update: async (id: string, dto: Partial<ICreateGalleryItemDto>): Promise<IGalleryItem> => {
    const res = await api.patch(`/gallery/${id}`, dto);
    return res.data;
  },
  remove: async (id: string): Promise<void> => {
    await api.delete(`/gallery/${id}`);
  },
};

