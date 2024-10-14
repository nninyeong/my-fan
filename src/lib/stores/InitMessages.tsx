'use client';
import { useEffect, useRef } from 'react';
import { Imessage, useMessage } from '@/lib/stores/useMessagesStore';
import { LIMIT_MESSAGE } from '@/lib/constants/constants';

export default function InitMessages({ messages }: { messages: Imessage[] }) {
  const initState = useRef(false);
  const hasMore = messages.length >= LIMIT_MESSAGE;

  useEffect(() => {
    if (!initState.current) {
      useMessage.setState({ messages, hasMore });
    }

    initState.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}
