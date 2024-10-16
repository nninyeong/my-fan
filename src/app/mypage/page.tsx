'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/stores/useAuthStore';

export default function Page() {
  const [hydrated, setHydrated] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return <div>Loading...</div>;
  }

  return (
    <div className='min-h-screen m-auto pb-20 container'>
      <div className='w-52 h-52 rounded-full overflow-hidden'>
        {user && user.user_metadata?.avatar_url ? (
          <img
            src={user.user_metadata.avatar_url}
            alt='User Avatar'
          />
        ) : (
          <p></p>
        )}
      </div>
      <p>사용자 정보: {user ? user.email : '로그인 필요'}</p>
      <p>
        사용자 메타데이터:{' '}
        {user && user.user_metadata ? JSON.stringify(user.user_metadata, null, 2) : '메타데이터 없음'}
      </p>
    </div>
  );
}
