'use client';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { createClient } from '@/utils/supabase/client';
import { useParams } from 'next/navigation';
import { Comments } from '@/lib/type/CommunityTypes';
import { Input } from '../ui/input';

export default function Comment() {
  const supabase = createClient();
  const [comments, setComments] = useState<Comments[]>([]);
  const [comment, setComment] = useState('');
  const [updateComment, setUpdateComment] = useState('');
  const [preUpdateComment, setPreUpdateComment] = useState('');

  //아티스트, 글 id
  const value = useParams<{ id: string; postId: string }>();
  const artistId = value.id;
  const postId = value.postId;

  // 댓글 등록
  const handleCommentInsert = async () => {
    const { data, error } = await supabase
      .from('comments')
      .insert({
        post_id: postId,
        content_text: comment,
        artist_id: artistId,
        user_id: '3f4934ee-6936-4ef8-9afb-7bcf8ef43f64', //TODO - 유저정보 가져와서 넣기
      })
      .select(); // **댓글을 데이터베이스에 추가한 후, 데이터 받아오기!

    if (error) {
      console.error('댓글 작성 오류', error.message);
      return;
    }
    setComments([...comments, ...data]);
    setComment('');
  };

  //해당 아티스트 및 게시글 댓글 불러오기
  const getComments = async (postId: string) => {
    const { data, error } = await supabase.from('comments').select('*').eq('post_id', postId);
    setComments(data || []);

    if (error) {
      console.error('게시글 패치 오류', error.message);
      return;
    }
  };

  //댓글 삭제
  const handleDeleteComment = async (id: string) => {
    const confirmed = window.confirm('댓글을 삭제하시겠습니까?');
    if (!confirmed) return;

    const response = await supabase.from('comments').delete().eq('id', id);

    if (response.status === 204) {
      console.log('삭제성공');
      setComments((prev) => prev.filter((co) => co.id !== id));
    } else {
      console.log('에러 코드', response.error?.code);
      console.log('에러 메시지', response.error?.message);
    }
  };

  //수정버튼 클릭 시 input 활성화
  const handleEdit = async (comment: Comments) => {
    await supabase.from('comments').update({ edit_comment: !comment.edit_comment }).eq('id', comment.id);
    setPreUpdateComment(comment.content_text);
    setComments((prev) =>
      prev.map((p) => {
        if (p.id === comment.id) {
          return { ...comment, edit_comment: !comment.edit_comment };
        } else {
          return p;
        }
      }),
    );
  };

  //댓글 수정
  const handleUpdate = async (commentId: string) => {
    const { error } = await supabase.from('comments').update({ content_text: comment }).eq('id', commentId);
    if (error) {
      console.error('게시글 수정 오류', error);
    } else {
      window.confirm('댓글이 수정되었습니다.');
    }
  };

  useEffect(() => {
    getComments(postId);
  }, []);
  return (
    <div>
      <span>댓글</span>
      <Textarea
        placeholder='댓글을 입력해주세요.'
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      ></Textarea>
      <Button onClick={handleCommentInsert}>등록</Button>
      <ul>
        {comments.map((comment) => (
          <li
            key={comment.id}
            className='border-2'
          >
            <div className='flex gap-4'>
              {/* //TODO - comment테이블과 유저테이블 조인해서 유저에있는 display_name 가져오기 */}
              <div>{comment.user_id}</div>
              {/* 댓글 쓴 유저만 보이게 */}
              <div>
                <Button onClick={() => handleEdit(comment)}>수정</Button>
                <Button onClick={() => handleDeleteComment(comment.id)}>삭제</Button>
              </div>
            </div>
            <div>
              {comment.edit_comment ? (
                <div className='flex'>
                  <Input
                    type='text'
                    onChange={(e) => setUpdateComment(e.target.value)}
                    value={preUpdateComment}
                  />
                  <Button onClick={() => handleUpdate(comment.id)}>댓글 수정</Button>
                </div>
              ) : (
                <div>{comment.content_text}</div>
              )}
            </div>
            <div className='flex gap-2'>
              <p>{comment.created_at}</p>
              <button>답글 쓰기</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
