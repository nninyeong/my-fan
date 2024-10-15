'use client';

// import { useEffect } from 'react';
import AuthForm from '@/components/shared/AuthForm';
// import { Github } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import browserClient from '@/utils/supabase/client';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
export default function MyPage() {
  // async function signInWithGithub() {
  //   await browserClient.auth.signInWithOAuth({
  //     provider: 'github',
  //     options: { redirectTo: window.origin + '/auth/callback' },
  //   });
  // }

  // useEffect(() => {
  //   browserClient.auth.getSession().then(console.log);
  // }, []);

  return (
    <div className='flex items-start mt-24 justify-center'>
      {/* <Card className='w-[400px]'>
        <CardHeader>
          <CardTitle className='font-bold text-3xl'>Create an account</CardTitle>
          <CardDescription>Enter your email below to create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label
                  htmlFor='email'
                  className='text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  email
                </Label>
                <Input
                  id='name'
                  placeholder='email@email.com'
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label
                  htmlFor='password'
                  className='text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  password
                </Label>
                <Input
                  id='password'
                  placeholder='password'
                />
              </div>
            </div>
          </form>

          <div className='relative flex items-center justify-center py-3 text-xs uppercase'>
            <div
              className='absolute inset-0 flex items-center'
              aria-hidden='true'
            >
              <div className='w-full border-t border-muted-foreground'></div>
            </div>
            <span className='relative z-10 bg-background px-2 text-muted-foreground'>Or continue with</span>
          </div>

          <div className='grid grid-cols gap-6'>
            <Button
              variant='outline'
              className='font-semibold'
              onClick={signInWithGithub}
            >
              <Github size={18} />
              GitHub
            </Button>
          </div>
        </CardContent>
        <CardFooter className='grid gap-6'>
          <Button>Create account</Button>
        </CardFooter>
      </Card> */}
      <AuthForm />
    </div>
  );
}
