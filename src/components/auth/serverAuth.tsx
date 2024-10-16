'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { User } from '@supabase/supabase-js';

interface ProfileClientProps {
  user: User | undefined;
}

export default function ProfileClient({ user }: ProfileClientProps) {
  const setUser = useAuthStore((state) => state.setUser);

  // 서버에서 받은 유저 데이터를 Zustand에 저장
  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  return null;
}
