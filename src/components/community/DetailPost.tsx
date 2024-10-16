'use client';
import { createClient } from '@/utils/supabase/client';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { CommunityPost } from '@/lib/type/CommunityTypes';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';

type PostPropType = {
  posts: CommunityPost;
  postId: string;
};

export default function DetailPost({ posts, postId }: PostPropType) {
  const supabase = createClient();
  const router = useRouter();

  //TODO - 내가 쓴 글만 삭제해야함
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

  return (
    <>
      <Card className='w-[700px]'>
        <CardHeader className='pt-10'>
          <CardTitle>{posts.title}</CardTitle>
          <CardDescription>
            <Label className='mr-2'>{posts.users.display_name}</Label>
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
          {/* //TODO - 해당 유저가 쓴글일경우 버튼보이게 */}
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
        </CardFooter>
      </Card>
    </>
  );
}
