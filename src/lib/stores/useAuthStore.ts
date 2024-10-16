import { UsersData } from '@/lib/type/type'; // Custom User 타입 import
import { User } from '@supabase/supabase-js'; // Supabase User 타입 import
import { create } from 'zustand';
import { persist, StateStorage } from 'zustand/middleware';

interface AuthState {
  isLogin: boolean;
  user: User | undefined;
  users: UsersData | undefined;
  setLogin: (isLogin: boolean) => void;
  setUser: (user: User | undefined) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLogin: false,
      user: undefined,
      users: undefined,

      // 로그인 상태 업데이트
      setLogin: (isLogin) => set({ isLogin }),

      // 사용자 정보와 users 객체를 업데이트하는 함수
      setUser: (user) =>
        set({
          user,
          users: user
            ? // 'User | undefined' 형식은 'UsersData | undefined' 형식에 할당할 수 없습니다.
              //'avatar_url' 속성이 'User' 형식에 없지만 'UsersData' 형식에서 필수입니다.ts(
              {
                id: user.id,
                avatar_url: user.user_metadata?.avatar_url || '',
                created_at: new Date().toISOString(),
                display_name: user.user_metadata?.user_name || user.email || 'Unknown',
                email: user.email || '이메일 없음',
              }
            : undefined,
        }),
    }),
    {
      name: 'auth',
      getStorage: (): StateStorage => localStorage,
    },
  ),
);
