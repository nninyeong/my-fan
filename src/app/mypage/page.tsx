'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { AVATAR_URL } from '@/lib/constants/constants';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Loading from './loading';
import browserClient from '@/utils/supabase/client';

export default function Page() {
  const [hydrated, setHydrated] = useState(false);
  const { user, setUser } = useAuthStore();
  const defaultImg = AVATAR_URL;
  const supabase = browserClient;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: user ? user.email : '',
    nickname: user ? user?.user_metadata.display_name || user?.user_metadata.username : '',
  });

  useEffect(() => {
    setHydrated(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSave = async () => {
    // user와 user.id가 undefined가 아닌지 확인
    if (!user || !user.id) {
      console.error('사용자 또는 사용자 ID가 정의되지 않았습니다.');
      return;
    }

    // Supabase 'users' 테이블에서 닉네임 업데이트
    const { data, error } = await supabase
      .from('users') // 'users' 테이블에서
      .update({ display_name: formData.nickname }) // 닉네임 업데이트
      .eq('id', user.id); // 현재 로그인된 사용자 ID로 업데이트

    if (error) {
      console.error('사용자 테이블에서 닉네임 업데이트 중 오류 발생:', error);
      return;
    }

    console.log('사용자 닉네임 업데이트 성공:', data);
    setUser({ ...user, user_metadata: { ...user.user_metadata, display_name: formData.nickname } });
    setIsEditing(false); // 수정 모드 종료
  };

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
            <div className='w-44 h-44 rounded-full overflow-hidden m-auto'>
              {user && user.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt='User Avatar'
                />
              ) : (
                <img
                  src={defaultImg}
                  alt='Default Image'
                />
              )}
            </div>
            <div className='grid w-full items-center pt-8 gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='email'>User Email</Label>
                <Input
                  id='email'
                  value={formData.email}
                  disabled
                />
              </div>

              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='nickname'>Nickname</Label>
                <Input
                  id='nickname'
                  value={formData.nickname}
                  disabled={!isEditing}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex w-full gap-2'>
          {!isEditing ? (
            <Button
              className='w-full'
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          ) : (
            <>
              <Button
                className='w-1/2'
                variant='outline'
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button
                className='w-1/2'
                onClick={handleSave}
              >
                Save
              </Button>
            </>
          )}
        </CardFooter>
      </Card>

      <div className=''>
        <p>사용자 정보: {user ? user.email : '로그인 필요'}</p>
        <p>
          사용자 메타데이터:{' '}
          {user && user.user_metadata ? JSON.stringify(user.user_metadata, null, 2) : '메타데이터 없음'}
        </p>
      </div>
    </div>
  );
}
