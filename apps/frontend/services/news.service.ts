import api from './api';
import { INews, ICreateNewsDto, IPaginatedResponse } from '@ycdo/shared';

export const newsService = {
  getAll: async (page = 1, limit = 6): Promise<IPaginatedResponse<INews>> => {
    const res = await api.get('/news', { params: { page, limit } });
    return res.data;
  },
  getManage: async (page = 1, limit = 50): Promise<IPaginatedResponse<INews>> => {
    const res = await api.get('/news/manage', { params: { page, limit } });
    return res.data;
  },
  getOne: async (slug: string): Promise<INews> => {
    const res = await api.get(`/news/${slug}`);
    return res.data;
  },
  create: async (dto: ICreateNewsDto): Promise<INews> => {
    const res = await api.post('/news', dto);
    return res.data;
  },
  update: async (id: string, dto: Partial<ICreateNewsDto>): Promise<INews> => {
    const res = await api.patch(`/news/${id}`, dto);
    return res.data;
  },
  remove: async (id: string): Promise<void> => {
    await api.delete(`/news/${id}`);
  },
};

