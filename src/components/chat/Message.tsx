// import Image from 'next/image';
import MessageMenu from './MessageMenu';
import { Imessage } from '@/lib/stores/useMessagesStore';
import { useAuthStore } from '@/lib/stores/useAuthStore';

export default function Message({ message }: { message: Imessage }) {
  const user = useAuthStore((state) => state.user);
  const username = message.users?.user_name;

  return (
    <div className='flex gap-2'>
      <div className='h-10 w-10 bg-green-500 rounded-full overflow-hidden'>
        <img
          src={message.users?.avatar_url!}
          alt={message.users?.display_name!}
          // alt={message.users?.display_name || username || ''}
          className='w-full h-full rounded-full ring-2 object-cover'
        />
      </div>

      <div className='flex-1'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-1'>
            <h1 className='font-bold text-base'>{message.users?.display_name || username}</h1>
            <h1 className='text-sm text-gray-500'>{new Date(message.created_at).toDateString()}</h1>
            {message.is_edit && <h1 className='text-sm text-gray-400'>수정 완료</h1>}
          </div>

          {message.users?.id === user?.id && <MessageMenu message={message} />}
        </div>

        <p className='text-gray-400'>{message.text}</p>
      </div>
    </div>
  );
}
