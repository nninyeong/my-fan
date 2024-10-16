import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database } from '@/lib/type/database.types';

export const createClient = () => {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            // `set` 메서드가 서버 컴포넌트에서 호출되었습니다.
            // 만약 세션 갱신을 위한 미들웨어가 있다면 이 오류는 무시해도 됩니다.
            console.error(error);
          }
        },
      },
    },
  );
};

export const getIsLogin = async () => {
  const serverClient = createClient();
  const {
    data: { session },
  } = await serverClient.auth.getSession();
  return !!session;
};
