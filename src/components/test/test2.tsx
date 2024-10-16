'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/stores/useAuthStore';

export default function Profile() {
  const [hydrated, setHydrated] = useState(false);

  const { users, isLogin } = useAuthStore((state) => ({
    users: state.users,
    isLogin: state.isLogin,
  }));

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  if (!isLogin || !users) {
    return <p>로그인이 필요합니다.</p>;
  }

  return (
    <div>
      <h1>사용자 프로필</h1>
      <p>이름: {users.display_name || '이름 없음'}</p>
      <p>이메일: {users.email || '이메일 없음'}</p>
      <img
        src={users.avatar_url || '/default-avatar.png'}
        alt={users.display_name || '프로필 이미지'}
        width={50}
        height={50}
      />
      <p>가입일: {users.created_at}</p>
    </div>
  );
}
