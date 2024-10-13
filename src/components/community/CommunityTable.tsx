'use client';

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { CommunityPost } from '@/lib/type/CommunityTypes';
import { useParams, useRouter } from 'next/navigation';

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
          <TableCaption>fan들의 공간</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>번호</TableHead>
              <TableHead>글쓴이</TableHead>
              <TableHead>제목</TableHead>
              <TableHead className='text-right'>등록일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts?.map((post) => (
              <TableRow
                key={post.id}
                onClick={() => movePostDetail(post.id)}
              >
                <TableCell className='font-medium'></TableCell>
                <TableCell>{post.user_id}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell className='text-right'>{post.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href='#' />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#'>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href='#' />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
