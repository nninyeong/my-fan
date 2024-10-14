'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect } from 'react';
import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import browserClient from '@/utils/supabase/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

// Zod 스키마 정의 (회원가입 폼)
const signUpSchema = z.object({
  email: z.string().email('유효한 이메일 주소를 입력하세요.'),
  password: z.string().min(4, '비밀번호는 최소 4자 이상이어야 합니다.'),
  username: z.string().min(2, {
    message: '이름은 2자 이상 입력해 주세요',
  }),
});

export default function AuthForm() {
  // useForm 훅을 사용해 form 객체 생성 (로그인 및 회원가입 폼)
  const form = useForm({
    resolver: zodResolver(signUpSchema),
  });

  // 폼 제출 함수 정의
  const onSubmit = (data: unknown) => {
    console.log('data:', data);
  };

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
      <Card className='w-[400px]'>
        <CardHeader>
          <CardTitle className='font-bold text-3xl'>Create an account</CardTitle>
          <CardDescription>Enter your email below to create your account</CardDescription>
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-8'
            >
              <div className='grid w-full items-center gap-4'>
                <FormField
                  control={form.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='shadcn'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='email@email.com'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='password'
                          type='password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                className='w-full'
                type='submit'
              >
                Create account
              </Button>
            </form>
          </Form>

          <div className='relative flex items-center justify-center py-3 text-xs uppercase'>
            <div
              className='absolute inset-0 flex items-center'
              aria-hidden='true'
            >
              <div className='w-full border-t border-muted-foreground'></div>
            </div>
            <span className='relative z-10 bg-background px-2 text-muted-foreground'>Or continue with</span>
          </div>
        </CardContent>

        <CardFooter className='grid grid-col-2'>
          <Button
            variant='outline'
            className='font-semibold'
            onClick={signInWithGithub}
          >
            <Github size={18} />
            GitHub
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
