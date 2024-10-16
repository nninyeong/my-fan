'use client';

import { useState } from 'react';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import browserClient from '@/utils/supabase/client';
import { toast } from 'sonner';

export default function ChangeNickname() {
  const { user, setUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState(
    user ? user?.user_metadata.display_name || user?.user_metadata.user_name : '',
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleSave = async () => {
    if (!user || !user.id) {
      toast.error('사용자 또는 사용자 ID가 정의되지 않았습니다.');
      return;
    }

    // Supabase auth 메타데이터 업데이트
    const { error: authError } = await browserClient.auth.updateUser({
      data: {
        display_name: nickname,
        user_name: nickname,
        username: nickname,
      },
    });

    if (authError) {
      toast.error('닉네임 업데이트 중 오류가 발생했습니다.');
      console.error('Auth 메타데이터 업데이트 오류 발생:', authError);
      return;
    }

    // 'users' 테이블 업데이트
    const { error: tableError } = await browserClient
      .from('users')
      .update({
        display_name: nickname,
        user_name: nickname,
        username: nickname,
      })
      .eq('id', user.id);

    if (tableError) {
      toast.error('사용자 테이블 업데이트 중 오류가 발생했습니다.');
      console.error('사용자 테이블 업데이트 오류:', tableError);
      return;
    }

    toast.success('닉네임이 성공적으로 업데이트되었습니다.');

    // 상태 업데이트
    setUser({
      ...user,
      user_metadata: {
        ...user.user_metadata,
        display_name: nickname,
        user_name: nickname,
        username: nickname,
      },
    });

    setIsEditing(false);
  };

  return (
    <div className='grid w-full items-center pt-8 gap-4'>
      <div className='flex flex-col space-y-1.5'>
        <Label htmlFor='nickname'>Nickname</Label>
        <Input
          id='nickname'
          value={nickname}
          disabled={!isEditing}
          onChange={handleInputChange}
        />
      </div>
      <div className='flex w-full gap-2'>
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
      </div>
    </div>
  );
}
