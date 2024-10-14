'use client';

import browserClient from '@/utils/supabase/client';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { useAuthStore } from '@/lib/stores/useAuthStore'; // useAuthStore를 사용
import { Imessage, useMessage } from '@/lib/stores/useMessagesStore';

export default function ChatInput() {
  const user = useAuthStore((state) => state.user); // useAuthStore에서 user 가져오기
  const addMessage = useMessage((state) => state.addMessage);
  const setOptimisticIds = useMessage((state) => state.setOptimisticIds);

  const supabase = browserClient;

  const handleSendMessage = async (text: string) => {
    
    if (text.trim()) {
      alert(text);

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

      // NOTE - 낙관적 업데이트로 중복 업데이트 방지
      setOptimisticIds(newMessage.id);

      const { error } = await supabase.from('messages').insert({ text });
      if (error) {
        toast.error(error.message);
      }
    } else {
      toast.error('메세지 빔 ㅅㄱ');
    }
  };

  return (
    <div className='p-5'>
      <Input
        placeholder='send message'
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
