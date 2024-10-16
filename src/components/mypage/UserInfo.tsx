interface UserInfoProps {
  email?: string;
  metadata?: Record<string, any>;
}

export function UserInfo({ email, metadata }: UserInfoProps) {
  return (
    <div>
      <p>사용자 정보: {email ? email : '로그인 필요'}</p>
      <p>
        사용자 메타데이터:{' '}
        {metadata ? JSON.stringify(metadata, null, 2) : '메타데이터 없음'}
      </p>
    </div>
  );
}
