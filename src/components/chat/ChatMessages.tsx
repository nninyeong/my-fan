import { Suspense } from 'react';
import ListMessages from './ListMessages';
import InitMessages from '@/lib/stores/InitMessages';
import { createClient } from '@/utils/supabase/server';
import { LIMIT_MESSAGE } from '@/lib/constants/constants';

export default async function ChatMessages() {
  const supabase = createClient();

  const { data } = await supabase
    .from('messages')
    .select('*, users(*)')
    .range(0, LIMIT_MESSAGE) //NOTE - 메세지 역순
    .order('created_at', { ascending: false });

  const messages = data?.reverse() || [];

  return (
    <Suspense fallback={'loading...'}>
      <ListMessages />
      <InitMessages messages={messages} />
    </Suspense>
  );
}
