// import { User, Session } from '@supabase/supabase-js';
// import { create } from 'zustand';
// import { persist, StateStorage } from 'zustand/middleware';

// interface AuthState {
//   isLogin: boolean;
//   user: User | undefined;
//   session: Session | undefined;
//   setLogin: (isLogin: boolean) => void;
//   setUser: (user: User | undefined) => void;
// }

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set) => ({
//       isLogin: false,
//       user: undefined,
//       session: undefined,
//       setUser: (user) => set({ user }),
//       setLogin: (isLogin) => set({ isLogin }),
//       setSession: (session: Session | undefined) =>
//         set({
//           session,
//           isLogin: !!session,
//         }),
//     }),
//     {
//       name: 'auth',
//       getStorage: (): StateStorage => localStorage,
//     },
//   ),
// );

import { User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { persist, StateStorage } from 'zustand/middleware';

interface AuthState {
  isLogin: boolean;
  setLogin: (isLogin: boolean) => void;
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLogin: false,
      user: undefined,
      setUser: (user) => set({ user }),
      setLogin: (isLogin) => set({ isLogin }),
      clearAuth: () => {
        set({ user: undefined, isLogin: false });
        localStorage.removeItem('auth');
      },
    }),
    {
      name: 'auth',
      getStorage: (): StateStorage => localStorage,
    },
  ),
);
