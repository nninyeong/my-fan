'use client';

import { createClient } from '@/utils/supabase/client';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CommunityPost } from '@/lib/type/CommunityTypes';

export default function DetailPost() {
  const [posts, setPosts] = useState<CommunityPost>({});
  const supabase = createClient();
  const value = useParams();
  const postId: string = value.postId; //????? 걍 string 인데 뭔말.,..?
  const router = useRouter();

  //해당 글 불러오기
  const getPosts = async (postId: string) => {
    const { data, error } = await supabase.from('posts').select('*').eq('id', postId).single();
    setPosts(data as CommunityPost);

    if (error) {
      console.error('Error fetching post:', error.message);
      return;
    }
  };

  //삭제
  //TODO - 내가 쓴 글만 삭제해야함
  const handleDelete = async (postId: string) => {
    const confirmed = window.confirm('정말로 이 게시글을 삭제하시겠습니까?');
    if (!confirmed) return;

    const { error } = await supabase.from('posts').delete().eq('id', postId);

    if (error) {
      console.error('게시 글 삭제 중 오류가 발생했습니다.', error.message);
      alert('게시 글 삭제 중 오류가 발생했습니다.');
      return;
    }

    alert('게시글이 삭제되었습니다.');
    router.push(`/artist/${posts.artist_id}/community`);
  };

  //수정 (postForm 컴포넌트로 이동)
  const handleUpdate = () => {
    router.push(`/artist/${posts.artist_id}/posts?postId=${postId}`);
  };

  useEffect(() => {
    getPosts(postId);
  }, []);

  return (
    <>
      <h1>{posts.title}</h1>
      <div>
        <span>{posts.user_id} </span>
        <span>{posts.created_at}</span>
      </div>
      <div>
        <p>{posts.body}</p>
      </div>
      <div>
        {/* //TODO - 해당 유저가 쓴글일경우 버튼보이게 */}
        <Button onClick={handleUpdate}>수정</Button>
        <Button onClick={() => handleDelete(postId)}>삭제</Button>
      </div>
    </>
  );
}
