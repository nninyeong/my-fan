'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChangeUserInfo } from '@/components/mypage/ChangeUserInfo';
import ChangeImage from '@/components/mypage/ChangeImage';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import Loading from './loading';

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
    <div className='grid py-24 gap-6 m-auto container'>
      <Card className='min-w-[450px] m-auto'>
        <CardHeader>
          <CardTitle>회원정보</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col items-center space-y-1.5'>
            <ChangeImage defaultAvatarUrl={user?.user_metadata?.avatar_url} />
            <ChangeUserInfo
              formData={formData}
              setFormData={setFormData}
            />
          </div>
        </CardContent>
      </Card>

      {/* <UserInfo
        email={user?.email}
        metadata={user?.user_metadata}
      /> */}
    </div>
  );
}
