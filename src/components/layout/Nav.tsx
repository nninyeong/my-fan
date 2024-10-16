'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import browserClient from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function Nav() {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  const { isLogin, setLogin, user, clearAuth } = useAuthStore((state) => ({
    user: state.user,
    isLogin: state.isLogin,
    setLogin: state.setLogin,
    clearAuth: state.clearAuth,
  }));


  const {
    data: session,
    isLoading,
    isError,
  } = useQuery<Session | null>({
    queryKey: ['session'],
    queryFn: async () => {
      const { data } = await browserClient.auth.getSession();
      return data.session;
    },
  });

  useEffect(() => {
    if (!hydrated) {
      setHydrated(true);
    }

    if (session) {
      setLogin(true);
    } else if (isError) {
      setLogin(false);
    }
  }, [session, isError, hydrated, setLogin]);

  // 로그아웃
  const signOutMutation = useMutation({
    mutationFn: async () => {
      await browserClient.auth.signOut();
    },
    onSuccess: () => {
      clearAuth(); // 세션 정보 제거
      router.refresh();
    },
    onError: (error: Error) => {
      console.error('로그아웃 에러:', error);
    },
  });

  if (!hydrated || isLoading) {
    return (
      <nav>
        <ul className='flex items-center gap-4'>
          <li className='h-6 w-16 animate-pulse rounded-md'></li>
          <li className='h-6 w-16 animate-pulse rounded-md'></li>
        </ul>
      </nav>
    );
  }

  return (
    <nav>
      <ul className='flex items-center gap-4'>
        <li>
          <Link href={'/artist'}>아티스트</Link>
        </li>
        <li>
          <Link href={'/chat'}>팬끼리 모여라 톡</Link>
        </li>
        {isLogin ? (
          <>
            <li>
              <Link href={'/mypage'}>마이페이지</Link>
            </li>
            <li>
              <Link
                href='#'
                onClick={(e) => {
                  e.preventDefault();
                  signOutMutation.mutate();
                }}
              >
                로그아웃
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href={'/signUp'}>회원가입</Link>
            </li>

            <li>
              <Link href={'/signIn'}>로그인</Link>
            </li>
          </>
        )}

        {isLogin && (
          <li className='underline'>
            <span className='font-semibold'>{user?.user_metadata?.display_name || user?.email || '사용자'}</span> 님
          </li>
        )}
      </ul>
    </nav>
  );
}
