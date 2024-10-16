'use client';

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CommunityPost } from '@/lib/type/CommunityTypes';
import seventeen from '../../../../../public/images/seventeen.png';
import Image from 'next/image';
import CommunityTable from '@/components/community/CommunityTable';
import { useParams } from 'next/navigation';

export default function CommunityPage() {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const supabase = createClient();
  const value = useParams();
  const artistId = value.id;

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

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className='flex flex-col justify-start items-center'>
      <div className='mt-[30px] w-[1000px]'>
        <div className='mb-8'>
          {/* //TODO - 임시로 놓은 사진 (해당 가수 사진 가져와야함) */}
          <Image
            alt='seventeen'
            src={seventeen}
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
