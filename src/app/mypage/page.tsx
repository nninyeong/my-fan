'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChangeUserInfo } from '@/components/mypage/ChangeUserInfo';
import Loading from './loading';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { AVATAR_URL } from '@/lib/constants/constants';

export interface ChangeUserInfoProps {
  formData: {
    email: string;
    nickname: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      email: string;
      nickname: string;
    }>
  >;
}

export default function Page() {
  const [hydrated, setHydrated] = useState(false);
  const { user } = useAuthStore();
  const defaultImg = AVATAR_URL;

  const [formData, setFormData] = useState({
    email: user?.email || '',
    nickname: user?.user_metadata?.display_name || user?.user_metadata?.user_name || '', 
  });

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return <Loading />;
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 py-24 gap-6 items-center m-auto container'>
      <Card className='min-w-[450px] m-auto'>
        <CardHeader>
          <CardTitle>마이페이지</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col items-center space-y-1.5'>
            <div className='w-44 h-44 rounded-full overflow-hidden m-auto relative'>
              {user && user.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt='User Avatar'
                  className='cursor-pointer'
                />
              ) : (
                <img
                  src={defaultImg}
                  alt='Default Image'
                  className='cursor-pointer'
                />
              )}
            </div>
            <ChangeUserInfo
              formData={formData}
              setFormData={setFormData}
            />
          </div>
        </CardContent>
      </Card>

      <div>
        <p>사용자 정보: {user ? user.email : '로그인 필요'}</p>
        <p>
          사용자 메타데이터:{' '}
          {user && user.user_metadata ? JSON.stringify(user.user_metadata, null, 2) : '메타데이터 없음'}
        </p>
      </div>
    </div>
  );
}
