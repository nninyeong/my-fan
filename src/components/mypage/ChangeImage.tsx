import { AVATAR_URL } from '@/lib/constants/constants';

interface ChangeImageProps {
  avatarUrl?: string;
}

export function ChangeImage({ avatarUrl }: ChangeImageProps) {
  const defaultImg = AVATAR_URL;

  return (
    <div className='w-44 h-44 rounded-full overflow-hidden m-auto relative'>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt='User Avatar'
          className='cursor-pointer'
        />
      ) : (
        <img
          src={defaultImg}
          alt='Default Image'
          className='cursor-pointer'
        />
      )}
    </div>
  );
}
