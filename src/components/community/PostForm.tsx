'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createClient } from '@/utils/supabase/client';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // const [post, setPost] = useState();
  const supabase = createClient();
  const router = useRouter();

  //URL 해당 글 id
  const params = useSearchParams();
  const getParams = params.get('postId');

  //URL 아티스트 id
  const value = useParams();
  const artistId = value.id;

  //해당 글 불러오기
  // const getPost = async (postId: string) => {
  //   const { data, error } = await supabase.from('posts').select('*').eq('id', postId).single();
  //   setPost(data);

  //   if (error) {
  //     console.error('Error fetching post:', error.message);
  //     return;
  //   }
  // };

  // 글 등록
  const addPost = async () => {
    const { error } = await supabase.from('posts').insert([
      {
        title,
        body: content,
        artist_id: artistId,
        user_id: 'heerok', //TODO - 유저정보 가져와서 넣기
      },
    ]);

    if (error) {
      console.error('Error adding todo:', error);
    } else {
      window.confirm('게시글이 등록되었습니다.');
      router.push(`/artist/${artistId}/community`);
    }
  };

  //글 수정

  //
  // useEffect(()=>{
  //   getPost();
  // },[])

  return (
    <>
      <div>
        <div>
          <span>제목</span>
          <Input
            type='text'
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <span>내용</span>
          <Textarea
            name=''
            id=''
            onChange={(e) => setContent(e.target.value)}
          ></Textarea>
        </div>
        <div>
          {getParams ? (
            <>
              <Button
                variant='destructive'
                onClick={() => router.push(`/artist/${artistId}/community/${getParams}`)}
              >
                취소
              </Button>
              <Button>수정</Button>
            </>
          ) : (
            <>
              <Button
                variant='destructive'
                onClick={() => router.push(`/artist/${artistId}/community`)}
              >
                취소
              </Button>
              <Button onClick={addPost}>등록</Button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
