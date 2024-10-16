'use client';

import { Imessage } from '@/lib/type/type';
import { useMessage } from '@/lib/stores/useMessagesStore';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import browserClient from '@/utils/supabase/client';
import { Input } from '@/components/ui/input';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

export default function ChatInput() {
  const supabase = browserClient;
  const user = useAuthStore((state) => state.user);
  const addMessage = useMessage((state) => state.addMessage);
  const setOptimisticIds = useMessage((state) => state.setOptimisticIds);

  const handleSendMessage = async (text: string) => {
    if (text.trim()) {
      // NOTE - 낙관적 업데이트 삽입
      const newMessage = {
        id: uuidv4(),
        text,
        send_by: user?.id,
        is_edit: false,
        created_at: new Date().toDateString(),
        users: {
          id: user?.id,
          avatar_url: user?.user_metadata.avatar_url,
          created_at: new Date().toDateString(),
          display_name: user?.user_metadata.user_name,
          email: user?.user_metadata.email,
        },
      };

      // NOTE - 낙관적 업데이트로 메시지를 추가
      addMessage(newMessage as Imessage);
      setOptimisticIds(newMessage.id);

      const { error } = await supabase.from('messages').insert({ text });
      if (error) {
        toast.error(error.message);
      }
    } else {
      toast.error('메세지가 비어있어요');
    }
  };

  return (
    <div className='p-5'>
      <Input
        placeholder='함께 대화하세요!'
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSendMessage(e.currentTarget.value);
            e.currentTarget.value = '';
          }
        }}
      />
    </div>
  );
}
