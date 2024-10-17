import Calendar from '@/components/calendar/Calendar';
import { getDaysInMonth, getMonth, getYear } from 'date-fns';
import ScheduleList from '@/components/calendar/ScheduleList';
import getInitialSchedules from '@/queries/getInitialSchedules';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Metadata } from 'next';

type Params = {
  params: { id: string };
};

export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
  const id = params.id;
  const artist = Array.isArray(id) ? id[0] : id ? decodeURIComponent(id) : '';

  return {
    title: `${artist} 스케줄 | My-Fan`,
    description: `팬들과 함께 ${artist}의 스케줄을 실시간으로 공유할 수 있는 서비스입니다`,
  };
};

export default async function page({ params }: Params) {
  const id = params.id;
  const artistId = Array.isArray(id) ? id[0] : id ? decodeURIComponent(id) : '';

  const today = new Date();
  const year = getYear(today);
  const month = getMonth(today) + 1;
  const daysInMonth = getDaysInMonth(today);
  const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
  const endDate = `${year}-${String(month).padStart(2, '0')}-${daysInMonth}}`;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['schedules', artistId, year, month],
    queryFn: () => getInitialSchedules(artistId, startDate, endDate),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className='flex justify-center items-start gap-10 w-full mt-14'>
        <div className='border p-5 w-[900px]'>
          <h3 className='font-bold'>{artistId} 스케줄</h3>
          <Calendar artistId={artistId} />
        </div>
        <ScheduleList artistId={artistId} />
      </div>
    </HydrationBoundary>
  );
}
