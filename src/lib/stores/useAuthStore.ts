import { User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { persist, StateStorage } from 'zustand/middleware';

interface AuthState {
  isLogin: boolean;
  user: User | undefined;
  setLogin: (isLogin: boolean) => void;
  setUser: (user: User | undefined) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLogin: false,
      user: undefined,
      setLogin: (isLogin) => set({ isLogin }),
      setUser: (user) => set({ user }),
    }),
    {
      name: 'auth',
      getStorage: (): StateStorage => localStorage,
    },
  ),
);
