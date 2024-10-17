'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { uploadAvatar, updateAvatarUrl } from '@/utils/mypage/uploadUtil';
import { toast } from 'sonner';
import { AVATAR_URL } from '@/lib/constants/constants';
import browserClient from '@/utils/supabase/client';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface UserMetadata {
  display_name?: string;
  user_name?: string;
  avatar_url?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface User extends SupabaseUser {
  user_metadata: UserMetadata;
}

interface ChangeImageProps {
  defaultAvatarUrl?: string;
}

export default function ChangeImage({ defaultAvatarUrl }: ChangeImageProps) {
  const { user, setUser } = useAuthStore();
  const [avatarUrl, setAvatarUrl] = useState<string>(defaultAvatarUrl || AVATAR_URL);
  const defaultImg = AVATAR_URL;
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setAvatarUrl(defaultAvatarUrl || AVATAR_URL);
  }, [defaultAvatarUrl]);

  const handleImageClick = () => {
    // 이미지 클릭 시 파일 입력 요소 클릭
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && user) {
      try {
        const newAvatarUrl = await uploadAvatar(file, user.id);
        await updateAvatarUrl(user.id, newAvatarUrl);
        const { data: updatedUser, error: userError } = await browserClient.auth.getUser();

        if (userError || !updatedUser) {
          throw new Error('최신 사용자 데이터를 가져오는 중 오류가 발생했습니다.');
        }

        setAvatarUrl(newAvatarUrl);
        setUser({
          ...user,
          user_metadata: {
            ...user?.user_metadata,
            avatar_url: newAvatarUrl,
          },
        });

        toast.success('프로필 이미지가 성공적으로 업데이트되었습니다.');
      } catch (error) {
        toast.error('프로필 이미지 업데이트 중 오류가 발생했습니다.');
        console.error(error);
      }
    }
  };

  return (
    <div className='flex justify-center items-center space-x-4'>
      <div
        className='w-44 h-44 rounded-full overflow-hidden relative cursor-pointer'
        onClick={handleImageClick}
      >
        {avatarUrl ? (
          <img
            src={avatarUrl || defaultImg}
            alt='User Avatar'
            className='w-full h-full object-cover'
          />
        ) : (
          <img
            src={defaultImg}
            alt='User Avatar'
            className='w-full h-full object-cover'
          />
        )}
      </div>

      {/* 파일 입력 요소 (숨김 처리) */}
      <input
        type='file'
        ref={fileInputRef} // ref 연결
        onChange={handleFileChange}
        className='hidden' // 숨김 처리
      />
    </div>
  );
}
