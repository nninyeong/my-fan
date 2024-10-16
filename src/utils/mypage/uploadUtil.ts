/* eslint-disable @typescript-eslint/no-unused-vars */
import browserClient from '@/utils/supabase/client';

export async function uploadAvatar(file: File, userId: string) {
  const fileExt = file.name.split('.').pop();
  const randomSuffix = Math.random().toString(36).substring(2, 15);
  const fileName = `${userId}_${randomSuffix}.${fileExt}`;
  const filePath = `${fileName}`;

  // Supabase 스토리지에 파일 업로드
  const { data, error } = await browserClient.storage.from('avatars').upload(filePath, file);

  if (error) {
    throw new Error('파일 업로드 중 오류가 발생했습니다.');
  }

  // 업로드된 파일의 URL 가져오기
  const { data: publicUrlData } = browserClient.storage.from('avatars').getPublicUrl(filePath);

  if (!publicUrlData.publicUrl) {
    throw new Error('파일 URL을 가져오는 중 오류가 발생했습니다.');
  }

  return publicUrlData.publicUrl;
}

export async function updateAvatarUrl(userId: string, avatarUrl: string) {
  const { error } = await browserClient.from('users').update({ avatar_url: avatarUrl }).eq('id', userId);

  if (error) {
    throw new Error('사용자 정보 업데이트 중 오류가 발생했습니다.');
  }
}
