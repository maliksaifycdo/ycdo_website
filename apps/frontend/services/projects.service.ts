import api from './api';
import { IProject, ICreateProjectDto, ProjectCategory } from '@ycdo/shared';

export const projectsService = {
  getAll: async (category?: ProjectCategory): Promise<IProject[]> => {
    const res = await api.get('/projects', { params: { category } });
    return res.data;
  },
  getOne: async (id: string): Promise<IProject> => {
    const res = await api.get(`/projects/${id}`);
    return res.data;
  },
  create: async (dto: ICreateProjectDto): Promise<IProject> => {
    const res = await api.post('/projects', dto);
    return res.data;
  },
  update: async (id: string, dto: Partial<ICreateProjectDto>): Promise<IProject> => {
    const res = await api.patch(`/projects/${id}`, dto);
    return res.data;
  },
  remove: async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`);
  },
};

