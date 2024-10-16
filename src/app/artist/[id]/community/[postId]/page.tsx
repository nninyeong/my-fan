'use client';
import Comment from '@/components/community/Comment';
import DetailPost from '@/components/community/DetailPost';
import { UserInfo } from '@/components/community/PostForm';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { CommunityPost } from '@/lib/type/CommunityTypes';
import { createClient } from '@/utils/supabase/client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const PostDetail = () => {
  const [posts, setPosts] = useState<CommunityPost>({
    id: '',
    created_at: '',
    user_id: '',
    title: '',
    body: '',
    artist_id: '',
    users: {
      display_name: '',
      id: '',
    },
  });
  const supabase = createClient();

  const value = useParams<{ postId: string }>(); //!!!
  const postId: string = value.postId; //????? 걍 string 인데 ==> ok!!!

  //SECTION -
  const [userInfo, setUserInfo] = useState<UserInfo[] | null>([]);
  const { user } = useAuthStore();
  const userId = user?.id;

  //로그인 한 사용자 정보 가져오기(깃허브X)
  const fetchUserInfo = async () => {
    const { data, error } = await supabase.from('users').select(`*`).eq('id', userId!);
    if (error) {
      console.error('Error fetching user info:', error);
      return;
    }
    if (data && data.length > 0) {
      const Info = data[0];
      setUserInfo(Info);
    }
  };
  //SECTION -

  //해당 글 불러오기
  const getPosts = async (postId: string): Promise<CommunityPost | undefined> => {
    const { data, error } = await supabase
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
      .eq('id', postId)
      .single();
    setPosts(data as CommunityPost);

    if (error) {
      console.error('Error fetching post:', error.message);
      return;
    }
  };

  useEffect(() => {
    getPosts(postId);
    fetchUserInfo();
  }, []);

  return (
    <div className='flex flex-col justify-center items-center'>
      <div>
        <DetailPost
          posts={posts}
          postId={postId}
        />
        <Comment userInfo={userInfo} />
      </div>
    </div>
  );
};

export default PostDetail;
