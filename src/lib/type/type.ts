// 유저 정보
export type UsersData = {
  id: string;
  created_at: string;
  display_name?: string | null;
  user_name?: string | null;
  avatar_url: string | null;
  email: string | null;
};

// 메시지 타입
export type Imessage = {
  created_at: string;
  id: string;
  is_edit: boolean;
  send_by: string;
  text: string;
  users: UsersData | null;
};
