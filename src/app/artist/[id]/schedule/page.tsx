import Calendar from '@/components/calendar/Calendar';
import { getDaysInMonth, getMonth, getYear } from 'date-fns';
import ScheduleList from '@/components/calendar/ScheduleList';
import getInitialSchedules from '@/queries/getInitialSchedules';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

export default async function page({ params }: { params: { id: string } }) {
  const artistId = params.id;

  const today = new Date();
  const year = getYear(today);
  const month = getMonth(today) + 1;
  const daysInMonth = getDaysInMonth(today);
  const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
  const endDate = `${year}-${String(month).padStart(2, '0')}-${daysInMonth}}`;

  // const initialSchedules = await getInitialSchedules(artistId, startDate, endDate);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['schedules', artistId],
    queryFn: () => getInitialSchedules(artistId, startDate, endDate),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className='flex justify-center items-center gap-10 w-full mt-14'>
        <div className='border p-5 w-[900px] h-[650px]'>
          <h3>{artistId}</h3>
          <Calendar
            initialDate={today}
            artistId={artistId}
          />
        </div>
        <ScheduleList
          initialDate={today}
          artistId={artistId}
        />
      </div>
    </HydrationBoundary>
  );
}
