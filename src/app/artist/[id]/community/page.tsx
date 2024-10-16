'use client';

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CommunityPost } from '@/lib/type/CommunityTypes';
import CommunityTable from '@/components/community/CommunityTable';
import Image from 'next/image';
import Link from 'next/link';

export default function CommunityPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const artistId = Array.isArray(id) ? id[0] : id ? decodeURIComponent(id) : '';

  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [artist, setArtist] = useState<string>('');
  const supabase = createClient();

  //해당 아티스트 글 가져오기
  const getPosts = async () => {
    const { data } = await supabase
      .from('posts')
      .select(
        `
        *,
        users (
          id,
          display_name
        )
      `,
      )
      .eq('artist_id', artistId)
      .order('created_at', { ascending: false });
    setPosts(data || []);
  };

  //아티스트 정보 가져오기
  const getArtist = async (artistId: string) => {
    const { data, error } = await supabase.from('artists').select('*').eq(`group`, artistId);

    if (error) {
      console.error('Error fetching data:', error);
      return;
    }

    const artistUrl = data[0].image;
    setArtist(artistUrl);
  };

  useEffect(() => {
    getPosts();
    getArtist(artistId);
  }, []);

  return (
    <div className='flex flex-col justify-start items-center'>
      <div className='mt-[30px] w-[1000px]'>
        <div className='mb-8'>
          <img
            src={artist}
            alt='seventeen'
            width={300}
            height={300}
            className='mb-[10px] '
          />
        </div>
        <div>
          <div className='flex justify-between border-solid border-inherit border-b-2 pb-4'>
            <div className='flex'>
              <h2>전체글 </h2>
              <h6 className='m-2'>({posts.length})</h6>
            </div>
            <Link href={`/artist/${artistId}/posts`}>
              <Button>글쓰기</Button>
            </Link>
          </div>
          <CommunityTable posts={posts} />
        </div>
      </div>
    </div>
  );
}
