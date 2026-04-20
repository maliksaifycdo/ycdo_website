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
        set({ token, user, isAuthenticated: true });
      },
      logout: () => {
        localStorage.removeItem('ycdo_token');
        set({ token: null, user: null, isAuthenticated: false });
      },
    }),
    { name: 'ycdo-auth' }
  )
);

