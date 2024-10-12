'use client';

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CommunityPost } from '@/lib/type/CommunityTypes';
import PostTable from '@/components/community/PostTable';

// http://localhost:3000/artist/seventeen/community

export default function CommunityPage() {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const supabase = createClient();

  const getPosts = async () => {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('artist_id', 'seventeen')
      .order('created_at', { ascending: false })
      .returns<CommunityPost[]>(); //TODO - 아티스트id 가져와서 넣기
    setPosts(data || []);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <div>
        <div>이미지</div>
        <div>
          <div className='flex'>
            <h1>전체글</h1>
            {/* 가수 넣기 */}
            <Link href={'/artist/seventeen/posts'}>
              <Button>글쓰기</Button>
            </Link>
          </div>
          <PostTable posts={posts} />
        </div>
      </div>
    </>
  );
}
