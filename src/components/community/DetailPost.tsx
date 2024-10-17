'use client';
import { createClient } from '@/utils/supabase/client';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { CommunityPost } from '@/lib/type/CommunityTypes';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { UserInfo } from './PostForm';

type PostPropType = {
  posts: CommunityPost;
  postId: string;
};

export default function DetailPost({ posts, postId }: PostPropType) {
  const supabase = createClient();
  const router = useRouter();

  // //SECTION -
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
  // //SECTION -
  console.log(userInfo);

  // 글 삭제하기
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

  // 글 수정하기 (postForm 컴포넌트로 이동)
  const handleUpdate = () => {
    router.push(`/artist/${posts.artist_id}/posts?postId=${postId}`);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <>
      <Card className='w-[700px]'>
        <CardHeader className='pt-10'>
          <CardTitle>{posts.title}</CardTitle>
          <CardDescription>
            <Label className='mr-2'>
              {posts.users && posts.users.display_name ? posts.users.display_name : '이름 없음'}
            </Label>
            <Label></Label>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className='rounded-lg border p-4 pb-[100px]'>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <p>{posts.body}</p>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex justify-between'>
          {userInfo.id === posts.user_id ? (
            <>
              <Button
                variant='outline'
                onClick={handleUpdate}
              >
                수정
              </Button>
              <Button
                variant='destructive'
                onClick={() => handleDelete(postId)}
              >
                삭제
              </Button>
            </>
          ) : (
            <div></div>
          )}
        </CardFooter>
      </Card>
    </>
  );
}
