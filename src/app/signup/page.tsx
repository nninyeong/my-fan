'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import signup from './signup';
import { useState } from 'react';

function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');

  return (
    <Card className='mx-auto max-w-sm'>
      <CardHeader>
        <CardTitle className='text-xl'>Sign Up</CardTitle>
        <CardDescription>Enter your information to create an account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4'>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='name'>name</Label>
              <Input
                id='name'
                placeholder='이름'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              placeholder='이메일'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              type='password'
              value={passwd}
              onChange={(e) => setPasswd(e.target.value)}
              placeholder='비밀번호'
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='password-check'>Password Check</Label>
            <Input
              id='password-check'
              type='password'
              placeholder='비밀번호 재입력'
            />
          </div>
          <Button
            type='submit'
            className='w-full'
            onClick={() => signup(email, passwd)}
          >
            Create an account
          </Button>
          <Button
            variant='outline'
            className='w-full'
          >
            Sign up with GitHub
          </Button>
        </div>
        <div className='mt-4 text-center text-sm'>
          Already have an account?{' '}
          <Link
            href='#'
            className='underline'
          >
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default SignUpForm;
