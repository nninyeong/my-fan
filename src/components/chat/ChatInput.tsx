'use client';

import { Imessage, useMessage } from '@/lib/stores/useMessagesStore';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import browserClient from '@/utils/supabase/client';
import { Input } from '@/components/ui/input';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

export default function ChatInput() {
  const user = useAuthStore((state) => state.user);
  const addMessage = useMessage((state) => state.addMessage);
  const setOptimisticIds = useMessage((state) => state.setOptimisticIds);

  const supabase = browserClient;

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
          ...user?.user_metadata,
          created_at: new Date().toDateString(),
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
