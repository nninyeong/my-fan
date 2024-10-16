'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { id } = useParams();

  // id가 문자열일 때만 decodeURIComponent를 호출
  const urlId = Array.isArray(id) ? id[0] : id ? decodeURIComponent(id) : '';

  return (
    <section className='min-h-screen m-auto py-1 pb-20 container'>
      <div className='flex items-center justify-center border-b dark:border-b-white border-b-black border-t-0 gap-4'>
        <Link href={`/artist/${urlId}`}>아티스트</Link>
        <Link href={`/artist/${urlId}/community`}>커뮤니티</Link>
        <Link href={`/artist/${urlId}/schedule`}>스케쥴</Link>
      </div>
      {children}
    </section>
  );
}
