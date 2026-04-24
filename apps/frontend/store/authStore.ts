'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IUser } from '@ycdo/shared';

interface AuthState {
  token: string | null;
  user: IUser | null;
  isAuthenticated: boolean;
  login: (token: string, user: IUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: (token, user) => {
        localStorage.setItem('ycdo_token', token);
        document.cookie = `ycdo_token=${token}; path=/; max-age=604800; SameSite=Lax`;
        set({ token, user, isAuthenticated: true });
      },
      logout: () => {
        localStorage.removeItem('ycdo_token');
        document.cookie = 'ycdo_token=; path=/; max-age=0';
        set({ token: null, user: null, isAuthenticated: false });
      },
    }),
    { name: 'ycdo-auth' }
  )
);

