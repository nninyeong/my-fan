'use client';

import Link from 'next/link';
import AuthForm from '@/components/auth/AuthForm';

export default function page() {
  return (
    <div className='flex flex-col items-center mt-24 justify-center'>
      <AuthForm isSignUp={true} />

      <div className='mt-4 text-center text-sm'>
        Already have an account?{' '}
        <Link
          href='/signIn'
          className='underline'
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
