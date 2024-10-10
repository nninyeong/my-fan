import Link from 'next/link';
import AuthButton from '../_/AuthButton';

export default function Nav() {
  return (
    <nav>
      <ul className='flex items-center gap-3'>
        <li>
          <Link href={'/artist'}>아티스트</Link>
        </li>
        <li>
          <Link href={'/login'}>로그인</Link>
        </li>
        {/* 
        <li>
          <Link href={'/signIn'}>github</Link>
        </li> 
        */}
        <AuthButton />
      </ul>
    </nav>
  );
}
