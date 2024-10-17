import { createClient } from '@/utils/supabase/server';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatAbout from '@/components/chat/ChatAbout';
import ChatInput from '@/components/chat/ChatInput';
import ChatMessages from '@/components/chat/ChatMessages';
import InitUser from '@/lib/stores/InitUser';
import { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: `팬끼리 모여라 톡 | My-Fan`,
    description: `K-POP 팬들과 함께 실시간 채팅으로 소통할 수 있는 서비스 입니다.`,
  };
};

export default async function page() {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  // console.log(data);

  return (
    <>
      <div className='max-w-3xl mx-auto md:py-10 md:px-4 h-screen'>
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
