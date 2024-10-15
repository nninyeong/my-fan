'use client';

import { useEffect } from 'react';
import browserClient from '@/utils/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function MyPage() {
  async function signInWithGithub() {
    await browserClient.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: window.origin + '/auth/callback' },
    });
  }

  useEffect(() => {
    browserClient.auth.getSession().then(console.log);
  }, []);

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <Card className='max-w-[420px] px-4 w-full border-0 shadow-none'>
        <CardHeader className='items-center p-0 pb-10'>
          <CardTitle className='text-2xl font-bold'>깃허브 로그인</CardTitle>
        </CardHeader>
        <CardContent className='flex justify-center'>
          <Button
            onClick={signInWithGithub}
            className='rounded-sm p-3 h-auto'
          >
            Sign In With Github
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
