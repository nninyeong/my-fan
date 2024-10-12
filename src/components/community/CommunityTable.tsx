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
import { useRouter } from 'next/navigation';

type PostPropType = {
  posts: CommunityPost[];
};

export default function CommunityTable({ posts }: PostPropType) {
  const router = useRouter();

  //글 디테일 페이지로 이동
  const movePostDetail = (id: string) => {
    router.push(`/artist/seventeen/community/${id}`);
  };

  return (
    <div>
      <div>
        <Table>
          {/* TODO - 해당 가수이름 넣기 */}
          <TableCaption>[가수이름] fan들의 공간</TableCaption>
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
