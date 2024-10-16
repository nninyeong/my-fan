'use client';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { createClient } from '@/utils/supabase/client';
import { useParams } from 'next/navigation';
import { Comments } from '@/lib/type/CommunityTypes';
import { Input } from '../ui/input';

export default function Comment({ userInfo }) {
  const supabase = createClient();
  const [comments, setComments] = useState<Comments[]>([]);
  const [comment, setComment] = useState('');
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
        user_id: userInfo.id,
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
    const { data, error } = await supabase
      .from('comments')
      .select(
        `
    *,
    users (
      id,
      display_name
    )
  `,
      )
      .eq('post_id', postId)
      .order('created_at');
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
    const { error } = await supabase
      .from('comments')
      .update({ content_text: preUpdateComment, edit_comment: false })
      .eq('id', commentId);
    if (error) {
      console.error('게시글 수정 오류', error);
    } else {
      //바로 화면에 업데이트
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId ? { ...comment, content_text: preUpdateComment, edit_comment: false } : comment,
        ),
      );

      window.confirm('댓글이 수정되었습니다.');
    }
  };

  console.log(comments);

  useEffect(() => {
    getComments(postId);
  }, []);
  return (
    <div className='mt-10'>
      <div className='flex gap-2'>
        <p className='mb-2'>댓글</p>
        <p className='mb-2'>({comments.length})</p>
      </div>
      <div className='flex gap-2'>
        <Textarea
          placeholder='댓글을 입력해주세요.'
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        ></Textarea>
        <Button
          onClick={handleCommentInsert}
          className='my-4 h-[80px]'
        >
          등록
        </Button>
      </div>

      {comments.length === 0 ? (
        <div className='mt-8 mb-[100px] text-center'>댓글이 없습니다.</div>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li
              key={comment.id}
              className='border-t-2 pt-4 mt-4 mb-8'
            >
              <div className='flex gap-4 justify-between'>
                <div>{comment.users.display_name}</div>
                {/* //TODO - 댓글 쓴 유저만 버튼 보이게 */}
                <div>
                  <Button
                    variant='outline'
                    onClick={() => handleEdit(comment)}
                    className='w-[50px] h-[30px] mr-2'
                  >
                    수정
                  </Button>
                  <Button
                    variant='destructive'
                    onClick={() => handleDeleteComment(comment.id)}
                    className='w-[50px] h-[30px]'
                  >
                    삭제
                  </Button>
                </div>
              </div>
              <div>
                {comment.edit_comment ? (
                  <div className='flex gap-2 mt-2'>
                    <Input
                      type='text'
                      onChange={(e) => setPreUpdateComment(e.target.value)}
                      value={preUpdateComment}
                      className='py-2'
                    />
                    <Button onClick={() => handleUpdate(comment.id)}>댓글 수정</Button>
                  </div>
                ) : (
                  <div className='pb-4'>{comment.content_text}</div>
                )}
              </div>
              <div className='flex gap-2'>
                <p className='py-2 text-gray-400'>{comment.created_at}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
