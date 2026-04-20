import api from './api';
import { IAppointment, ICreateAppointmentDto, AppointmentStatus } from '@ycdo/shared';

export const appointmentsService = {
  create: async (dto: ICreateAppointmentDto): Promise<IAppointment> => {
    const res = await api.post('/appointments', dto);
    return res.data;
  },
  getAll: async (): Promise<IAppointment[]> => {
    const res = await api.get('/appointments');
    return res.data;
  },
  updateStatus: async (id: string, status: AppointmentStatus): Promise<IAppointment> => {
    const res = await api.patch(`/appointments/${id}/status`, { status });
    return res.data;
  },
};

