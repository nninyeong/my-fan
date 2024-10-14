'use client';

import { User } from '@supabase/supabase-js';
import { useEffect, useRef } from 'react';
import { useAuthStore } from './useAuthStore';

// NOTE - 사용자 상태 초기화 :  Supabase로부터 가져온 User 객체를 클라이언트 상태 관리 라이브러리를 통해 애플리케이션의 상태로 설정
export default function InitUser({ user }: { user: User | undefined }) {
  const { setUser } = useAuthStore();
  const initState = useRef(false);

  useEffect(() => {
    if (!initState.current && user) {
      setUser(user);
    }

    initState.current = true;
  }, [user, setUser]);

  return null;
}
