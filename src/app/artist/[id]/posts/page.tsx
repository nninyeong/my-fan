'use client';

import PostForm, { UserInfo } from '@/components/community/PostForm';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

export default function Post() {
  //SECTION -
  const [userInfo, setUserInfo] = useState<UserInfo[] | null>([]);
  const { user } = useAuthStore();
  const supabase = createClient();
  const userId = user?.id;

  //로그인 한 사용자 정보 가져오기(깃허브X)
  const fetchUserInfo = async () => {
    const { data, error } = await supabase.from('users').select(`*`).eq('id', userId!);
    if (error) {
      console.error('Error fetching user info:', error);
      return;
    }
    if (data && data.length > 0) {
      const Info = data[0];
      setUserInfo(Info);
    }
  };
  //SECTION -

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div className='h-[700px] flex flex-col justify-center items-center  mb-[100px]'>
      <PostForm userInfo={userInfo} />
    </div>
  );
}
