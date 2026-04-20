import api from './api';
import { IHospital, ICreateHospitalDto } from '@ycdo/shared';

export const hospitalsService = {
  getAll: async (city?: string): Promise<IHospital[]> => {
    const res = await api.get('/hospitals', { params: { city } });
    return res.data;
  },
  getOne: async (id: string): Promise<IHospital> => {
    const res = await api.get(`/hospitals/${id}`);
    return res.data;
  },
  create: async (dto: ICreateHospitalDto): Promise<IHospital> => {
    const res = await api.post('/hospitals', dto);
    return res.data;
  },
  update: async (id: string, dto: Partial<ICreateHospitalDto>): Promise<IHospital> => {
    const res = await api.patch(`/hospitals/${id}`, dto);
    return res.data;
  },
  remove: async (id: string): Promise<void> => {
    await api.delete(`/hospitals/${id}`);
  },
};

