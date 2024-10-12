'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const supabase = createClient();
  const router = useRouter();

  // 글 등록
  const addPost = async () => {
    const { error, data } = await supabase.from('posts').insert([
      {
        title,
        body: content,
        artist_id: 'seventeen', //TODO - 가수 받아와서 넣기
        user_id: 'heerok', //TODO - 유저정보 가져와서 넣기
      },
    ]);

    if (error) {
      console.error('Error adding todo:', error);
    } else {
      console.log('Todo added:', data);
      router.push('/artist/가수이름/community'); //TODO - 가수 받아와서 넣기
    }
  };

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
          <Button
            variant='destructive'
            onClick={() => router.push('/artist/가수이름/community')} //TODO - 가수 가져와서 넣기
          >
            취소
          </Button>
          <Button onClick={addPost}>등록</Button>
        </div>
      </div>
    </>
  );
}
