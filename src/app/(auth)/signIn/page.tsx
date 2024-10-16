'use client';

import Link from 'next/link';
import AuthForm from '@/components/auth/AuthForm';

export default function Page() {
  return (
    <div className='flex flex-col items-center mt-24 justify-center'>
      <AuthForm mode='signIn' />

      <div className='mt-4 text-center text-sm'>
        {`Don't have an account?`}{' '}
        <Link
          href='/signUp'
          className='underline'
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
