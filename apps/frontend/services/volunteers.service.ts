import api from './api';
import { IVolunteer, ICreateVolunteerDto, VolunteerStatus } from '@ycdo/shared';

export const volunteersService = {
  create: async (dto: ICreateVolunteerDto): Promise<IVolunteer> => {
    const res = await api.post('/volunteers', dto);
    return res.data;
  },
  getAll: async (): Promise<IVolunteer[]> => {
    const res = await api.get('/volunteers');
    return res.data;
  },
  updateStatus: async (id: string, status: VolunteerStatus): Promise<IVolunteer> => {
    const res = await api.patch(`/volunteers/${id}/status`, { status });
    return res.data;
  },
  remove: async (id: string): Promise<void> => {
    await api.delete(`/volunteers/${id}`);
  },
};

