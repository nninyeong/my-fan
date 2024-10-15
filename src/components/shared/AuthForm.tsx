'use client';

import { z } from 'zod';
import { useEffect } from 'react';
import { Github } from 'lucide-react';
import { useForm } from 'react-hook-form';
import browserClient from '@/utils/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

// Zod 스키마로부터 타입 추출
type SignUpFormData = z.infer<typeof signUpSchema>;
type LoginFormData = z.infer<typeof loginSchema>;

// Zod 스키마 정의
const signUpSchema = z
  .object({
    email: z.string().email('유효한 이메일 주소를 입력하세요.'),
    password: z.string().min(4, '비밀번호는 최소 4자 이상이어야 합니다.'),
    passwordCheck: z.string().min(4, '비밀번호 확인을 입력해 주세요.'),
    username: z.string().min(2, {
      message: '이름은 2자 이상 입력해 주세요',
    }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordCheck'],
  });

const loginSchema = z.object({
  email: z.string().email('유효한 이메일 주소를 입력하세요.'),
  password: z.string().min(4, '비밀번호는 최소 4자 이상이어야 합니다.'),
});

export default function AuthForm({ isSignUp }: { isSignUp: boolean }) {
  // useForm 훅을 사용해 form 객체 생성
  const form = useForm({
    resolver: zodResolver(isSignUp ? signUpSchema : loginSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordCheck: '',
    },
  });

  // 폼 제출 함수 정의
  const onSubmit = (data: SignUpFormData | LoginFormData) => {
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
    <>
      <Card className='w-[400px]'>
        <CardHeader>
          <CardTitle className='text-2xl'>{isSignUp ? 'Sign Up' : 'Sign In'}</CardTitle>
          <CardDescription>
            {isSignUp ? 'Enter your email below to create your account' : 'Enter your email and password to log in'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-8'
            >
              <div className='grid w-full items-center gap-4'>
                {isSignUp && (
                  <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='이름'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

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
                          placeholder='비밀번호'
                          type='password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {isSignUp && (
                  <FormField
                    control={form.control}
                    name='passwordCheck'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password Check</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='비밀번호 재입력'
                            type='passwordCheck'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <Button
                className='w-full'
                type='submit'
              >
                {isSignUp ? 'Create account' : 'Sign In'}
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

        <CardFooter className='grid -mt-5'>
          <Button
            variant='outline'
            className='font-semibold'
            onClick={signInWithGithub}
          >
            <Github size={18} />
            Sign up with GitHub
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
