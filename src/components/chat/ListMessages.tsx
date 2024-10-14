'use client';

import { Imessage, useMessage } from '@/lib/stores/useMessagesStore';
import browserClient from '@/utils/supabase/client';
import Message from './Message';
import { DeleteAlert, EditAlert } from './MessageAction';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { ArrowDown } from 'lucide-react';

export default function ListMessages() {
  // 스크롤 위치를 추적하는 Ref
  const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [userScrolled, setUserScrolled] = useState<boolean>(false);

  const { messages, addMessage, optimisticIds, optimisticDeleteMessage, optimisticUpdateMessage } = useMessage(
    (state) => state,
  );
  const supabase = browserClient;

  // Supabase 구독 관리
  useEffect(() => {
    const channel = supabase
      .channel('chat-room')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, async (payload) => {
        if (!optimisticIds.includes(payload.new.id)) {
          const { error, data } = await supabase.from('users').select('*').eq('id', payload.new.send_by).single();
          if (error) {
            toast.error(error.message);
          } else {
            const newMessage = {
              ...payload.new,
              users: data,
            };
            addMessage(newMessage as Imessage);
          }
        }

        const scrollContainer = scrollRef.current;
        if (scrollContainer.scrollTop < scrollContainer.scrollHeight - scrollContainer.clientHeight - 10) {
          setUserScrolled(true);
        }
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'messages' }, (payload) => {
        optimisticDeleteMessage(payload.old.id);
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'messages' }, (payload) => {
        optimisticUpdateMessage(payload.new as Imessage);
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [messages]);

  // 메시지가 추가될 때 스크롤을 아래로 이동
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer && !userScrolled) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);

  // 스크롤 이벤트 처리
  const handleOnScroll = () => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const isScroll = scrollContainer.scrollTop < scrollContainer.scrollHeight - scrollContainer.clientHeight - 10;
      setUserScrolled(isScroll);

      if (scrollContainer.scrollTop === scrollContainer.scrollHeight - scrollContainer.clientHeight) {
        setUserScrolled(false);
      }
    }
  };

  // 스크롤을 하단으로 이동
  const scrollDown = () => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

  return (
    <>
      <div
        className='flex-1 flex flex-col p-5 h-full overflow-y-auto gap-5'
        ref={scrollRef}
        onScroll={handleOnScroll}
      >
        <div className='space-y-7'>
          {messages.map((value, index) => (
            <Message
              key={index}
              message={value}
            />
          ))}
        </div>

        <DeleteAlert />
        <EditAlert />
      </div>

      {userScrolled && (
        <div className='absolute bottom-20 w-full'>
          <div
            className='w-10 h-10 bg-white rounded-full flex justify-center items-center border mx-auto cursor-pointer '
            onClick={scrollDown}
          >
            <ArrowDown />
          </div>
        </div>
      )}
    </>
  );
}
