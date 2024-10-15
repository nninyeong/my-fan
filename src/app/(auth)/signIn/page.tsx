'use client';

import Link from 'next/link';
import AuthForm from '@/components/auth/AuthForm';

export default function page() {
  return (
    <div className='flex flex-col items-center mt-24 justify-center'>
      <AuthForm isSignUp={false} />

      <div className='mt-4 text-center text-sm'>
        Would you like to sign up?{' '}
        <Link
          href='/signUp'
          className='underline'
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
