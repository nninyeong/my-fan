'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CommunityPost } from '@/lib/type/CommunityTypes';
import { useParams, useRouter } from 'next/navigation';
import { formatDate } from '@/utils/community/communityUtil';

type PostPropType = {
  posts: CommunityPost[];
};

export default function CommunityTable({ posts }: PostPropType) {
  const router = useRouter();
  const value = useParams();
  const postId = value.id;

  //글 디테일 페이지로 이동
  const movePostDetail = (id: string) => {
    router.push(`/artist/${postId}/community/${id}`);
  };

  return (
    <div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='text-center w-[150px] '>가수</TableHead>
              <TableHead className='text-center w-[150px]'>글쓴이</TableHead>
              <TableHead className='text-center'>제목</TableHead>
              <TableHead className='text-center w-[200px]'>등록일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts?.map((post) => (
              <TableRow
                key={post.id}
                onClick={() => movePostDetail(post.id)}
                className='text-center
                '
              >
                <TableCell className='font-medium'>{post.artist_id}</TableCell>
                <TableCell> {post.users && post.users.display_name ? post.users.display_name : '이름 없음'}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell className='text-right'>{formatDate(post.created_at)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
