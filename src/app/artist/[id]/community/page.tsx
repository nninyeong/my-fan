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
// http://localhost:3000/artist/2/community

export default function CommunityPage() {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const supabase = createClient();
  const value = useParams();
  const artistId = value.id;

  //해당 아티스트 글 가져오기
  const getPosts = async () => {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('artist_id', artistId)
      .order('created_at', { ascending: false })
      .returns<CommunityPost[]>();
    setPosts(data || []);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <div>
        <div className='m-[10px] border-solid border-inherit border-b-2'>
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
          <div className='flex'>
            <h1>전체글</h1>
            <Link href={`/artist/${artistId}/posts`}>
              <Button>글쓰기</Button>
            </Link>
          </div>
          <CommunityTable posts={posts} />
        </div>
      </div>
    </>
  );
}
