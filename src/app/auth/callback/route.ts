import { NextResponse } from 'next/server';
// 서버 사이드 인증 설명에서 만든 클라이언트
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // "next"라는 파라미터가 있으면, 해당 값을 리다이렉트 URL로 사용
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    // exchangeCodeForSession이거 말고 인가코드 주는 토큰으로 유저정보 받는거 <!-- 유즈이펙트 안으로 들어가는거
    // 받아서 토큰가지고 깃허브 DB에 유저정보를 가져오는
    // 세션에서 토큰 있으면 유저정보 요청하는게 있을꺼야
    // 없으면 망함 ㅅㄱ
    // 이거로 로그인하는거 아니고 db에 getuser같은거 배열로 보내서
    // 인증했으니까 정보내놔
    // authto 그게 없으면 page.tsx
    // !!!!!!!!!!!!!!!!!!!!!유즈파람즈로 빼오고
    // oauth2.0 jwt

    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host'); // 로드 밸런서 이전의 원래 origin
      const isLocalEnv = process.env.NODE_ENV === 'development';
      if (isLocalEnv) {
        // 로컬 환경에서는 로드 밸런서가 없으므로 X-Forwarded-Host를 확인할 필요가 없음
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // 오류 페이지로 리다이렉트하여 안내 페이지를 보여줌
  return NextResponse.redirect(`${origin}/auth/error`);
}
