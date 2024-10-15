// export type Imessage = {
//   created_at: string;
//   id: string;
//   is_edit: boolean;
//   send_by: string;
//   text: string;
//   users: {
//     avatar_url: string;
//     created_at: string;
//     display_name: string;
//     user_name: string;
//     email: string;
//     id: string;
//   } | null;
// };

// 유저 정보
export type User = {
  id: string;
  created_at: string;
  display_name?: string;
  user_name?: string;
  avatar_url: string;
  email: string;
};

// 메시지 타입
export type Imessage = {
  created_at: string;
  id: string;
  is_edit: boolean;
  send_by: string;
  text: string;
  users: User | null;
};
