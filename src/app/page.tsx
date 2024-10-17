'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import Link from 'next/link';
import { Group } from 'lucide-react';

type Group = {
  id: string;
  member: Array<string>;
  debut_date: string;
  thumbnail: string;
};

export default function Home() {
  const [artistName, setArtistName] = useState(''); // 아티스트 이름 상태
  const [artist, setArtist] = useState([]); // 검색된 아티스트 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  const fetchArtistList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/artist`, {
        params: { name: artistName }, // API 라우트에 쿼리 파라미터 전달
      });
      setArtist(response.data.data); // 받아온 데이터를 상태에 저장
    } catch (error) {
      console.error('Failed to fetch artist list:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArtistList();
  }, []);

  return (
    <section className='grid justify-items-center min-h-screen py-8 pb-20 m-auto container'>
      <article className='flex flex-wrap flex-col gap-10 p-4'>
        <div className='txt'>
          <h2 className='font-bold'>좋아하는 아티스트를 검색하세요!</h2>
        </div>
        <Input
          placeholder='아티스트 검색'
          value={artistName} // 입력값을 상태와 연결
          onChange={(e) => setArtistName(e.target.value)} // 입력값 변경 시 상태 업데이트
        />
        <Button onClick={fetchArtistList}>검색</Button> {/* 클릭 시 검색 실행 */}
      </article>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {artist.length > 0 ? (
            <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              {artist.map((item: Group, index: number) => (
                <li
                  key={index}
                  className='bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer'
                >
                  <Link href={`artist/${item.id}`}>
                    <div className='p-4'>
                      <img
                        src={item.thumbnail}
                        alt='Artist Thumbnail'
                        className='w-full h-auto object-cover rounded-t-lg '
                      />
                    </div>
                    <div className='p-4 text-center'>
                      <p className='text-xl font-bold'>{item.id}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>해당 아티스트가 없습니다!</p>
          )}
        </div>
      )}
    </section>
  );
}
