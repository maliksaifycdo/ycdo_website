import api from './api';
import { IDonation, ICreateDonationDto, IPaginatedResponse } from '@ycdo/shared';

export const donationsService = {
  create: async (dto: ICreateDonationDto): Promise<IDonation> => {
    const res = await api.post('/donations', dto);
    return res.data;
  },
  getAll: async (page = 1, limit = 20): Promise<IPaginatedResponse<IDonation>> => {
    const res = await api.get('/donations', { params: { page, limit } });
    return res.data;
  },
  getStats: async () => {
    const res = await api.get('/donations/stats');
    return res.data;
  },
  updateStatus: async (id: string, status: string): Promise<IDonation> => {
    const res = await api.patch(`/donations/${id}/status`, { status });
    return res.data;
  },
};

