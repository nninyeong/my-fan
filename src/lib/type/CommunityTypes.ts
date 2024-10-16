import { UUID } from 'crypto';

// 커뮤니티 포스터 타입
export type CommunityPost = {
  id: string;
  created_at: string;
  user_id: string;
  title: string;
  body: string;
  artist_id: string;
};

export type Comments = {
  id: string;
  created_at: string;
  user_id: string;
  post_id: UUID;
  content_text: string;
  parent_comment_id: string;
  artist_id: string;
  edit_comment: boolean;
};
