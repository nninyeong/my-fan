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
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// http://localhost:3000/artist/seventeen/community
type Post = {
  id: string;
  created_at: string;
  user_id: string;
  title: string;
  body: string;
  artist_id: string;
};

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const supabase = createClient();

  const getPosts = async () => {
    const { data } = await supabase.from('posts').select('*').eq('artist_id', 'seventeen').returns<Post[]>(); //아티스트 아이디 가져와서 넣기
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
          <div>
            <Table>
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
                  <TableRow key={post.id}>
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
      </div>
    </>
  );
}
