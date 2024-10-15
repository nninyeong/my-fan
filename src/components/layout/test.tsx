'use client';

import { useEffect, useState } from 'react';
import browserClient from '@/utils/supabase/client';
import { User } from '@/lib/type/type';

export default function UsersPage() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 사용자 정보를 가져오는 함수
  async function fetchUsers() {
    const { data, error } = await browserClient.from('users').select('*');

    if (error) {
      console.error('사용자 정보를 불러오는 중 오류:', error.message);
      setError('사용자 정보를 불러오는 중 오류가 발생했습니다.');
    } else {
      setUsers(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>사용자 목록</h1>
      <ul>
        {users && users.length > 0 ? (
          users.map((user) => (
            <li
              key={user.id}
              className='mb-4'
            >
              <img
                src={user.avatar_url}
                alt={user.display_name || 'User avatar'}
                width={50}
                height={50}
                className='rounded-full'
              />
              <p>이름: {user.display_name || '이름 없음'}</p>
              <p>유저네임: {user.user_name || '유저네임 없음'}</p>
              <p>이메일: {user.email}</p>
              <p>생성일: {new Date(user.created_at).toLocaleDateString()}</p>
            </li>
          ))
        ) : (
          <p>사용자 정보가 없습니다.</p>
        )}
      </ul>
    </div>
  );
}
