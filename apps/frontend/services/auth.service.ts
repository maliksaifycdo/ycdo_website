import api from './api';
import { ILoginDto, IAuthResponse } from '@ycdo/shared';

export const authService = {
  login: async (dto: ILoginDto): Promise<IAuthResponse> => {
    const res = await api.post('/auth/login', dto);
    return res.data;
  },
};

