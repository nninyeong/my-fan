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

  //날짜 포멧 함수
  const formatDate = (date: string): React.ReactNode => {
    const dateTime = new Date(date);
    // 한국어 형식으로 날짜 및 시간 포맷
    const formattedDateTime = new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long', // "10월" 형식
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // 12시간 형식 (오전/오후)
      timeZone: 'Asia/Seoul', // 한국 표준시로 변환
    }).format(dateTime);
    return formattedDateTime;
  };

  //글 디테일 페이지로 이동
  const movePostDetail = (id: string) => {
    router.push(`/artist/${postId}/community/${id}`);
  };

  return (
    <div>
      <div>
        <Table>
          {/* <TableCaption>fan들의 공간</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className='text-center w-[100px] '>번호</TableHead>
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
                <TableCell className='font-medium'></TableCell>
                <TableCell>{post.user_id}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell className='text-right'>{formatDate(post.created_at)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className='my-4'>
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
