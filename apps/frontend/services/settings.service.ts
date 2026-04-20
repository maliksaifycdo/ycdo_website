import api from './api';
import { ISetting, IUpdateSettingDto } from '@ycdo/shared';

export const settingsService = {
  getAll: async (): Promise<ISetting[]> => {
    const res = await api.get('/settings');
    return res.data;
  },
  getByGroup: async (group: string): Promise<ISetting[]> => {
    const res = await api.get(`/settings/group/${group}`);
    return res.data;
  },
  update: async (key: string, dto: IUpdateSettingDto): Promise<ISetting> => {
    const res = await api.patch(`/settings/${key}`, dto);
    return res.data;
  },
};

