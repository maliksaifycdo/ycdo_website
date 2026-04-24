import api from './api';
import { IContact, ICreateContactDto } from '@ycdo/shared';

export const contactsService = {
  create: async (dto: ICreateContactDto): Promise<IContact> => {
    const res = await api.post('/contacts', dto);
    return res.data;
  },
  getAll: async (): Promise<IContact[]> => {
    const res = await api.get('/contacts');
    return res.data;
  },
  markAsRead: async (id: string): Promise<IContact> => {
    const res = await api.patch(`/contacts/${id}/read`);
    return res.data;
  },
  getUnreadCount: async (): Promise<number> => {
    const res = await api.get('/contacts/unread-count');
    const body = res.data as { count?: number } | number;
    return typeof body === 'number' ? body : (body?.count ?? 0);
  },
  remove: async (id: string): Promise<void> => {
    await api.delete(`/contacts/${id}`);
  },
};

