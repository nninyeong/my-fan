'use client';

import { Imessage, useMessage } from '@/lib/stores/useMessagesStore';
import browserClient from '@/utils/supabase/client';
import Message from './Message';
import DeleteAlert from './DeleteAlert';
import EditAlert from './EditAlert';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { ArrowDown } from 'lucide-react';

export default function ListMessages() {
  const scrollRef = useRef<HTMLDivElement>(null); // 스크롤 위치 추적
  const [userScrolled, setUserScrolled] = useState(false);
  const { messages, addMessage, optimisticIds, optimisticDeleteMessage, optimisticUpdateMessage } = useMessage();

  // Supabase 구독 설정
  useEffect(() => {
    const supabase = browserClient;

    const channel = supabase
      .channel('chat-room')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, async (payload) => {
        if (!optimisticIds.includes(payload.new.id)) {
          const { data, error } = await supabase.from('users').select('*').eq('id', payload.new.send_by).single();
          if (error) {
            toast.error(error.message);
          } else {
            addMessage({ ...payload.new, users: data } as Imessage);
          }
        }
        checkUserScroll(scrollRef.current);
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
  }, [optimisticIds, addMessage, optimisticDeleteMessage, optimisticUpdateMessage]);

  // 스크롤 처리
  useEffect(() => {
    if (scrollRef.current && !userScrolled) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // 스크롤 이벤트 처리 함수
  const handleOnScroll = () => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const atBottom = scrollContainer.scrollTop === scrollContainer.scrollHeight - scrollContainer.clientHeight;
      setUserScrolled(!atBottom);
    }
  };

  const checkUserScroll = (scrollContainer: HTMLDivElement | null) => {
    if (scrollContainer) {
      const scrolled = scrollContainer.scrollTop < scrollContainer.scrollHeight - scrollContainer.clientHeight - 10;
      setUserScrolled(scrolled);
    }
  };

  const scrollDown = () => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
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
            className='w-10 h-10 bg-white rounded-full flex justify-center items-center border mx-auto cursor-pointer'
            onClick={scrollDown}
          >
            <ArrowDown />
          </div>
        </div>
      )}
    </>
  );
}
