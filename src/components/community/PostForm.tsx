'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createClient } from '@/utils/supabase/client';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type PostId = string | null;

export default function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const supabase = createClient();
  const router = useRouter();

  //URL 해당 글 id
  const params = useSearchParams();
  const postId: PostId = params.get('postId');

  //URL 아티스트 id
  const value = useParams();
  const artistId = value.id;

  //해당 글 불러오기
  const getPost = async (postId: PostId) => {
    const { data, error } = await supabase.from('posts').select('*').eq('id', postId).single();
    setContent(data.body);
    setTitle(data.title);

    if (error) {
      console.error('게시글 패치 오류', error.message);
      return;
    }
  };

  // 글 등록
  const handleInsertPost = async () => {
    const { error } = await supabase.from('posts').insert([
      {
        title,
        body: content,
        artist_id: artistId,
        user_id: '3f4934ee-6936-4ef8-9afb-7bcf8ef43f64', //TODO - 유저정보 가져와서 넣기
      },
    ]);

    if (error) {
      console.error('게시글 등록 오류', error);
    } else {
      window.confirm('게시글이 등록되었습니다.');
      router.push(`/artist/${artistId}/community`);
    }
  };

  //글 수정
  const handleUpdatePost = async () => {
    const { error } = await supabase.from('posts').update({ title, body: content }).eq('id', postId);
    if (error) {
      console.error('게시글 수정 오류', error);
    } else {
      window.confirm('게시글이 수정되었습니다.');
      router.push(`/artist/${artistId}/community`);
    }
  };

  useEffect(() => {
    getPost(postId);
  }, []);

  return (
    <>
      <div>
        <div>
          <span>제목</span>
          <Input
            type='text'
            placeholder='제목을 입력해주세요.'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div>
          <span>내용</span>
          <Textarea
            placeholder='내용을 입력해주세요.'
            onChange={(e) => setContent(e.target.value)}
            value={content}
          ></Textarea>
        </div>
        <div>
          {postId ? (
            <>
              <Button
                variant='destructive'
                onClick={() => router.push(`/artist/${artistId}/community/${postId}`)}
              >
                취소
              </Button>
              <Button onClick={handleUpdatePost}>수정</Button>
            </>
          ) : (
            <>
              <Button
                variant='destructive'
                onClick={() => router.push(`/artist/${artistId}/community`)}
              >
                취소
              </Button>
              <Button onClick={handleInsertPost}>등록</Button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
