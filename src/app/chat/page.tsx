import { createClient } from '@/utils/supabase/server';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatAbout from '@/components/chat/ChatAbout';
import ChatInput from '@/components/chat/ChatInput';
import ChatMessages from '@/components/chat/ChatMessages';
import InitUser from '@/lib/stores/InitUser';

export default async function page() {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();

  return (
    <>
      <div className='max-w-3xl mx-auto md:py-10 h-screen'>
        <div className='h-full border rounded-md flex flex-col relative'>
          <ChatHeader />

          {data.session?.user ? (
            <>
              <ChatMessages />
              <ChatInput />
            </>
          ) : (
            <ChatAbout />
          )}
        </div>
      </div>
      <InitUser user={data.session?.user} />
    </>
  );
}
