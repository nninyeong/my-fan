"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/lib/stores/useAuthStore";
import browserClient from "@/utils/supabase/client";

export default function Session({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);
  const setLogin = useAuthStore((state) => state.setLogin);

  useEffect(() => {
    // 페이지 로드 시 세션 확인
    browserClient.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error("세션 가져오기 오류:", error.message);
        return;
      }
      if (data?.session) {
        setUser(data.session.user);
        setLogin(true);
      }
    });
  }, [setUser, setLogin]);

  return <>{children}</>;
}
