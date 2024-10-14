'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import browserClient from '@/utils/supabase/client';

export default function ChatHeader() {
  const supabase = browserClient;
  const user = useAuthStore((state) => state.user);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [onlineUsers, setOnlineUsers] = useState<number>(0);

  useEffect(() => {
    setIsClient(true);
    browserClient.auth.getSession().then(console.log);
  }, []);

  useEffect(() => {
    const channel = supabase.channel('room1');
    channel
      .on('presence', { event: 'sync' }, () => {
        const userIds = new Set<string>(); // 중복된 아이디 제거
        for (const id in channel.presenceState()) {
          // @ts-ignore
          userIds.add(channel.presenceState()[id][0].user_id);
        }
        setOnlineUsers(userIds.size); // 중복을 제거한 사용자 수 설정
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            online_at: new Date().toISOString(),
            user_id: user?.id,
          });
        }
      });

    return () => {
      channel.unsubscribe();
    };
  }, [user, supabase]);

  // 클라이언트에서만 렌더링되도록 보장
  if (!isClient) {
    return null;
  }

  return (
    <div className='h-20'>
      <div className='p-5 border-b flex items-center justify-between h-full'>
        <div>
          <h1 className='text-xl font-bold'>My-Fan Talk</h1>
          <div className='flex items-center gap-1'>
            {user ? (
              <>
                <div className='h-4 w-4 bg-black rounded-full animate-pulse'></div>
                <h1 className='text-sm text-gray-400'>총 {onlineUsers} 명이 대화를 나누고 있어요!</h1>
              </>
            ) : (
              <div className='h-3 w-1'></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
