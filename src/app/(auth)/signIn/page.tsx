'use client';

import Link from 'next/link';
import AuthForm from '@/components/shared/AuthForm';

export default function page() {
  return (
    <div className='flex flex-col items-center mt-24 justify-center'>
      <AuthForm isSignUp={false} />

      <div className='mt-4 text-center text-sm'>
        Already have an account?{' '}
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
