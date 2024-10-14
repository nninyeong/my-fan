'use client';

import { useEffect, useState } from 'react';
import browserClient from '@/utils/supabase/client';

export default function ChatHeader() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    browserClient.auth.getSession().then(console.log);
    console.log('클라이언트에서 렌더링 완료');
    console.log('라우터 마운트');
  }, []);

  // 컴포넌트가 클라이언트에서만 렌더링되도록 보장
  if (!isClient) {
    return null;
  }

  return (
    <div className='h-20'>
      <div className='p-5 border-b flex items-center justify-between h-full'>
        <div>
          <h1 className='text-xl font-bold'>My-Fan Talk</h1>
          {/* <ChatPresence /> */}
        </div>
      </div>
    </div>
  );
}
