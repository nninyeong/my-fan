'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { OAuthResponse, Session } from '@supabase/supabase-js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import browserClient from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function Nav() {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  const { isLogin, setLogin, setUser } = useAuthStore((state) => ({
    isLogin: state.isLogin,
    setLogin: state.setLogin,
    setUser: state.setUser,
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

  // GitHub 로그인
  // const signInMutation = useMutation({
  //   mutationFn: async (): Promise<OAuthResponse> => {
  //     return await browserClient.auth.signInWithOAuth({
  //       provider: 'github',
  //     });
  //   },
  //   onSuccess: () => {
  //     setLogin(true);
  //   },
  //   onError: (error: Error) => {
  //     console.error('로그인 에러:', error);
  //   },
  // });

  // console.log(signInMutation);

  // 로그아웃
  const signOutMutation = useMutation({
    mutationFn: async () => {
      return await browserClient.auth.signOut();
    },
    onSuccess: () => {
      setLogin(false);
      setUser(undefined);
      router.refresh();
    },
    onError: (error: Error) => {
      console.error('로그아웃 에러:', error);
    },
  });

  if (!hydrated || isLoading) {
    // 로딩 중일 때 플레이스홀더
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
        {!isLogin && (
          <li>
            <Link href={'/login'}>로그인</Link>
          </li>
        )}

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
              <Link href={'/signup'}>회원가입</Link>
            </li>
            <li>
              <Link href={'/signIn'}>Gitbub</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
