import { createClient } from '@/utils/supabase/server';

export default async function ProfilePage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error('세션을 가져오는 중 오류가 발생했습니다:', error.message);
    return <div>세션을 가져오는 중 오류가 발생했습니다.</div>;
  }
  const user = data.session?.user;
  // const userbabe = data.session?.user;
  console.log(`유저어`, user);
  console.log(`유저어meta`, user?.user_metadata);
  const meta = user?.user_metadata;
  return (
    <div>
      <h1>프로필 페이지</h1>
      {user ? (
        <>
          <p>유저 ID: {user.id}</p>
          <p>이메일: {user.email}</p>

          <hr />
          <p>name: {meta.avatar_url}</p>
          <p>user_name: {meta.user_name || meta.username}</p>
          <p>이메일: {meta.email}</p>
          {/* 세션 정보를 InitUser로 전달 */}
          {/* <InitUser user={user} /> */}
        </>
      ) : (
        <p>로그인이 필요합니다.</p>
      )}
      {/* <InitUser user={data.session?.user} /> */}
    </div>
  );
}
