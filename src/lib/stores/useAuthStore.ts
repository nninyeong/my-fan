import { create } from 'zustand';
import { persist, StateStorage } from 'zustand/middleware';

type AuthState = {
  isLogin: boolean;
  setLogin: (isLogin: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLogin: false,
      setLogin: (isLogin) => set({ isLogin }),
    }),
    {
      name: 'auth',
      getStorage: (): StateStorage => localStorage,
    },
  ),
);
