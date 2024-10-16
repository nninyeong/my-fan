'use client';

import { Imessage } from '@/lib/type/type';
import { useEffect, useRef } from 'react';
import { useMessage } from '@/lib/stores/useMessagesStore';

export default function InitMessages({ messages }: { messages: Imessage[] }) {
  const initState = useRef(false);

  useEffect(() => {
    if (!initState.current) {
      useMessage.setState({ messages });
    }

    initState.current = true;
  }, []);

  return <></>;
}
