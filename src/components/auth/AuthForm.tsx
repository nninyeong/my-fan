'use client';

import { z } from 'zod';
import { useEffect } from 'react';
import { Github } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import browserClient from '@/utils/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { AVATAR_URL } from '@/lib/constants/constants';

// Zod 스키마 타입
type SignUpFormData = z.infer<typeof signUpSchema>;
type LoginFormData = z.infer<typeof loginSchema>;

// Zod 스키마
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

export default function AuthForm({ mode }: { mode: 'signUp' | 'signIn' }) {
  const setLogin = useAuthStore((state) => state.setLogin);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  // useForm 훅 form 객체 생성
  const form = useForm({
    resolver: zodResolver(mode === 'signUp' ? signUpSchema : loginSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordCheck: '',
    },
  });

  // 회원가입/ 로그인 로직
  const onSubmit = async (formData: SignUpFormData | LoginFormData) => {
    if (mode === 'signUp') {
      const signUpData = formData as SignUpFormData;
      const { email, password, username } = signUpData;

      const { data, error } = await browserClient.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            display_name: username,
            avatar_url: AVATAR_URL,
          },
        },
      });

      if (error) {
        console.error('회원가입 오류:', error.message);
        toast.error(error.message);
      } else {
        toast.success('회원가입 성공');
        router.push('/signIn');
      }
    } else {
      const { email, password } = formData as LoginFormData;
      const { error } = await browserClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('로그인 오류:', error.message);
        toast.error(error.message);
      } else {
        toast.success('로그인 성공');
        setLogin(true);

        await browserClient.auth.refreshSession();
        const { data: userData, error: userError } = await browserClient.auth.getUser();

        if (userError || !userData) {
          console.error('사용자 데이터 가져오기 오류:', userError?.message);
          toast.error('사용자 데이터를 불러오는 중 오류가 발생했습니다.');
        } else {
          setUser(userData.user);
          router.push('/');
        }
      }
    }
  };

  // github 로그인 로직
  async function signInWithGithub() {
    await browserClient.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: window.origin + '/auth/callback' },
    });
  }

  return (
    <>
      <Card className='w-[400px]'>
        <CardHeader>
          <CardTitle className='text-2xl'>{mode === 'signUp' ? 'Sign Up' : 'Sign In'}</CardTitle>
          <CardDescription>
            {mode === 'signUp'
              ? 'Enter your email below to create your account'
              : 'Enter your email and password to log in'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              method='POST'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-8'
            >
              <div className='grid w-full items-center gap-4'>
                {mode === 'signUp' && (
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
                          placeholder='이메일'
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

                {mode === 'signUp' && (
                  <FormField
                    control={form.control}
                    name='passwordCheck'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password Check</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='비밀번호 재입력'
                            type='password'
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
                {mode === 'signUp' ? 'Create account' : 'Sign In'}
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
            {mode === 'signUp' ? 'Sign up with GitHub' : 'Sign in with GitHub'}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
