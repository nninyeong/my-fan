import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import browserClient from '@/utils/supabase/client';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { ChangeUserInfoProps } from '@/app/mypage/page';

export function ChangeUserInfo({ formData, setFormData }: ChangeUserInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { user, setUser } = useAuthStore();
  const supabase = browserClient;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSave = async () => {
    if (!user || !user.id) {
      toast.error('사용자 또는 사용자 ID가 정의되지 않았습니다.');
      return;
    }

    // 1. Supabase auth 메타데이터 업데이트
    const { error: authError } = await supabase.auth.updateUser({
      data: {
        display_name: formData.nickname,
        user_name: formData.nickname,
        username: formData.nickname,
      },
    });

    if (authError) {
      toast.error('닉네임 업데이트 중 오류가 발생했습니다.');
      return;
    }

    // 2. 'users' 테이블 업데이트
    const { error: tableError } = await supabase
      .from('users')
      .update({
        display_name: formData.nickname,
        user_name: formData.nickname,
        username: formData.nickname,
      })
      .eq('id', user.id);

    if (tableError) {
      toast.error('사용자 테이블 업데이트 중 오류가 발생했습니다.');
      return;
    }

    toast.success('닉네임이 성공적으로 업데이트되었습니다.');
    setUser({
      ...user,
      user_metadata: {
        ...user.user_metadata,
        display_name: formData.nickname,
        user_name: formData.nickname,
        username: formData.nickname,
      },
    });

    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <>
      <div className='grid w-full items-center gap-4'>
        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='email'>Email</Label>
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

      <div className='flex w-full gap-2 pt-4'>
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
              onClick={handleCancel}
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
    </>
  );
}
