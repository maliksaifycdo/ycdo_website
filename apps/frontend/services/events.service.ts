import api from './api';
import { IEvent, ICreateEventDto } from '@ycdo/shared';

export const eventsService = {
  getAll: async (): Promise<IEvent[]> => {
    const res = await api.get('/events');
    return res.data;
  },
  getUpcoming: async (): Promise<IEvent[]> => {
    const res = await api.get('/events/upcoming');
    return res.data;
  },
  create: async (dto: ICreateEventDto): Promise<IEvent> => {
    const res = await api.post('/events', dto);
    return res.data;
  },
  update: async (id: string, dto: Partial<ICreateEventDto>): Promise<IEvent> => {
    const res = await api.patch(`/events/${id}`, dto);
    return res.data;
  },
  remove: async (id: string): Promise<void> => {
    await api.delete(`/events/${id}`);
  },
};

