import { Suspense } from 'react';
// import ListMessages from './ListMessages';
import { createClient } from '@/utils/supabase/server';
import InitMessages from '@/lib/stores/InitMessages';
import { LIMIT_MESSAGE } from '@/lib/constants/constants';

export default async function ChatMessages() {
  const supabase = createClient();

  const { data } = await supabase
    .from('messages')
    .select('*, users(*)')
    .range(0, LIMIT_MESSAGE) //NOTE - 페이지네이션 가져오는 메서드 0-20
    .order('created_at', { ascending: false });

  return (
    <Suspense fallback={'loading...'}>
      {/* <ListMessages /> */}
      <InitMessages messages={data?.reverse() || []} />
    </Suspense>
  );
}
